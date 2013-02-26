<?php

$lines = file('../settings');
$settings = array();

foreach($lines as $line)
{
  $array = explode(':', $line);
  $settings[$array[0]] = str_replace("\n", "", $array[1]);
}

define("RUNGMS", $settings['gamess']);
define("TMP", $settings['tmp']);

function rungms($inp)
{
  shell_exec(RUNGMS.' '.$inp.'.inp > '.$inp.'.log');
}

