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
<html lang="en">
<head>

        <meta charset="utf-8">

        <title>Online Molecule Calculator</title>

        <link rel="stylesheet" href="<?php print BASEURL ?>/style/screen.css" >

        <!--[if lt IE 9]>
        <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
        <link rel="stylesheet" href="/sites/all/themes/rsldc2012/style/screenIE7.css">
        <![endif]-->
        
        <script type="text/javascript" src="<?php print BASEURL ?>/script/jmol/Jmol.js"></script>
        <script type="text/javascript" src="<?php print BASEURL ?>/script/jquery-1.7.2.min.js"></script>
        <script type="text/javascript" src="<?php print BASEURL ?>/script/gobi_main.js"></script>
        
        <?php if(isset($view)) print '<script type="text/javascript" src="'.BASEURL.'/methods/'.$view.'.js"></script>' ?>

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

<div class="ajaxarea"></div>

<header>
	<section class="container">
		<section class="logo">
			<a href="<?php print BASEURL ?>">
				<h1>Online Molecule Calculator</h1>
			</a>
		</section>
		<section class="navigation">
			<ul>
				<li><a href="<?php print BASEURL ?>/editor">New Molecule</a></li>
				<li><a href="<?php print BASEURL ?>/calculation">History</a></li>
				<li><a href="<?php print BASEURL ?>/about">About</a></li>
			</ul>
		</section>
	</section>
</header>
