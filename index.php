<?php
	
	if(isset($_POST['ajax']))
	{
		$ajax = true;
	}
	else
	{
		$ajax = false;
	}
	
	function curPageURL() 
	{
		return 'http://'.$_SERVER["SERVER_NAME"].'/dgu/gobi/interface';
	}
	
	$root = curPageURL();
	
	if(isset($_GET['p'])) $view = $_GET['p'];
	
	if(!$ajax){ include_once('includes/header.inc.php');}
	
	if(isset($view))
	{
		include_once('methods/'.$view.'.php');
	}
	else
	{
		include_once('methods/frontpage.php');
	}
	
	if(!$ajax){include_once('includes/footer.inc.php');}
