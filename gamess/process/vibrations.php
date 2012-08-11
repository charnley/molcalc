<?php
/**********************************************************************
vibrations.php

Copyright (C) 2012 Jimmy Charnley Kromann, DGU

This file is part of the FragIt project.

FragIt is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

FragIt is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
02110-1301, USA.
***********************************************************************/
  
  /**
   * Data Treatmnet of
   * the vibrations input file
   *
   */

  //print $calt; // Calculation type
  //print $moli; // Molecular ID
  //$results_file; // File path
  //$molResultsFile // File contents



  
  // Get Number of atoms
  $file = $root.'data/'.$moli.'/coordinates.xyz';
  $lines = count(file($file));
  $NA = $lines -2 ;
  
  // Get Vibrational States
  $vibs = array();
  $pattern = "/       FREQUENCY:[a-zA-Z0-9 \.]+/";
  preg_match_all($pattern, $molResultsFile, $vibration_list);
  foreach($vibration_list[0] as $list)
  {
      preg_match_all("/[0-9]+\.[0-9]+/", $list, $levels);
      $vibs = array_merge($vibs, $levels[0]);
  }
  
  // Check if molecule is linear
  $linear_string = "THIS MOLECULE IS RECOGNIZED AS BEING LINEAR";
  $linear = false;
  if(strpos($molResultsFile, $linear_string) > 0 )
  {
    $linear = true;
  }

  if($linear)
  {
    $start = 5; 
  }
  else
  {
    $start = 6;  
  }

?>

<a href="#" class="button loadResult loadVibrationResults">
  <span class="hvrHlpCnt"><span class="hvrHlp">Load vibrational results into molecule viewer</span></span>
  Load Results
</a>

<br /><br />

<table>
  <tr>
    <td>Vibration</td>
    <td>
      <a class="button vibration" rel="on">On</a>
      <a class="button vibration active" rel="off">Off</a>
    </td>
  </tr>
  <tr>
    <td>Vectors</td>
    <td>
      <a class="button vector" rel="on">On</a>
      <a class="button vector active" rel="off">Off</a>
    </td>
  </tr>
  <tr>
    <td>Atoms</td>
    <td>
      <a class="button cpk active" rel="on; spacefill 24%;">On</a>
      <a class="button cpk" rel="off">Off</a>
    </td>
  </tr>
</table>

<div class="code vibrations">
  <ul>
    <?php for($i = $start; $i <= count($vibs)-1; $i++ ): ?>
      <li><a href="#" class="vibration_level" rel="<?php print $i+1 ?>"><?php print $vibs[$i] ?> cm<sup>-1</sup></a></li>
    <?php endfor; ?>

  </ul>
</div>

<script type="text/javascript">
$(function() 
{

  // Load Results File
  $('.button.loadVibrationResults').click(function() {
    jmolScript('load data/<?php print $moli ?>/vibrations/results.log');
    jmolScript('set echo top left');
    jmolScript('color echo black');
    jmolScript('echo "Vibration: <?php print $vibs[$start] ?> cm<sup>-1</sup>"');

    // Switch from frame 1 
    jmolScript('frame <?php print $start+1 ?>');
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
    jmolScript('set vectorScale 5');
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
    var rcm = $(this).html();
    jmolCmd  = "frame "+rel;
    jmolScript(jmolCmd);
    jmolScript('echo "Vibration: '+rcm+'"');
    return false;
  });

}); 
</script>

