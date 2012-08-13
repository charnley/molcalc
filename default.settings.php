<?php
/**********************************************************************
settings.php

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
  
  /*
   * Settings Array
   *
   * - $settings['gamess']['rungms'] -
   * String containing absolute path to the rungms shell
   * script located in the GAMESS folder.
   *
   * - $settings['server']['root']
   * String containg the server root from public view
   * eg http://dgu.ki.ku.dk/molcalc
   * without following slash
   *
   */

  $settings = array(
    'gamess' => array (
      'rungms' => '/opt/gamess/rungms'
    ),
    'server' => array (
      'root' => 'http://'.$_SERVER["SERVER_NAME"].'/molcalc'
    )
  );


