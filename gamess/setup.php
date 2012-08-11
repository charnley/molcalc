<?php
/**********************************************************************
setup.py

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

shell_exec('babel -xf ../../gamess/templates/'.$calType.'.inp -ixyz coordinates.xyz -ogamin '.$calType.'/'.$molId.'.inp');

$molec_charge = file_get_contents('charge');
shell_exec('sed -i "s/ICHARG=0/ICHARG='.$molec_charge.'/" '.$calType.'/*.inp');








print 1;




// TODO Array of atom types,
// to get the charge?
// What if charge is changed?






// TODO Check if input files is created,
// if not? Create them of course.

// Also check if calculations has been done
// before.
  
  
  
