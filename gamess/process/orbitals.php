<?php
  
  /**
   * Data Treatmnet of
   * the HEAT input file
   *
   */

  //print $calt; // Calculation type
  //print $moli; // Molecular ID
  //$results_file; // File path
  //$molResultsfile // File contents
 
 
?>


<a href="#" class="button loadResult loadOrbitalResults">
  <span class="hvrHlpCnt"><span class="hvrHlp">Load results, before you can view the orbitals</span></span>
  Load Orbitals
</a>

<br />
<br />

<div style="height:250px;overflow:auto;background:white;border:1px solid #eee;padding:0 5px;">

<ul>
<?php
// CODE FROM TOKE F
$file = explode("EIGENVECTORS", $molResultsFile);
$file = explode("END OF RHF CALCULATION", $file[count($file)-1]);
$file = explode("\n", $file[0]);
$result = array();
for($i=0;$i<count($file);$i++){
  if($file[$i]==""){
    $energies = explode(" ",$file[$i+2]);
    for($j=0;$j<count($energies);$j++){
      if($energies[$j]!=""){
        array_push($result, $energies[$j]);
      }   
    }   
  }   
}
for($k=0;$k<count($result);$k++)
{
?>
  <li>
    <a href="#" rel="<?php print ($k+1); ?>" class="viewOrbital">
    <span class="number"><strong><?php print $k+1  ?></strong>:</span>
    <span class="amount"><?php print $result[$k]*27.21 ?></span>
    <span class="unit">eV</span>
    </a>
  </li>
<?
}
?>  
</li>
</div>

<script type="text/javascript">
$(function() 
{

  // Load Results File
  $('.button.loadOrbitalResults').click(function() {
    jmolScript('load data/<?php print $moli ?>/orbitals/results.log');
    jmolScript('set echo top left');
    jmolScript('color echo black');
    jmolScript('echo "Molecular Orbitals"');
    return false;
  });

  // View Orbital
  $('.viewOrbital').click(function() 
  { 
    var orbital = $(this).attr('rel');  
    jmolScript('mo '+orbital);
    return false;
  });

}); 
</script>




