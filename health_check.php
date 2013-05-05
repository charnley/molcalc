<?php

// TODO Create a test that test if molcalc is installed correctly
// based on the settings
// and installation notes

// TODO Check ChemSpider token
// if it is not there
// send a link to ChemSpider



?>

<head>
  <title>MolCalc Installation Test</title>
  <link rel="stylesheet" href="assets/style/screen.css" />
</head>

<body>
<div style="width:600px;padding:30px;">

<h1>MolCalc Installation Health Check</h1>

<p>
  Use this page to check what why your MolCalc is not working.
  If there is any issues report it on github.com/jensengroup/molcalc
</p>

<?php
  $babel = False;
  $obabel = False;
  $obabel_png = False;
  $chemspider = False;
  $rungms = False;
  $rungms_real = False;

?>





<table>
  <tr>
    <td><strong>Testname</strong></td>
    <td><strong>Result</strong></td>
  </tr>

<?php
  # Babel Test
  $output = shell_exec('./tools/molecule_search.py "ethanol"');
  $output = str_replace("\n", "", $output);
  if ($output == "InChI=1/C2H6O/c1-2-3/h3H,2H2,1H3" )
  {
    $chemspider = True;
  }
?>
  <tr>
    <td>Chemspider</td>
    <td>
    <?php
      if($chemspider)
      {
        print "PASSED";
      }
      else
      {
        print "FAILED";
?>
<p>Chemspider is used for editor search and common name to inchi conversion</p>
<p>Please check if the token is installed on setup.</p>
<p>http://www.chemspider.com/AboutServices.aspx</p>
<p>Please register at chemspider to use this service, and insert the API TOKEN in the settings file under chemspider</p>
<p>http://www.chemspider.com/controls/Login/RegForm.aspx</p>

<?
      }
    ?>
    </td>
  <tr>





</table>


</div>
</body>




