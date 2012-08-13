<?php
	include_once('settings.php');

  // Is this a ajax call? 
	if(isset($_POST['ajax']))	{	$ajax = true;	} else { $ajax = false; }
	
  // Get root
	$root = $settings['server']['root'];
	


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
