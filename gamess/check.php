<?php
/**********************************************************************
check.py

Copyright (C) 2012 Jimmy Charnley Kromann, DGU

This file is part of the FragIt project.

FragIt is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

FragIt is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
02110-1301, USA.
***********************************************************************/
  


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


