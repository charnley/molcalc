<?php
/**********************************************************************
vibrations.php

Copyright (C) 2012 Jimmy Charnley Kromann, DGU

This file is part of the MolCalc project.

MolCalc is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

MolCalc is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
02110-1301, USA.
***********************************************************************/

// Molecular Orbital Results

# $caltype        // Calculation Type
# $molid          // Molecule Hash ID
# $result_file_c  // Results File Content


  // Get Number of atoms
  $file = 'coordinates.xyz';
  $lines = count(file($file));
  $NA = $lines-2 ;

  // Get Vibrational States
  $vibs = array();
  $ints = array();
  $pattern = "/       FREQUENCY:[a-zA-Z0-9 \.]+/";
  $pattern2 = "/    IR INTENSITY:[a-zA-Z0-9 \.]+/";
  preg_match_all($pattern, $result_file_c, $vibration_list);
  preg_match_all($pattern2, $result_file_c, $intensity_list);

  $count = count($vibration_list[0]);

  for($i = 0; $i<$count; $i++)
  {
    preg_match_all("/[0-9]+\.[0-9]+/", $vibration_list[0][$i], $levels);
    preg_match_all("/[0-9]+\.[0-9]+/", $intensity_list[0][$i], $ilevels);
    $vibs = array_merge($vibs, $levels[0]);
    $ints = array_merge($ints, $ilevels[0]);
  }

  // Check if molecule is linear
  $linear_string = "THIS MOLECULE IS RECOGNIZED AS BEING LINEAR";
  $linear = false;
  if(strpos($result_file_c, $linear_string) > 0 )
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

<div class="acontainer"> <!-- need this for ajax call -->

<h2>Vibrational Frequencies</h2>
<br />

<div class="vibrations lhs" style="width:400px;float:left;">
  <table>
    <tr>
      <td>Vibration</td>
      <td>
        <a class="button vibration active" rel="on">On</a>
        <a class="button vibration" rel="off">Off</a>
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
      <td>Balls</td>
      <td>
        <a class="button cpk active" rel="on; spacefill 24%;">On</a>
        <a class="button cpk" rel="off">Off</a>
      </td>
    </tr>
  </table>

  <div class="outputbox vibrations choicelist">
    <ul>
      <?php for($i = $start; $i <= count($vibs)-1; $i++ ): ?>
        <li>
          <span class="vib" style="width:100px;text-align:right;display:inline-block;"><?php print $vibs[$i] ?> cm<sup>-1</sup></span>
          <a href="#" class="button vibration_level" rel="<?php print $i+1 ?>">View</a>
        </li>
      <?php endfor; ?>
    </ul>
  </div>

</div>


<div class="vibrations viewer" style="width:500px;height:500px;float:right;">

  <script type="text/javascript">
  jmol_vib = Jmol.getApplet("jmol_vib", myInfo1);
  Jmol.script(jmol_vib, 'load "<?php print BASEURL?>/data/<?php print $molid ?>/vibrations/results.log";');
  Jmol.script(jmol_vib, 'set bondRadiusMilliAngstroms 100; set multipleBondSpacing -0.3');

  Jmol.script(jmol_vib, 'font echo 20 serif;fsize=20;set echo top center;echo echo test');
  Jmol.script(jmol_vib, 'color echo black; font echo 20 serif;fsize=20;set echo top right;echo echo test;');
  Jmol.script(jmol_vib, 'echo "Vibration: <?php print $vibs[$start] ?> cm<sup>-1</sup>"');
  Jmol.script(jmol_vib, 'vibration on');

  // Switch to the first real vibration
  Jmol.script(jmol_vib, 'frame <?php print $start+1 ?>');
  </script>

</div>


<div class="vibrations spectrum hidden" style="width:500px;height:500px;float:right;">
<?php
/*
  TODO
  // $vibs
  // $ints
  for($i=0;$i<$start;$i++)
  {
    unset($vibs[$i]);
    unset($ints[$i]);
  }
  $json = json_encode(array($vibs,$ints));
  print shell_exec("../../tools/graph_ir.py '$json'");
*/
?>
  <!--<img style="max-width:100%;" src="<?php print BASEURL.'/data/'.$molid.'/plot.png' ?>" alt="" />-->
</div>


<script type="text/javascript">
$(function()
{

  // Animation on off
  $('.button.vibration').click(function() {
    $('.button.vibration.active').removeClass('active');
    $(this).addClass('active');
    var rel = $(this).attr('rel');
    Jmol.script(jmol_vib, 'vibration '+rel);
  });

  // Vectors on off
  $('.button.vector').click(function() {
    $('.button.vector.active').removeClass('active');
    $(this).addClass('active');
    var rel = $(this).attr('rel');
    Jmol.script(jmol_vib, 'vectors '+rel+'; color vectors black;');
    Jmol.script(jmol_vib, 'set vectorScale 5');
  });

  // Balls on off
  $('.button.cpk').click(function() {
    $('.button.cpk.active').removeClass('active');
    $(this).addClass('active');
    var rel = $(this).attr('rel');
    Jmol.script(jmol_vib, 'cpk '+rel);
  });

  // Show Vibration
  $('.vibration_level').click(function() {
    var rel = $(this).attr('rel');
    var rcm = $(this).parent().find('.vib').html();
    jmolCmd  = "frame "+rel;
    Jmol.script(jmol_vib, jmolCmd);
    Jmol.script(jmol_vib, 'echo "Vibration: '+rcm+'"');
    return false;
  });

});
</script>

<div class="clean"></div>
</div>

