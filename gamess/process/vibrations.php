<?php
  
  /**
   * Data Treatmnet of
   * the vibrations input file
   *
   */

  //print $calt; // Calculation type
  //print $moli; // Molecular ID
  //$results_file; // File path
  //$molResultsFile // File contents



  
  // Get Vibrational States
  $file = $root.'data/'.$moli.'/coordinates.xyz';
  $lines = count(file($file));
  $NA = $lines -2 ;


?>


<script type="text/javascript">
$(function() 
{

  // Load Results File
  $('.button.loadVibrationResults').click(function() {
    jmolScript('load data/<?php print $moli ?>/vibrations/results.log');
    jmolScript('set echo top left');
    jmolScript('color echo black');
    jmolScript('echo "Vibrations"');
    return false;
  });

  // Vibration on off
  $('.button.vibration').click(function() {
    $('.button.vibration.active').removeClass('active');
    $(this).addClass('active');
    var rel = $(this).attr('rel');
    jmolScript('vibration '+rel);
  });

  // Vectors on off
  $('.button.vector').click(function() {
    $('.button.vector.active').removeClass('active');
    $(this).addClass('active');
    var rel = $(this).attr('rel');
    jmolScript('vectors '+rel+'; color vectors black;');
  });

  // Balls on off
  $('.button.cpk').click(function() {
    $('.button.cpk.active').removeClass('active');
    $(this).addClass('active');
    var rel = $(this).attr('rel');
    jmolScript('cpk '+rel);
  });

  // Show Vibration
  $('.vibration_level').click(function() {
    var rel = $(this).attr('rel');
    jmolCmd  = "frame "+rel;
    jmolScript(jmolCmd);
    return false;
  });

}); 
</script>


<a href="#" class="button loadResult loadVibrationResults">
  <span class="hvrHlpCnt"><span class="hvrHlp">Load vibrational results into molecule viewer</span></span>
  Load Results
</a>

<br /><br />

<table>
  <tr>
    <td>
      Vibration
    </td>
    <td>
      <a class="button vibration" rel="on">On</a>
      <a class="button vibration active" rel="off">Off</a>
    </td>
  </tr>
  <tr>
    <td>
      Vectors
    </td>
    <td>
      <a class="button vector" rel="on">On</a>
      <a class="button vector active" rel="off">Off</a>
    </td>
  </tr>
  <tr>
    <td>
      Atoms
    </td>
    <td>
      <a class="button cpk active" rel="on; spacefill 24%;">On</a>
      <a class="button cpk" rel="off">Off</a>
    </td>
  </tr>
</table>

<div class="code vibrations">
  <ul>
      <?php $vibAmount = (3*$NA-6+6) ?>
      <?php // for($v=1, $v<$vibAmount, $v++) {} ?>
      <?php for ($v=1; $v<=$vibAmount; $v++): ?>
        <li><a class="vibration_level" rel="<?php print $v?>" href="#">Mode <?php print $v?></a></li>
      <?php endfor; ?>
  </ul>
</div>

<p>
  Mode 1-6 are taken as rotations and translations.
</p>


