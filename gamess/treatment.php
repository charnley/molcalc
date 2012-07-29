<?php 

if(isset($_POST['ajax']))
{$ajax = true;}
else
{$ajax=false;}

if(isset($_POST['m']))    $molId = $_POST['m'];
if(isset($_POST['c']))    $calType = $_POST['c'];

/*
$calType = 'motype';
$molId = 'd10d31c5d5874c7d5117e4c577848af9';
$ajax = true;
*/

$gamessCrashStatus = "GAMESS TERMINATED -ABNORMALLY-";


/**
 * If AJAX call then only return 1 or 0,
 * if the call is !ajax, then show all the
 * data.
 */
if($ajax):

  // Check status of calculation
  $molFolder = 'data/'.$molId.'/';
  $molResults = $molFolder.$calType.'/results.log';
  $status_ajax = preg_match("/GAMESS TERMINATED -ABNORMALLY-/", file_get_contents('../'.$molFolder.$calType.'/results.log'));

  if(!$status_ajax)
  {
   print 1;
  }
  else
  {
   print 0;
  }
  
  exit();

endif;



/**
 * Define treatment to be used in 
 * method/calculation
 */
function processData($moli, $calt, $root = '')
{
?>
  <div class="from process">
<?


  $molFolder = $root.'data/'.$moli.'/';
  $molResults = $molFolder.$calt.'/results.log';
  $results_exists = file_exists($molResults);
  $inputFileContent = file_get_contents($root.'gamess/templates/'.$calt.'.inp');
?>
  <script>
  $(function(){
    var input = '<?php print str_replace("\n",'<br />',$inputFileContent); ?>';
  $('.showInput.<?php print $calt ?>').click(function() {
    $.infoPrompt(input);
    return false;
  });
  });
  </script>
  <br />
  <a href="#" class="button <?php print $calt ?> showInput">
    <span class="hvrHlpCnt"><span class="hvrHlp">Show GAMESS input header</span></span>
    Show Input
  </a>
<?

  if($results_exists)
  {
    $gamessCrashStatus = "GAMESS TERMINATED -ABNORMALLY-";
    $gamessScfStatus = "SCF IS UNCONVERGED, TOO MANY ITERATIONS";
    $gamessDatStatus = 'Please save, rename, or erase these files from a previous run:';
    $molResultsFile = file_get_contents($molResults);
    $results_failed = strpos($molResultsFile, $gamessCrashStatus);
    $results_unconv = strpos($molResultsFile, $gamessScfStatus);
    
    // Folder Exists now
    // Check Status of calculation
    if($results_failed === false && $results_unconv === false)
    {
      // $moli, $calt
      include_once($root.'gamess/process/'.$calt.'.php');
    }
    else
    {
      // Calculation Failed, print error message
      print '<br />';
      print '<br />';
      print '<div><strong>Calculation Failed</strong></div>';
      print '<div class="error gamess code">';
      $cmd_fail = 'grep -B10 "ABNORM" '.$molResults;
      $cmd_unco = 'grep -A4 "SCF IS UNCONVERGED" '.$molResults;
      print str_replace(array('<br /><br /><br />',"<br /><br />"),'<br />', str_replace("\n",'<br />',shell_exec($cmd_fail)));
      print str_replace(array('<br /><br /><br />',"<br /><br />"),'<br />', str_replace("\n",'<br />',shell_exec($cmd_unco)));
      print '</div>';
    }
  }
  else
  {
?>

    <a class="button calculateInput" href="#">
      <span class="hvrHlpCnt"><span class="hvrHlp">Start calculating the input</span></span>
      Calculate
    </a>

    <br />
<?
  }

?>
  </div>
<?
  
}


// Show?
if(isset($_POST['show']))
{
//  print "HELLO WORLD!";
// print $molId;
//  print $calType;
  processData($molId, $calType, '../');
}


