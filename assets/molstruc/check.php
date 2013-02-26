<?php

// Check if ChemSpider can find the molecule
// and return image source,
// otherwise return 0

if(isset($_GET['search']))
{
  $search = $_GET['search'];
}
else
{
  print "0";
  die();
}

$search = str_replace("%20", " ", $search);

// Search Chemspider, and get MF results
$smiles = shell_exec('../../tools/molecule_search_mol.py "'.$search.'"');
$smiles = str_replace("\n", '', $smiles);

if($smiles == "0")
{
  print "0";
  die();
}

// Check the size of the molecule
// to avoid lag

// I know, there should be something too look for
// single amount of atoms, but this is just to avoid
// very large molecules.
$pattern = '/[a-zA-Z]{1,2}\_\{[0-9]{1,10}\}/';
preg_match_all($pattern, $smiles, $matches);

$matches = $matches[0];
$Natoms = 0;

foreach($matches as $match)
{
  if($match[0] == 'H') continue;
  preg_match_all('!\d+!', $match, $numbers);
  $Natoms += intval($numbers[0][0]);
}

if($Natoms > 20)
{
  print "0";
  die();
}

print "1";
