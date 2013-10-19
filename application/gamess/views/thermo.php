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
    <tr><td class="center" colspan="3" style="font-weight:bold">Enthalpy</td></tr>
    <tr><td class="center" style="width:50%">Property</td><td style="width:25%" class="center">Value</td><td style="width:25%" class="center">Unit</td></tr>
    <tr><td>Translational</td><td class="right"><?php print format($enthalpy_tra) ?></td><td class="right">kJ mol<sup>-1</sup> </td><tr>
    <tr><td>Rotational</td><td class="right"><?php print format($enthalpy_rot) ?></td><td class="right">kJ mol<sup>-1</sup> </td><tr>
    <tr><td>Vibrational</td><td class="right"><?php print format($enthalpy_vib) ?></td><td class="right">kJ mol<sup>-1</sup></td><tr>
    <tr><td>Total (Trans. + Rot. + Vib.)</td><td class="right"><?php print format($enthalpy_total) ?></td><td class="right">kJ mol<sup>-1</sup></td><tr>
  </table>

  <table>
    <tr><td class="center" colspan="3" style="font-weight:bold">Heat Capacity at Constant Pressure</td></tr>
    <tr><td class="center" style="width:50%">Property</td><td style="width:25%" class="center">Value</td><td style="width:25%" class="center">Unit</td></tr>
    <tr><td>Translational</td><td class="right"><?php print format($cp_tra) ?></td><td class="right">J mol<sup>-1</sup> K<sup>-1</sup></td><tr>
    <tr><td>Rotational</td><td class="right"><?php print format($cp_rot) ?></td><td class="right">J mol<sup>-1</sup> K<sup>-1</sup></td><tr>
    <tr><td>Vibrational</td><td class="right"><?php print format($cp_vib) ?></td><td class="right">J mol<sup>-1</sup> K<sup>-1</sup></td><tr>
    <tr><td>Total (Trans. + Rot. + Vib.)</td><td class="right"><?php print format($cp_total) ?></td><td class="right">J mol<sup>-1</sup> K<sup>-1</sup></td><tr>
  </table>
</div>

<div style="width:445px;float:right;">
  <table>
    <tr><td class="center" colspan="3" style="font-weight:bold">Entropy</td></tr>
    <tr><td class="center" style="width:50%">Property</td><td style="width:25%" class="center">Value</td><td style="width:25%" class="center">Unit</td></tr>
    <tr><td>Translational</td><td class="right"><?php print format($entropy_tra) ?></td><td class="right">J mol<sup>-1</sup> K<sup>-1</sup></td><tr>
    <tr><td>Rotational</td><td class="right"><?php print format($entropy_rot) ?></td><td class="right">J mol<sup>-1</sup> K<sup>-1</sup></td><tr>
    <tr><td>Vibrational</td><td class="right"><?php print format($entropy_vib) ?></td><td class="right">J mol<sup>-1</sup> K<sup>-1</sup></td><tr>
    <tr><td>Total (Trans. + Rot. + Vib.)</td><td class="right"><?php print format($entropy_total) ?></td><td class="right">J mol<sup>-1</sup> K<sup>-1</sup></td><tr>
  </table>

  <table>
    <tr><td class="center" colspan="3" style="font-weight:bold">Other Properties</td></tr>
    <tr><td class="center" style="width:50%">Property</td><td style="width:25%" class="center">Value</td><td style="width:25%" class="center">Unit</td></tr>
    <tr><td>Heat of Formation</td><td class="right"><?php print format($hof*$c2j) ?></td><td class="right">kJ mol<sup>-1</sup></td><tr>
  </table>
</div>



</div>

<div class="clean"></div>
</div>

