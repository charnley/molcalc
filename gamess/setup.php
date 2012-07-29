<?php

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

$molFolder = '../data/'.$molId.'/';

// Check if folder already exist
if(is_dir($molFolder.$calType))
{
  // What to do if folder exist? 
  print 0;
  exit();
}

// okay, so everything is empty, 
// so lets create folder and files.
mkdir($molFolder.$calType);

//$molString = file_get_contents($molFolder.'coordinates.xyz');

chdir($molFolder);

$output = shell_exec('babel -xf ../../gamess/templates/'.$calType.'.inp -ixyz coordinates.xyz -ogamin '.$calType.'/'.$molId.'.inp');









print 1;




// TODO Array of atom types,
// to get the charge?
// What if charge is changed?






// TODO Check if input files is created,
// if not? Create them of course.

// Also check if calculations has been done
// before.
  
  
  
