<?php

  /**
   * Check if GAMESS calculations already
   * has been done.
   *
   */


if(isset($_POST['ajax']))
{$ajax = true;}
else
{$ajax=false;}

if(isset($_POST['m']))    $molId = $_POST['m'];
if(isset($_POST['c']))    $calType = $_POST['c'];

/*
$calType = 'motype';
$molId = 'd10d31c5d5874c7d5117e4c577848af9';
$ajax = true;
*/

$datFile = '/tmp/'.$molId.'.';

$filetypes = array('F05', 'dat', 'rst');
$status = true;

foreach($filetypes as $filetype):
  if(file_exists($datFile.$filetype))
  { 
    $status = false;
  }
endforeach;


if($status === false)
{
  print "Calculation already running. Please try again later.";
}
else
{
  print 1;
}


