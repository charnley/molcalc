<?php

// GAMESS Uploader

if(isset($_POST['name'])):

  $name = $_POST['name'];

  // Check what files are uploaded
  if(isset($_FILES['file_thermo'])) $thefile = $_FILES['file_thermo'];
  if(isset($_FILES['file_orbitals'])) $orbfile = $_FILES['file_orbitals'];
  if(isset($_FILES['file_vibrations'])) $vibfile = $_FILES['file_vibrations'];
  // name, type, size, tmp_name

  // Typical error is 4, if nothing is uploaded
  if($thefile['error'] > 0 && $orbfile['error'] > 0 && $vibfile['error'] > 0)
  {
    print "No files uploaded";
    die();
  }

  if($name=='')
  {
    print "No name given";
    die();
  }

  $hash = md5($name.$thefile['tmp_name'].$orbfile['tmp_name'].$vibfile['tmp_name']);
  $dir = '../data/'.$hash;

  if(is_dir($dir))
  {
    print "It was unlikely but, hash already exist, No exception given.";
    die();
  }

  mkdir($dir);
  chdir($dir);

  $saved = false;

  $db = array();
  $db['name'] = $name;
  $db['uploaded'] = true;

  foreach(array(
    "thermo" => $thefile,
    "orbitals" => $orbfile,
    "vibrations" => $vibfile) as $key => $file)
  {
    if($file['error'] > 0) continue;
    print_r($file);
    $db[$key] = true;
    mkdir($key);
    copy($file['tmp_name'], $key.'/results.log');
    if(!$saved)
    {
      shell_exec('babel -igamout '.$key.'/results.log -oxyz coordinates.xyz');
      $saved = true;
    }
  }

  // Babel
  shell_exec('babel -ixyz coordinates.xyz -O thumbnail.png --title " "');
  $smiles = shell_exec('babel -ixyz coordinates.xyz -osmiles --title " "');
  $inchi = shell_exec('babel  -ixyz coordinates.xyz -oinchi  --title " "');
  $db['smiles'] = str_replace("\n", '', $smiles);
  $db['inchi'] = str_replace("\n", '', $inchi);

  $string = "";
  foreach($db as $key => $entry)
  {
    $string = $string.$key.":".$entry;
    $string = $string."\n";
  }

  print $hash;

  file_put_contents('molecule.db', $string);

else:

?>

<section class="body">
  <section class="container">


<form action="upload" method="post" enctype="multipart/form-data" id="upload_form">
    <h1>Upload Molecule Results</h1>


    <div class="calculationtype">

      <p>
Please note:<br />
It matters what log file is
upload for the categories.
      </p>

    </div>


    <div class="calculationtype" style="width:435px;float:left;">
      <h2>Settings</h2>
      <br />
      <input type="hidden" value="true" id="ajax" name="ajax" />

      <div class="text">
        <label><strong>Title</strong></label><br />
        <input id="name" name="name" type="text" placeholder="fx. Benzene" style="width:96%" />
      </div>
      <br />

    </div>

    <div class="calculationtype" style="width:435px;float:right;">
      <h2>Thermodynamics</h2>
      <br />
      <div class="file">
        <input type="file" name="file_thermo" id="file_thermo" />
      </div>
      <br />
    </div>

    <div class="calculationtype" style="width:435px;float:right;">
      <h2>Molecular Orbitals</h2>
      <br />
      <div class="file">
        <input type="file" name="file_orbitals" id="file_orbitals" />
      </div>
      <br />
    </div>

    <div class="clean"></div>

    <div class="calculationtype" style="width:435px;float:right;">
      <h2>Vibrational Frequencies</h2>
      <br />
      <div class="file">
        <input type="file" name="file_vibrations" id="file_vibrations" />
      </div>
      <br />
    </div>

    <div class="clean"></div>

    <div class="calculationtype">
      <p><a class="button upload">Upload</a></p>
    </div>

</form>

  </section>
</section>

<?php

endif;

?>
