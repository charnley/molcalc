<?php
/**********************************************************************
solvation.php

Copyright (C) 2013 Jimmy Charnley Kromann & Maher Channir, DGU

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


  # Create mol2 file
  shell_exec('babel -igamout solvation/results.log -omol2 solvation/results.mol2');

  # Get solvation data,charge of molecule, surface area, dipole
  $solvlines = shell_exec('grep -A10 "ELECTROSTATIC INTERACTION    =" solvation/results.log');
  $chargelines = shell_exec('grep "CHARGE OF MOLECULE" solvation/results.log');
  $arealines = shell_exec('grep "SURFACE AREA" solvation/results.log');
  $dipolelines = shell_exec('grep -A1 "DEBYE" solvation/results.log');
  
  foreach(preg_split("/\n/", $solvlines) as $line)
  {
    $solvtable[] = preg_split("/\s+/", $line);
  }

  foreach(preg_split("/\n/", $arealines) as $line)
  {
    $areatable[] = preg_split("/\s+/", $line);
  }

  foreach(preg_split("/\n/", $dipolelines) as $line)
  {
    $dipoletable[] = preg_split("/\s+/", $line);
  }

  $charge = preg_split("/\s+/", $chargelines);
  $charge = $charge[5]; # Charge of Molecule
  
  $elec = $solvtable[9][1]; # Electrostatic Interaction
  $cav = $solvtable[1][5]; # Pierotti Cavitation Energy
  $disp = $solvtable[2][5]; # Dispersion Energy
  $rep = $solvtable[3][5]; # Repulsion Energy
  $totsolv = $solvtable[9][3]; # Total Solvation Energy
  $nonpolar = $cav+$disp+$rep;

  $dipole = $dipoletable[4][4]; # Dipole moment
  $dipolex = $dipoletable[4][1];
  $dipoley = $dipoletable[4][2];
  $dipolez = $dipoletable[4][3];

  $areatable = preg_split("/[(]/",$areatable[0][3]); 
  $surfarea = $areatable[0]; # Surface Area

  $c2j = 4.18; # cal to joule 

?>

<div class="acontainer"> <!-- need this for ajax call -->

<h2>Aqueous Solvation Energy at 298.15 K</h2>
<br />

<div class="surface" style="width:400px;float:left;">
  <table>
    <tr>
      <td style="width:50%">Surface</td>
      <td class="center">
        <a class="button surface active" rel="on">On</a>
        <a class="button surface" rel="off">Off</a>
      </td>
    </tr>

    <tr>
      <td style="width:50%">Dipole</td>
      <td class="center">
        <a class="button dipole" rel="on">On</a>
        <a class="button dipole active" rel="off">Off</a>
      </td>
    </tr>

    <tr>
      <td style="width:50%">Translucent Molecule</td>
      <td class="center">
        <a class="button molecule" rel="on">On</a>
        <a class="button molecule active" rel="off">Off</a>
      </td>
    </tr>
  </table>

  <table>
    <tr><td class="center" style="width:50%">Property</td><td style="width:25%" class="center">Value</td><td style="width:25%" class="center">Units</td><tr>
    <tr><td>Total Solvation Energy</td><td class="right"><?php print format($totsolv*$c2j) ?></td><td class="right">kJ mol<sup>-1</sup></td><tr>
    <tr><td>Polar Solvation Energy</td><td class="right"><?php print format($elec*$c2j) ?></td><td class="right">kJ mol<sup>-1</sup></td><tr>
    <tr><td>Nonpolar Solvation Energy</td><td class="right"><?php print format($nonpolar*$c2j) ?></td><td class="right">kJ mol<sup>-1</sup></td><tr>

  </table>

  <table>
    <tr><td style="width:50%">Surface Area</td><td style="width:25%" class="right"><?php print format($surfarea) ?></td><td style="width:25%" class="right">Å<sup>2</sup></td><tr>
    <tr><td>Charge of Molecule</td><td class="right"><?php print $charge ?></td><td class="right"></td><tr>
    <tr><td>Dipole</td><td class="right"><?php print format($dipole) ?></td><td class="right">Debye</td><tr>

  </table>

</div>

<div class="surface viewer" style="width:500px;height:500px;float:right;">

  <script type="text/javascript">
  jmol_surf = Jmol.getApplet("jmol_solvation", myInfo1);
  Jmol.script(jmol_surf, 'load "<?php print BASEURL?>/data/<?php print $molid ?>/solvation/results.mol2";');
  Jmol.script(jmol_surf, 'set bondRadiusMilliAngstroms 100; set multipleBondSpacing -0.3');
  Jmol.script(jmol_surf, 'set solventProbe 1.4; isosurface molecular map mep');
  Jmol.script(jmol_surf, 'color isosurface translucent 0.5');
  Jmol.script(jmol_surf, 'color $isosurface1 "roygb" range -0.05 0.05');
  Jmol.script(jmol_surf, 'hover q_%e%i = %.2P');

  // Get center of mass
  Jmol.script(jmol_surf, 'atomSet = {*}; n = atomSet.size; \
                          var mx = 0;var my = 0;var mz = 0; \
                          for (i=0; i<n; i+=1): mx = mx+atomSet[i].x*atomSet[i].mass; my = my+atomSet[i].y*atomSet[i].mass; mz = mz+atomSet[i].z*atomSet[i].mass'); 
  Jmol.script(jmol_surf, 'atomSet = {*}; m = atomSet.mass.sum; cx = @mx / @m; cy = @my / @m; cz = @mz / @m;');

  // Dipole coordinates
  Jmol.script(jmol_surf, 'dx = @cx - <?php print $dipolex ?>; dy = @cy - <?php print $dipoley?>; dz = @cz - <?php print $dipolez?>');
  // Move Dipole vector to Center of Mass
  Jmol.script(jmol_surf, 'dx1 = @cx+0.5*(@cx-@dx); dy1 = @cy+0.5*(@cy-@dy); dz1 = @cz+0.5*(@cz-@dz);');
  Jmol.script(jmol_surf, 'dx2 = @dx+0.5*(@cx-@dx); dy2 = @dy+0.5*(@cy-@dy); dz2 = @dz+0.5*(@cz-@dz);');


  // Set text
  Jmol.script(jmol_surf, 'set echo "surface" 50% 6%; \
                          set echo "surface" center; \
                          font echo 13; \
                          color echo black; \
                          echo Blue: Positive, Red: Negative;');
  Jmol.script(jmol_surf, 'set echo "charge" 50% 0%; \
                          set echo "charge" center; \
                          font echo 13; color echo black; \
                          echo Mouse over atoms for partial charge;');
  Jmol.script(jmol_surf, 'set echo "plus" {@dx1,@dy1,@dz1}; \
                          font echo 25; color echo black; echo "+"; \
                          set echo "plus" hidden');
  Jmol.script(jmol_surf, 'set echo "minus" {@dx2,@dy2,@dz2}; \
                          font echo 35; color echo black; echo "-"; \
                          set echo "minus" hidden');


  </script>

</div>




<script type="text/javascript">
$(function()
{

  // Surface on off
  $('.button.surface').click(function() {
    $('.button.surface.active').removeClass('active');
    $(this).addClass('active');
    var rel = $(this).attr('rel');
    Jmol.script(jmol_surf, 'isosurface '+rel);
    if (rel == 'on' )
    {Jmol.script(jmol_surf, 'set echo "surface" displayed');}
    else
    {Jmol.script(jmol_surf, 'set echo "surface" hidden ');}
  });

  // Dipole on off
  $('.button.dipole').click(function() {
    $('.button.dipole.active').removeClass('active');
    $(this).addClass('active');
    var rel = $(this).attr('rel');
    Jmol.script(jmol_surf, 'dipole arrow1 <?php print $dipole?> {@dx1,@dy1,@dz1} {@dx2,@dy2,@dz2}\
                            NOCROSS width 0.05; color $arrow1 black; \
                            dipole arrow1 '+rel+'; \
                            draw ctr diameter 0.1 color black {@cx,@cy,@cz} '+rel);
    if (rel == 'on' )
    {Jmol.script(jmol_surf, 'set echo "plus" displayed; \
                             set echo "minus" displayed');}
    else
    {Jmol.script(jmol_surf, 'set echo "plus" hidden; \
                             set echo "minus" hidden');}
  });

  // Translucent Molecule on off
  $('.button.molecule').click(function() {
    $('.button.molecule.active').removeClass('active');
    $(this).addClass('active');
    var rel = $(this).attr('rel');
    if (rel == 'on' )
    {Jmol.script(jmol_surf, 'color atoms translucent 0.4; \
                             color bonds translucent 0.7');}
    else
    {Jmol.script(jmol_surf, 'color atoms translucent 0; \
                             color bonds translucent 0');}
  });

});
</script>
<div class="clean"></div>
</div>


