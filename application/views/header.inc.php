<?php
/**********************************************************************
header.inc.php

Copyright (C) 2012 Jan Jensen

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

?><!DOCTYPE html>
<html lang="en" xml:lang="en">
<head>

  <meta charset="utf-8">
  <meta name="google" content="notranslate" />

  <?php if(isset($molInfo)): ?>
<title><?php print $molInfo['name'] != "0" && $molInfo['name'] != "" ? $molInfo['name'] : $molInfo['inchi'];  ?> - MolCalc</title>
  <?php else: ?>
<title>Molecule Calculator (MolCalc)</title>
  <?php endif; ?>

  <link rel="stylesheet" href="<?php print BASEURL ?>/assets/style/screen.css" />

  <!--[if lt IE 9]>
  <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <link rel="stylesheet" href="/sites/all/themes/rsldc2012/style/screenIE7.css">
  <![endif]-->

  <!-- jsmol -->
  <script type="text/javascript" src="<?php print BASEURL ?>/assets/script/jsmol/JSmoljQuery.js"></script>
  <script type="text/javascript" src="<?php print BASEURL ?>/assets/script/jsmol/JSmolCore.js"></script>
  <script type="text/javascript" src="<?php print BASEURL ?>/assets/script/jsmol/JSmolApplet.js"></script>
  <script type="text/javascript" src="<?php print BASEURL ?>/assets/script/jsmol/JSmolApi.js"></script>
  <script type="text/javascript" src="<?php print BASEURL ?>/assets/script/jsmol/j2s/j2sjmol.js"></script>
  <script type="text/javascript" src="<?php print BASEURL ?>/assets/script/jsmol/JSmol.js"></script>

  <!-- molcalc -->
  <script type="text/javascript" src="<?php print BASEURL ?>/assets/script/jquery-1.7.2.min.js"></script>
  <script type="text/javascript" src="<?php print BASEURL ?>/assets/script/jquery.prompt.js"></script>
  <script type="text/javascript" src="<?php print BASEURL ?>/assets/script/jquery.molcalc_main.js"></script> 
  <?php if(isset($view)) print '<script type="text/javascript" src="'.BASEURL.'/assets/script/views/'.$view.'.js"></script>' ?>


  <!-- google analytics -->
  <script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-34078381-1']);
  _gaq.push(['_trackPageview']);
  (function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
  </script>

</head>
<body>

<header>
	<section class="container">
		<section class="logo">
			<a href="<?php print BASEURL ?>">
				<h1>
          <span class="sep">MolCalc</span>
          <span class="ret">The Molecule Calculator</span>
        </h1>
			</a>
		</section>
		<section class="navigation">
			<ul>
				<li><a href="<?php print BASEURL ?>/">New Molecule</a></li>
				<li><a href="<?php print BASEURL ?>/calculation">Molecule List</a></li>
				<li><a href="<?php print BASEURL ?>/about">What?</a></li>
			</ul>
		</section>
	</section>
</header>

