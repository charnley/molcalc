<?php
/**********************************************************************
check.php

Copyright (C) 2012 Jimmy Charnley Kromann, DGU

This file is part of the MolCalc project.

MolCalc is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

MolCalc is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
02110-1301, USA.
***********************************************************************/

include_once('rungamess.php');


if(isset($_POST['xyz']))
{
  $xyz = $_POST['xyz'];
  $mol_charges = $_POST['charge'];
}
else
{
  print "No post data";
  exit();
}

$tmp = TMP."/";

$hash = md5($xyz); // Primary ID of the molecule
$tmpfile = $tmp.$hash.".xyz";
file_put_contents($tmpfile, $xyz);

unlink($tmpfile); // Removes the tmp file


// Integer charge
$mol_charges = intval($mol_charges);


// Check if single atom
$xyz_array = explode("\n", $xyz);
$single_atom = False;

if(intval($xyz_array[0]) == 1)
{
  $single_atom = True;
}


// Change folder
$folder = '../data/'.$hash;
if(!is_dir($folder))
{
  mkdir($folder);
}
else
{
  print $hash;
  exit();
}
chdir($folder);

// Save Structure in hash-dir
if($single_atom)
{
  // Only single atom, do not minimise
  file_put_contents('coordinates.xyz', $xyz);
}
else
{
  // Okay, seems fine, now minimize and save the
  // molecule

  // Save jmol_structure
  $jmol_struc = "structure_jmol.xyz";
  file_put_contents($jmol_struc, $xyz);

  // Prepare Minimisation
  shell_exec('babel -xf ../../tools/gamess/headers/minimise.inp -ixyz structure_jmol.xyz -ogamin '.$hash.'.inp');
  shell_exec('sed -i "s/icharg=0/icharg='.$mol_charges.'/" '.$hash.'.inp');

  // Minimise jmol structure
  rungms($hash);

  // Check output for abnormally
  $pattern = "EXECUTION OF GAMESS TERMINATED -ABNORMALLY-";
  $pattern2 = "TOO MANY ITERATIONS";
  $min = file_get_contents($hash.'.log');
  if(strpos($min, $pattern) or strpos($min, $pattern2))
  {
    // Delete and die
    chdir('../');
    shell_exec('rm -r '.$hash);
    print "Minimisation ended abnormally. Please check your molecule.";
    die();
    exit();
  }

  // Save XYZ
  shell_exec('babel -igamess '.$hash.'.log -oxyz coordinates.xyz');
}


// TODO Check if XYZ file length is larger than 0

// Get Common name and Inchi code
// Sometimes inchi didnt work with this search, sometimes not with smiles
$smiles   = shell_exec('babel -ixyz coordinates.xyz -osmiles --title " "');
$smiles   = str_replace("\n",'', $smiles);
$smiles   = preg_replace("/\s+/",'', $smiles);
$inchi    = shell_exec('babel -ixyz coordinates.xyz -oinchi --title " "');
$inchi    = str_replace("\n",'', $inchi);
$inchikey = shell_exec('babel -ixyz coordinates.xyz -oinchikey --title " "');
$inchikey = str_replace("\n",'', $inchikey);
$inchikey = preg_replace("/\s+/",'', $inchikey);
$name     = "";

// TODO Check if SMILES is empty
// TODO Check if multiple molecules, and get individual names

if(!strpos($smiles, "."))
{
  // If smiles contains ., it means it is too molecules
  // and naming will not work.
  $search = $smiles;
  $search = str_replace("[", "%5B", $search);
  $search = str_replace("]", "%5D", $search);
  $search = str_replace("@", "%40", $search);
  //$search = str_replace(")", "", $search);
  //$search = str_replace("(", "", $search);
  $search = str_replace("=", "%3D", $search); #double bond
  $search = str_replace("#", "%23", $search); #triple bond

  // Get Name from http://cactus.nci.nih.gov/chemical/structure
  // http://cactus.nci.nih.gov/chemical/structure/C%28N%29N/names
  // http://cactus.nci.nih.gov/chemical/structure/C%28N%29N/iupac_name
  $cactus = "http://cactus.nci.nih.gov/chemical/structure/".$search."/iupac_name";
  $name;

  // IF 404
  function get_http_response_code($url) {
    $headers = get_headers($url);
    return substr($headers[0], 9, 3);
  }

  // TODO Cactus name
  // Check if the response is HTML code
  // because catus response is a .html file
  // when SMILE is empty

  if(get_http_response_code($cactus) != "404"){
    $names = file_get_contents($cactus);
    // for 'names'
    //$names = explode("\n", $names);
    //$name = $names[0];
    // for 'iupac_name'
    $name = str_replace("\n",'',$names);
  }else{
    $name = "";
  }
}

// Write Molecule Information to flat-file db
$db = array();
$db['charge'] = intval($mol_charges);
$db['name']   = ucfirst(strtolower($name)); // Str to lower, caps first, remove linebreak
$db['inchi']  = $inchi;
$db['smiles'] = $smiles;

$string = "";
foreach($db as $key => $entry)
{
  $string = $string.$key.":".$entry;
  $string = $string."\n";
}

file_put_contents('molecule.db', $string);

// Create 2D image (using openbabel)
shell_exec('babel -ixyz coordinates.xyz -O thumbnail.png --title " "');

// Finished
print $hash;
