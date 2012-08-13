<?php
/**********************************************************************
checkmolc.inc.php

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
  /**
   * Check molecule
   * 
   * Used between the editor and calculation step
   */

  $xyzFileLocation = $dataFolder.'coordinates.xyz.tmp';
  
  $checkcmd = "LD_LIBRARY_PATH=\$LD_LIBRARY_PATH:/usr/local/lib python python/molecule_charge.py";

  $molec_charge = shell_exec($checkcmd.' q '.$xyzFileLocation);
  $core_charges = shell_exec($checkcmd.' z '.$xyzFileLocation);

  if($odd = ($core_charges - $molec_charge)%2) 
  {
    // Print Error Message
    print "Your current molecule has an odd number of electrons.  MolCalc only works for molecules with all doubly occupied orbitals.";  
    
    // CleanUp HASH Files
    shell_exec('rm -r '.$dataFolder);

    // Exit
    exit();
  }
  
  // Write molecule charge to file
  $fh = fopen($dataFolder.'charge','w');
  fwrite($fh, intval($molec_charge));
  fclose($fh);

