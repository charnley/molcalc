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

// Check if call is ajax type
define('AJAX',isset($_POST['ajax']));
// TODO define('RUNGMS') instead of array

// let's make our root path (BASEURL)
$protocol   	= 'http';
$servername 	= $_SERVER['SERVER_NAME'];
$serverport 	= ($_SERVER['SERVER_PORT'] == '80') ? '' : ':' . $_SERVER['SERVER_PORT'];
$path         = dirname($_SERVER["SCRIPT_NAME"]);
$path 			  = str_replace('\\', '/', $path); // helps with windows
$base         = $protocol . '://' . preg_replace('/\/+/', '/', $servername . $serverport . $path);
$base         = preg_replace('/application/','', $base); // remove 'application'
define('BASEURL', preg_replace("/\/$/i", '', $base)); // no trailing slashes

// Get current page
if(isset($_GET['p'])) $view = $_GET['p'];
if(!isset($view)) $view = "editor";

// Get Calculation information
if(isset($_GET['m']))
{
  $hash = $_GET['m'];
  $file = '../data/'.$hash.'/molecule.db';
  if(file_exists($file)):
  $lines = file($file);

  $molInfo = array();
  foreach($lines as $line)
  {
    if($line == "\n") continue; // ops, extra line
    $array = explode(':', $line);
    $molInfo[$array[0]] = str_replace("\n", "", $array[1]);
  }
  else:

    $view="404";

  endif;
}

// Include html-header
if(!AJAX){ include_once('views/header.inc.php');}

// TODO
// Rewrite 'include page'
// and get some molecule information for the header
// if it is the 'calculation' page

// TODO
// 404 Page

// Include page
if(isset($view))
{
  $file = 'views/'.$view.'.php';
  if(!file_exists($file)) {$view = '404';}
  $file = 'views/'.$view.'.php';
  include_once($file);
}
else
{
  // Skip frontpage and start editor right away.
  //header('location: editor');
  include_once('views/editor.php');
}

// Include html-footer
if(!AJAX){include_once('views/footer.inc.php');}
