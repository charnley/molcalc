<?php
	
	$datafolder;
	$molid;
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
			$fh = fopen($dataFolder.$xyzfile,'w');
			fwrite($fh, $filestring);
			fclose($fh);
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
		$molid = $_GET['m'];
?>
    <script>
      var molid = '<?php print $molid ?>';
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
					
					<div class="category wavefunction">
						<label>View</label>
						<h3>About</h3>
						<div class="note">
							Lorem Ipsum is simply dummy text of the printing and typesetting industry.
							<br /> <br />
							Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
						</div>
						
						
						<h3>Picture</h3>
						<div class="actions">
							<ul>
								<li class="action pic"><a rel="3d" class="button"><span class="hvrHlpCnt"><span class="hvrHlp">3D image via Jmol</span></span><span class="text">3D</span></a></li>
								<li class="action pic"><a rel="2d" class="button"><span class="hvrHlpCnt"><span class="hvrHlp">2D image via NCI/CADD Group</span></span><span class="text">2D</span></a></li>
							</ul>
							<div class="clean"></div>
						</div>
						<div class="note picture"></div>
						
						
						<h3>Measure Tools</h3>
						<!--
measure RANGE [min] [max] (atomset) (atomset) .....
measure all
measure allConnected
measure delete
measure "some label format"
measures off
message command
						-->
						<div class="note">
							TODO
						</div>
						
						
						
						
					</div>
					
					<div class="category wavefunction">
						<label>Heat</label>
						<h3>Heat of Formation Calculation</h3>
						<div class="note">
							Not done yet.
						</div>
					</div>
					
					<div class="category wavefunction">
						<label>Orbitals</label>
						<h3>Electronic Orbital Calculation</h3>
						<div class="actions">
							<ul>
								<li class="action electric calculate"><a rel="" class="button"><span class="hvrHlpCnt "><span class="hvrHlp">Do a full quantum chemical calculation</span></span>	<span class="text">Calculate</span></a></li>
							</ul>
							<div class="clean"></div>
						</div>
						<div class="actions">
							<ul>
								<li class="action ">		<a rel="" class="button"><span class="hvrHlpCnt "><span class="hvrHlp"></span></span>	<span class="text">Show wavefunctions</span></a></li>
							</ul>
							<div class="clean"></div>
						</div>
            <div class="note">
              <p>Problem understanding the result? See <a href="#">understanding results</a> for a quick explanation, and a guide to courses/books</p>
            </div>
					</div>
					
					<div class="category wavefunction">
						<label>Vibrations</label>
						<h3>Vibrational Energy Calculation</h3>
						<div class="note">
							Not done yet.
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
            jmolSetAppletColor('#F7F7F7');
            jmolSetAppletColor('#FFFFFF');
					</script>
				</div>
				<div class="canvas">
					<script>
						jmolApplet(560, "load /sites/gobi/data/<?php print $molid ?>/coordinates.xyz");
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
