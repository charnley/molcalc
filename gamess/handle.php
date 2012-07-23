<?php 

// Define GAMESS 
$rungms = '/srv/gamess/gamess/rungms';

// Run GAMESS calculation
  
if(isset($_POST['ajax'])) $ajax = true;
if(isset($_POST['m'])) $molId = $_POST['m'];
if(isset($_POST['c'])) $calType = $_POST['c'];

/*
$calType = 'motype';
$molId = 'd10d31c5d5874c7d5117e4c577848af9';
$ajax = true;
*/

$molFolder = '../data/'.$molId.'/';


$cmd = $rungms.' '.$molId.'.inp > results.log';
chdir($molFolder.$calType);
shell_exec($cmd);

print 1;
