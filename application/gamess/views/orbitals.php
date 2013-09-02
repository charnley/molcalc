<?php
/**********************************************************************
orbitals.php

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

?>

<div class="acontainer"> <!-- need this for ajax call -->

<h2>Molecule Orbitals</h2>
<br />

<div class="orbitals choicelist" style="width:300px;height:500px;float:left;">
<ul>
<?php
// CODE FROM TOKE F.
$file = explode("EIGENVECTORS", $result_file_c);
$file = explode("END OF RHF CALCULATION", $file[count($file)-1]);
$file = explode("\n", $file[0]);
$result = array();
for($i=0;$i<count($file);$i++){
  if($file[$i]==""){
    $energies = explode(" ",$file[$i+2]);
    for($j=0;$j<count($energies);$j++){
      if($energies[$j]!=""){
        array_push($result, $energies[$j]);
      }
    }
  }
}
for($k=0;$k<count($result);$k++)
{
?>
<li>
    <span class="number" style="display:inline-block;width:50px;"><?php print $k+1  ?></span>
    <span class="amount" style="display:inline-block;width:100px;text-align:right;"><?php print format($result[$k]*27.21) ?></span>
    <span class="unit">eV</span>
    <a href="#" rel="<?php print ($k+1); ?>" class="viewOrbital button">
      View
    </a>
</li>
<?
}
?>
</ul>

</div>

<div class="orbitals viewer" style="float:right;width:580px;height:500px;margin-bottom:20px;">

  <script type="text/javascript">
  jmol_orbitals = Jmol.getApplet("jmol_orbitals", myInfo1);
  Jmol.script(jmol_orbitals, 'load "<?php print BASEURL?>/data/<?php print $molid ?>/orbitals/results.log";');
  Jmol.script(jmol_orbitals, 'set bondRadiusMilliAngstroms 100; set multipleBondSpacing -0.3');
  </script>

</div>


<script type="text/javascript">
$(function()
{
  // View Orbital
  $('.viewOrbital').click(function()
  {
    // Check for getProperty fileName
    var orbital = $(this).attr('rel');
    Jmol.script(jmol_orbitals, 'mo '+orbital);
    return false;
  });
});
</script>

<div class="clean"></div>
</div>


