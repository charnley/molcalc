<?php
/**********************************************************************
header.inc.php

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

?><!DOCTYPE html>
<html lang="en">
<head>
	
	<meta charset="utf-8">
	
	<title>Molecule Calculator</title>
	
	<link rel="stylesheet" href="<?php print $root ?>/style/screen.css" >
	
	<script type="text/javascript" src="<?php print $root ?>/script/jmol/Jmol.js"></script>
	<script type="text/javascript" src="<?php print $root ?>/script/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="<?php print $root ?>/script/gobi_main.js"></script>
	<?php if(isset($view)) print '<script type="text/javascript" src="'.$root.'/methods/'.$view.'.js"></script>' ?>
	
</head>
<body>

<div class="ajaxarea"></div>

<header>
	<section class="container">
		<section class="logo">
			<a href="<?php print $root ?>">
				<h1>Online Molecule Calculator</h1>
			</a>
		</section>
		<section class="navigation">
			<ul>
				<li><a href="<?php print $root ?>/editor">New Molecule</a></li>
				<li><a href="<?php print $root ?>/calculation">History</a></li>
				<li><a href="<?php print $root ?>/about">About</a></li>
			</ul>
		</section>
	</section>
</header>
