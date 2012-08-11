<?php
/**********************************************************************
calculation.php

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
	
	$datafolder;
	$molId;
	$xyzfile;
	
	/*
	 * First check if this is a new
	 * molecule, and create the folders.
	 * 
	 * This is for the AJAX call from
	 * editor.js
	 */
	if(isset($_POST['atoms']))
	{
    
		$filestring = $_POST['atoms'];
		
		$molId = md5($filestring);
		$dataFolder = 'data/'.$molId.'/';
		
		if(is_dir($dataFolder))
		{
			// Don't generate folder again.
		}
		else
		{
			// Generate Molecule Folder
			mkdir('data/'.$molId);
			
			// Generate XYZ File
			$xyzfile = "coordinates.xyz";
			$fh = fopen($dataFolder.$xyzfile.'.tmp','w');
			fwrite($fh, $filestring);
			fclose($fh);
      
      // Check molecule
      include('includes/checkmolc.inc.php');

      // Minimize geometry and Save coordinates
      include('includes/minimizeandsave.inc.php');
		}
		
		print $molId;
		exit();
	}
	
?>

<section class="body">
	<section class="container">

<?php
	/*
	 * Check if posted molcule exist
	 * and load the files.
	 */ 
	if(isset($_GET['m'])):
		$molId = $_GET['m'];
?>
    <script>
      var molid = '<?php print $molId ?>';
    </script>
		
		<section class="twocolumn calculate">
			
			<h1>Molecule Calculator</h1>
			
			<section class="column alpha tab">
				
				<div class="tabs">
					<ul>
					</ul>
					<div class="clean"></div>
				</div>
				
				<div class="editor">
					


          <?php
            include_once('gamess/treatment.php'); 
            $calculations = array(
              'heat' => 'Heat of Formation Calculation',
              'orbitals' => 'Molecular Orbital Calculation',
              'vibrations' => 'Vibrational Frequency Calculation'
            );
          ?>
					<div class="category">
						<label>Calculations</label>
            <h3>Calculation</h3>
            <div class="note">
            <a href="#" class="button active loadResult loadInpMol">
              <span class="hvrHlpCnt"><span class="hvrHlp">Load input molecule</span></span>
              Load Molecule
            </a>
            </div>
					<?php foreach($calculations as $name => $calculation): ?>
            <div class="calculationtype" rel="<?php print $name ?>">
						  <h4><a class="calculation cat headlin"><?php print $calculation ?></a></h4>
						  <div class="results output">
              <div class="outputContainer">
                <?php 
                  $calType = 'motype';
                  processData($molId,$name);
                ?>
              </div>
						  </div>
            </div>
          <?php endforeach; ?>
            <hr />
            <br />
            <h3 class="hidden">Further more</h3>
					  <div class="note hidden">
              <p>Problem understanding the result? See <a href="#">understanding results</a> for a quick explanation, and a guide to courses/books</p>
            </div>
            
					 </div><!-- end of calculations -->

					<div class="category views">

						<label>Tools</label>
						<h3>Molecule Tools</h3>
						<div class="note"></div>
						
						<h3>Picture</h3>
						<div class="actions">
							<ul>
								<li class="action pic"><a rel="3d" class="button"><span class="hvrHlpCnt"><span class="hvrHlp">3D image via Jmol</span></span><span class="text">3D</span></a></li>
								<li class="action pic"><a rel="2d" class="button"><span class="hvrHlpCnt"><span class="hvrHlp">2D image via NCI/CADD Group</span></span><span class="text">2D</span></a></li>
							</ul>
							<div class="clean"></div>
						</div>
						<div class="note picture"></div>
						
					</div><!-- end of view -->

            </div>
					</div>
					
				</div>
				
				
			</section><!-- alpha -->
			
			<section class="column beta">
				
				<div class="hidden">
					<script>
						// Initialize jMol
						jmolInitialize("script/jmol");
						jmolCheckBrowser("popup", "browsercheck", "onClick");
           // jmolSetAppletColor('#F7F7F7');
            jmolSetAppletColor('#FFFFFF');
					</script>
				</div>
				<div class="canvas">
					<script>
						jmolApplet(560, "load data/<?php print $molId ?>/coordinates.xyz");
					</script>
				</div>
			</section><!-- beta -->
			<div class="clean"></div>	
		</section>
		
		

				
				

<?php // LIST OF CALCULATIONS ?>
<?php else:?>
	
	<h1>Calculations</h1>
	
	<?php
		$calculations = scandir('data');
	?>	
	<ul>
	<?php foreach($calculations as $calculation): ?>
		
		<?php
			if($calculation == '..' || $calculation == '.') continue;
		?>
		
		<li><a href="?m=<?php print $calculation ?>">Mol <?php print $calculation ?></a></li>
		
	<?php endforeach ?>
	</ul>
	
<?php endif; ?>
	</section>
</section>
