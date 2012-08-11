<?php
/**********************************************************************
minimizeandsave.inc.php

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
   * TODO Some noteS
   *
   */

  // Variables:
  // $molId  - the MD5 hash of the molecule
  // $molec_charge - The charge of the molecule

  // CHECK INPUT
 //LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib python molecule_charge.py q coordinates.xyz

  // LET'S GO!
  $root = '';
  $molFolder = $root.'data/'.$molId;

  // SETUP INPUT
  
  // EXECUTE GAMESS
  $rungms = '/srv/gamess/gamess/rungms';
  $cmd = $rungms.' '.$molId.'.inp > gamess.log';
  chdir($molFolder);
  shell_exec('babel -xf ../../includes/minimize.inp -ixyz coordinates.xyz.tmp -ogamin '.$molId.'.inp');
  shell_exec('sed -i "s/icharg=0/icharg='.intval($molec_charge).'/" *.inp');
  shell_exec($cmd);

  // EXPORT OUTPUT
  shell_exec('babel -igamess gamess.log -oxyz coordinates.xyz');
  
