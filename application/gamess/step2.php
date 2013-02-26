<?php
/**********************************************************************
setup.py

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

if(isset($_POST['ajax'])) $ajax = true;
if(isset($_POST['m'])) $molId = $_POST['m'];
if(isset($_POST['c'])) $calType = $_POST['c'];

// Check if molid and calculation type
// is set.
if(!isset($molId) || !isset($calType))
{
  // What to setup if no molecular id? Exit!
  print "calType or molId not set";
  exit();
}

$datafolder = '../../data/';
$molfolder = $datafolder.$molId.'/';

chdir($molfolder);

// Check if folder already exist
if(is_dir($calType))
{
  // What to do if folder exist? 
  print "Something went wrong. Seems like calculation has been prepared already.";
  die();
}

// Get Charge
$lines = file('molecule.db');
$db = array();

foreach($lines as $line)
{
  $line = str_replace("\n","",$line); // Remove trailling \n
  if($line=="") continue; // Ignore empty lines
  $array = explode(':', $line);
  $db[$array[0]] = $array[1];
}

$molec_charge = $db['charge'];

// okay, so everything is empty,
// so lets create folder and files.
mkdir($calType);

shell_exec('babel -xf ../../tools/gamess/headers/'.$calType.'.inp -ixyz coordinates.xyz -ogamin '.$calType.'/'.$molId.'.inp');
shell_exec('sed -i "s/ICHARG=0/ICHARG='.$molec_charge.'/" '.$calType.'/*.inp');

print 1;
