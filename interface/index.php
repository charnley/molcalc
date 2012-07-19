<?php
	
	function curPageURL() 
	{
		return 'http://'.$_SERVER["SERVER_NAME"].'/dgu/gobi/interface/';
	}
	
	
	// Global Variables
	$homeurl = curPageURL();
	
	
	// Get Page
	if(isset($_GET['p'])) $view = $_GET['p'];
	
	include_once('includes/header.inc.php');
	if(isset($view))
	{
		include_once('methods/'.$view.'.php');
	}
	else
	{
		include_once('methods/frontpage.php');
	}
	include_once('includes/footer.inc.php');
