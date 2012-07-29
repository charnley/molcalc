<?php
  
  /**
   * Data Treatmnet of
   * the HEAT input file
   *
   */

  //print $calt; // Calculation type
  //print $moli; // Molecular ID
  //$results_file; // File path
  //$molResultsFile // File contents


$heatOfFormation;

foreach(preg_split("/(\r?\n)/", $molResultsFile) as $line)
{
  // do stuff with $line
  $booHof = strpos($line, "HEAT OF FORMATION IS");
  
  if($booHof !== false)
  {
    // Note: Heat of Formation is in kCal mol^-1
    $pattern = "/[\-]*[0-9]+\.[0-9]+/";
    preg_match($pattern, $line, $heatOfFormation);
    $heatOfFormation = $heatOfFormation[0];
  }
  
}

?>


<script type="text/javascript">
$(function() 
{

  // Load Results File
  $('.button.loadHeatResults').click(function() {
    jmolScript('load data/<?php print $moli ?>/heat/results.log');
    jmolScript('set echo top left');
    jmolScript('color echo black');

    jmolScript('echo "Heat of Formation: <?php print $heatOfFormation*4.18 ?> [kJ mol-1]"');
    return false;
  });

}); 
</script>


<a href="#" class="button loadResult loadHeatResults">
  <span class="hvrHlpCnt"><span class="hvrHlp">Load Results into molecule viewer</span></span>
  Load Results
</a>

<br /><br />

<div class="number">
  <h4>Heat of Formation:</h4>
  <span class="master">&Delta;H<sub>f</sub><sup>&Theta;</sup> = </span>
  <span class="number"><?php print $heatOfFormation*4.18; ?></span>
  <span class="unit">[kJ mol<sup>-1</sup>]</span>
</div>

 


