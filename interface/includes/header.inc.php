<!DOCTYPE html>
<html lang="en">
<head>
	
	<meta charset="utf-8">
	
	<title>GOBI2</title>
	
	<link rel="stylesheet" href="style/screen.css" >
	
	<script type="text/javascript" src="script/jmol/Jmol.js"></script>
	<script type="text/javascript" src="script/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="script/gobi_main.js"></script>
	<?php if(isset($view)) print '<script type="text/javascript" src="methods/'.$view.'.js"></script>' ?>
	
</head>
<body>

<div class="ajaxarea"></div>

<header>
	<section class="container">
		<section class="logo">
			<a href="<?php print $homeurl ?>">
				<h1>GOBI2</h1>
			</a>
		</section>
		<section class="navigation">
			<ul>
				<li><a href="<?php print $homeurl ?>editor">Editor</a></li>
				<li><a href="<?php print $homeurl ?>calculate">Calculate</a></li>
			</ul>
		</section>
	</section>
</header>
