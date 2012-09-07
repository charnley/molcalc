<?php
/* *********************************************************************
 
	Molecular Calculator (MolCalc)

	Copyright (C) 2012 Jan Jensen

	MolCalc is free software; you can redistribute it and/or modify
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

********************************************************************* */

/* *********************************************************************
	
	Hello reader, please go to 'README' in root for a small
	and quick documentation. Notthing too see here except definition of
	variables.

********************************************************************* */


// Include molcalc-settings
$settings = 'settings.php';
if (!file_exists($settings)) {
  echo 'Settings file not created<br />Please copy default.settings.php to settings.php and change GAMESS configs for your system.';
  exit();
}
include_once($settings);


// Check if call is ajax type
define('AJAX',isset($_POST['ajax']));
// TODO define('RUNGMS') instead of array


// let's make our root path
$protocol   	= 'http';
$servername 	= $_SERVER['SERVER_NAME'];
$serverport 	= ($_SERVER['SERVER_PORT'] == '80') ? '' : ':' . $_SERVER['SERVER_PORT'];
$path 			= dirname($_SERVER["SCRIPT_NAME"]);
$path 			= str_replace('\\', '/', $path); // helps with windows
$base 			= $protocol . '://' . preg_replace('/\/+/', '/', $servername . $serverport . $path);
define('BASEURL', preg_replace("/\/$/i", '', $base)); // no trailing slashes


// Get current page
if(isset($_GET['p'])) $view = $_GET['p'];


// Include html-header
if(!AJAX){ include_once('includes/header.inc.php');}


// Include page
if(isset($view))
{
  include_once('methods/'.$view.'.php');
}
else
{
  // Skip frontpage and start editor right away.
  header('location: editor');
}


// Include html-footer
if(!AJAX){include_once('includes/footer.inc.php');}
