<?php
/**********************************************************************
heat.php

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

// Thermodynamics Results

# $caltype        // Calculation Type
# $molid          // Molecule Hash ID
# $result_file_c  // Results File Content

$hof;

foreach(preg_split("/(\r?\n)/", $result_file_c) as $line)
{
  $booHof = strpos($line, "HEAT OF FORMATION IS");

  if($booHof !== false)
  {
    // Note: Heat of Formation is in kCal mol^-1
    $pattern = "/[\-]*[0-9]+\.[0-9]+/";
    preg_match($pattern, $line, $hof);
    $hof = $hof[0];
  }

}

# Get rest of thermodata
$thermodata = shell_exec('grep -B1 -A5 "          KJ/MO" thermo/results.log');
$table = array();

foreach(preg_split("/\n/", $thermodata) as $line)
{
  $table[] = preg_split("/\s+/", $line);
}

# Variables for table
$entropy_total = $table[6][7];
$enthalpy_total = $table[6][3];
$g_total = $table[6][4]; # Free Energy
$cp_total = $table[6][6]; # Heat Cap. at const. pressure

$entropy_tra = $table[3][7];
$entropy_rot = $table[4][7];
$entropy_vib = $table[5][7];

$enthalpy_tra = $table[3][3];
$enthalpy_rot = $table[4][3];
$enthalpy_vib = $table[5][3];

# Free Energy
$g_tra = $table[3][4];
$g_rot = $table[4][4];
$g_vib = $table[5][4];

# Heat Cap. at const. pressure
$cp_tra = $table[3][6];
$cp_rot = $table[4][6];
$cp_vib = $table[5][6];

# cal to joule conversion
$c2j = 4.18;

?>


<div class="acontainer"> <!-- need this for ajax call -->

<h2>Thermodynamics at 298.15 K and standard pressure</h2>
<br />

<div style="width:445px;float:left;">
  <table>
    <tr><td class="center">Property</td><td class="center">Value</td><td class="center">Unit</td></tr>
    <tr><td>Heat of Formation</td><td class="right"><?php print format($hof*$c2j) ?></td><td class="right">kJ mol<sup>-1</sup></td><tr>
    <tr><td>Enthalpy</td><td class="right"><?php print format($enthalpy_total) ?></td><td class="right">kJ mol<sup>-1</sup></td><tr>
    <tr><td>Entropy</td><td class="right"><?php print format($entropy_total) ?></td><td class="right">J mol<sup>-1</sup> K<sup>-1</sup></td><tr>
    <tr><td>Heat Capacity at Constant Pressure</td><td class="right"><?php print format($cp_total) ?></td><td class="right">J mol <sup>-1</sup> K<sup>-1</sup></td><tr>
   <!-- <tr><td>Free Energy</td><td class="right"><?php print format($g_total) ?></td><td class="right">kJ mol <sup>-1</sup> </td><tr>-->
  </table>

  <table>
    <tr><td class="center" colspan="3">Enthalpy Contributions</td></tr>
    <tr><td class="center">Property</td><td class="center">Value</td><td class="center">Unit</td></tr>
    <tr><td>Translational</td><td class="right"><?php print format($enthalpy_tra) ?></td><td class="right">kJ mol<sup>-1</sup> </td><tr>
    <tr><td>Rotational</td><td class="right"><?php print format($enthalpy_rot) ?></td><td class="right">kJ mol<sup>-1</sup> </td><tr>
    <tr><td>Vibrational</td><td class="right"><?php print format($enthalpy_vib) ?></td><td class="right">kJ mol<sup>-1</sup></td><tr>
  </table>

</div>

<div style="width:445px;float:right;">

  <table>
    <tr><td class="center" colspan="3">Heat Capacity Contributions</td></tr>
    <tr><td class="center">Property</td><td class="center">Value</td><td class="center">Unit</td></tr>
    <tr><td>Translational</td><td class="right"><?php print format($cp_tra) ?></td><td class="right">J mol<sup>-1</sup> K<sup>-1</sup></td><tr>
    <tr><td>Rotational</td><td class="right"><?php print format($cp_rot) ?></td><td class="right">J mol<sup>-1</sup> K<sup>-1</sup></td><tr>
    <tr><td>Vibrational</td><td class="right"><?php print format($cp_vib) ?></td><td class="right">J mol<sup>-1</sup> K<sup>-1</sup></td><tr>
  </table>

<!--
  <div style="width:445px;height:180px;margin:0 0 20px 0;">

-->
<!--
    <script type="text/javascript">
    jmol_thermo = Jmol.getApplet("jmol_thermo", myInfo1);
    Jmol.script(jmol_thermo, 'load "<?php print BASEURL?>/data/<?php print $molid ?>/coordinates.xyz";');
    Jmol.script(jmol_thermo, 'set bondRadiusMilliAngstroms 100; set multipleBondSpacing -0.3');
    </script>
-->

<!--
  </div>

-->

<!--
  <table>
    <tr><td class="center" colspan="3">Free Energy Contributions</td></tr>
    <tr><td class="center">Property</td><td class="center">Value</td><td class="center">Unit</td></tr>
    <tr><td>Translational</td><td class="right"><?php print format($g_tra) ?></td><td class="right">kJ mol <sup>-1</sup></td><tr>
    <tr><td>Rotational</td><td class="right"><?php print format($g_rot) ?></td><td class="right">kJ mol <sup>-1</sup></td><tr>
    <tr><td>Vibrational</td><td class="right"><?php print format($g_vib) ?></td><td class="right">kJ mol<sup>-1</sup></td><tr>
  </table>
-->

  <table>
    <tr><td class="center" colspan="3">Entropy Contributions</td></tr>
    <tr><td class="center">Property</td><td class="center">Value</td><td class="center">Unit</td></tr>
    <tr><td>Translational</td><td class="right"><?php print format($entropy_tra) ?></td><td class="right">J mol<sup>-1</sup> K<sup>-1</sup></td><tr>
    <tr><td>Rotational</td><td class="right"><?php print format($entropy_rot) ?></td><td class="right">J mol<sup>-1</sup> K<sup>-1</sup></td><tr>
    <tr><td>Vibrational</td><td class="right"><?php print format($entropy_vib) ?></td><td class="right">J mol<sup>-1</sup> K<sup>-1</sup></td><tr>
  </table>

</div>


<div class="clean"></div>
</div>

