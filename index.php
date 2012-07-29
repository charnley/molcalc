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
		return 'http://'.$_SERVER["SERVER_NAME"].'/sites/gobi';
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
    // Skip frontpage and start editor right away.
    header('location: editor');
    
    // Load the frontpage
		//include_once('methods/frontpage.php');
	}
	
	if(!$ajax){include_once('includes/footer.inc.php');}
