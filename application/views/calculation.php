<?php
/**********************************************************************
calculation.php

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
?>

<section class="body">
    <section class="container">
<!-- CONTENT -->

<?php
if(isset($_GET['m'])):

$molId = $_GET['m'];
chdir('../data/'.$hash);

// VARIABLES
// $hash - $molid
// $molInfo - array of molecule info

$calculationnames = array('thermo', 'orbitals', 'vibrations','solvation');
$calculationbtns  = array(
  'thermo' => 'Thermodynamics',
  'orbitals' => 'Molecular Orbitals',
  'vibrations' => 'Vibrational Frequencies',
  'solvation' => 'Polarity and Solvation'
);
$calculationtypes = array();

if(isset($molInfo['uploaded']))
{
  foreach($calculationnames as $c)
  {
    if(isset($molInfo[$c]))
    {
      $calculationtypes[] = $c;
    }
  }
}
else
{
  $calculationtypes = $calculationnames;
}

?>

  <script>
  var molid = '<?php print $hash ?>';
  </script>
  <script type="text/javascript">
  var myJmol1;
  var myInfo1 = {
      height: '100%',
      width: '100%',
      j2sPath: "../assets/script/jsmol/j2s",
      use: 'HTML5',
      console: "myJmol1_infodiv",
      debug: false
  };
  </script>

<h1><?php print $molInfo['name'] != "0" && $molInfo['name'] != "" ? $molInfo['name'] : "&nbsp;";  ?></h1>

<div class="calculation_page">
  <div class="view_navigation">
    <ul>
      <li class="info"><a class="button active" href="#/">Molecule</a></li>
<?php foreach($calculationtypes as $c): ?>
      <li class="<?php print $c ?>"><a class="button" href="#/<?php print $c ?>"><?php print $calculationbtns[$c] ?></a></li>
<?php endforeach; ?>
    </ul>
  </div>

  <div class="calculationtype info">
    <h2>Molecule Viewer</h2>
    <br />

    <div class="viewer" style="float:right;width:500px;height:500px;margin-bottom:20px;">
        <script type="text/javascript">
        jmol_intro = Jmol.getApplet("jmol_intro", myInfo1);
//        Jmol.script(jmol_intro, 'set autoBond On'); Not working
        Jmol.script(jmol_intro, 'load "<?php print BASEURL?>/data/<?php print $hash ?>/coordinates.xyz";');
        Jmol.script(jmol_intro, 'set bondRadiusMilliAngstroms 100; set multipleBondSpacing -0.3');
        </script>
    </div>

    <div style="width:400px;padding:100px 0 0 0;">
      <img src="<?php print BASEURL ?>/data/<?php print $hash ?>/thumbnail.png" />
    </div>

    <div class="clean"></div>
  </div>

<?php
// Print the results
include_once('calculation_view.php');

foreach($calculationtypes as $calculationtype):
?>
  <div class="calculationtype <?php print $calculationtype ?>">

  <?php showResult($hash, $calculationtype); ?>

  </div>
<?
endforeach;
?>

</div>



<?php // LIST OF CALCULATIONS ?>
<?php else:?>

  <br />
<?php
$calculations = scandir('../data');
function cmp($a, $b)
{
  if($b["name"] == "")
  {
    return -1;
  }
  if($a["name"] == "")
  {
    return 1;
  }
  return strcmp($a["name"], $b["name"]);
}
$calculationlist = array();
foreach($calculations as $calid)
{
  if($calid == '..' || $calid == '.'  || $calid == 'index.html') continue;

  $lines = file('../data/'.$calid.'/molecule.db');
  $molInfo = array();
  foreach($lines as $line)
  {
    if($line == "\n") continue; // ops, extra line
    $array = explode(':', $line);
    $molInfo[$array[0]] = str_replace("\n", "", $array[1]);
  }
  $molInfo['hash'] = $calid;
  $calculationlist[] = $molInfo;
}
usort($calculationlist, "cmp");
?>

  <div class="molcalc_histlist">
  <ul>
  <?php foreach($calculationlist as $cal): ?>

		<li>
      <a href="<?php print BASEURL ?>/calculation/<?php print $cal['hash'] ?>">
        <img src="<?php print BASEURL ?>/data/<?php print $cal['hash'] ?>/thumbnail.png" />
        <span class="title">
          <?php print $cal['name'] != "0" && $cal['name'] != "" ? $cal['name'] : $cal['inchi'];  ?>
        </span>
      </a>
    </li>
		
	<?php endforeach ?>
	</ul>
	<div class="clean"></div>	
  </div>

<?php endif; ?>
<!-- END CONTENT -->
	</section>
</section>


