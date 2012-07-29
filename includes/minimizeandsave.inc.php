<?php

  // $xyzfileLocation =  $dataFolder.$xyzfile.'.tmp';
  // $molId 

  $root = '';
  
  $molFolder = $root.'data/'.$molId;

  // SETUP INPUT
  
  // EXECUTE GAMESS
  $rungms = '/srv/gamess/gamess/rungms';
  
  $cmd = $rungms.' '.$molId.'.inp > gamess.log';
  
  chdir($molFolder);
  
  shell_exec('babel -xf ../../includes/minimize.inp -ixyz coordinates.xyz.tmp -ogamin '.$molId.'.inp');
  
  shell_exec($cmd);

  // GET OUTPUT
  shell_exec('babel -igamess gamess.log -oxyz coordinates.xyz');
  
