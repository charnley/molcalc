<?php 
/**********************************************************************
handle.php

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

#include_once('../rungamess.php');
#define TMP
#define RUNGAMESS
#define rungms($inp)
$lines = file('../../settings');
$settings = array();

foreach($lines as $line)
{
  $array = explode(':', $line);
  $settings[$array[0]] = str_replace("\n", "", $array[1]);
}

define("RUNGMS", $settings['gamess']);
define("TMP", $settings['tmp']);

// Run GAMESS calculation
// from post data
if(isset($_POST['ajax'])) $ajax = true;
if(isset($_POST['m'])) $molId = $_POST['m'];
if(isset($_POST['c'])) $calType = $_POST['c'];

/*
$calType = 'motype';
$molId = 'd10d31c5d5874c7d5117e4c577848af9';
$ajax = true;
*/

#goto molfolder
#goto caltype folder
$molFolder = '../../data/'.$molId.'/';
chdir($molFolder);
chdir($calType);

# Execute rungms input.inp > results.log
shell_exec(RUNGMS.' '.$molId.'.inp > results.log');

print 1;
