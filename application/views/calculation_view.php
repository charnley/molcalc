<?php
/**********************************************************************
calculation_view.py

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

// Loader for the calculation views

function format($number)
{
  return number_format($number, 2, '.', '');
}

/**
 * Show Calculation Results
 * @param $molid Hash string of the molecule
 * @param $caltyp string for the calculation type
 */
function showResult($molid, $caltype)
{
  $result_file = $caltype.'/results.log';
  $results_exists = file_exists($result_file);

  if($results_exists)
  {
    // Check status of result
    $gamessCrashStatus = "GAMESS TERMINATED -ABNORMALLY-";
    $gamessScfStatus   = "SCF IS UNCONVERGED, TOO MANY ITERATIONS";
    $gamessDatStatus   = "Please save, rename, or erase these files from a previous run:";
    $result_file_c = file_get_contents($result_file);
    $results_failed = strpos($result_file_c, $gamessCrashStatus);
    $results_unconv = strpos($result_file_c, $gamessScfStatus);

    if($results_failed === false && $results_unconv ==false)
    {
      // Print results
      // long include, because 'you' are already in the molfolder
      include_once('../../application/gamess/views/'.$caltype.'.php');
    }
    else
    {
      // Print Error Message
      ?>

      <div>
      <h2>Calculation Failed</h2>
      <br />
      <div class="error gamess code">
<?php
        $cmd_fail = 'grep -B10 "ABNORM" '.$result_file_c;
        $cmd_unco = 'grep -A4 "SCF IS UNCONVERGED" '.$result_file_c;
        print str_replace(array('<br /><br /><br />',"<br /><br />"),'<br />', str_replace("\n",'<br />',shell_exec($cmd_fail)));
        print str_replace(array('<br /><br /><br />',"<br /><br />"),'<br />', str_replace("\n",'<br />',shell_exec($cmd_unco)));
?>
      </div>
      </div>

      <?php
    }



  }
  else
  {
    print '<p><a class="button calculateInput">Calculate</a></p>';
  }
}

