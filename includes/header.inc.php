<!DOCTYPE html>
<html lang="en">
<head>
	
	<meta charset="utf-8">
	
	<title>GOBI2</title>
	
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
				<h1>GOBI2</h1>
			</a>
		</section>
		<section class="navigation">
			<ul>
				<li><a href="<?php print $root ?>/editor">Create New</a></li>
				<li><a href="<?php print $root ?>/calculation">Calculations</a></li>
			</ul>
		</section>
	</section>
</header>
