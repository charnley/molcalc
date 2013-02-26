<?php

  // TODO
  // Check also for POST information, because
  // some search patterns are too destroted (like inchi)

  if(isset($_GET['search']))
  {
    $search = $_GET['search'];
  }
  else
  {
    print "0";
    die();
  }

$search = str_replace("%20", " ", $search);
// Search for $search in webspider database
//print shell_exec('../../tools/molecule_search.py '.$search.' | obabel -imol -oxyz -h --gen3d');
print shell_exec('../../tools/molecule_search.py "'.$search.'" | obabel -iinchi -oxyz -h --gen3d');

