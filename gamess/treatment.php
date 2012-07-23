<?php 

if(isset($_POST['ajax'])) $ajax = true;
if(isset($_POST['m']))    $molId = $_POST['m'];
if(isset($_POST['c']))    $calType = $_POST['c'];

/*
$calType = 'motype';
$molId = 'd10d31c5d5874c7d5117e4c577848af9';
$ajax = true;
*/

$molFolder = '../data/'.$molId.'/';

$status = preg_match("/GAMESS TERMINATED -ABNORMALLY-/", file_get_contents($molFolder.$calType.'/results.log'));

if(!$status)
{
  print 1;
}
else
{
  // grep -B10 "ABNORM" results.log
  print 0;

}

