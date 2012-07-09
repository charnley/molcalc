<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	
	<title>GAMESS and OpenBabel Interface V2 - GOBI2</title>
	
	<link rel="stylesheet" href="style/screen.css" >
	
	<script type="text/javascript" src="script/jmol/Jmol.js"></script>
	<script type="text/javascript" src="script/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="script/gobi_main.js"></script>
	

	
</head>
<body>


<header>
	<section class="container">
		<section class="logo">
			<a href="#HOME">
				<h1>GOBI2</h1>
			</a>
		</section>
		<section class="navigation">
			<ul>
				<li><a href="#">Create Molecule</a></li>
				<li><a href="#">Help</a></li>
			</ul>
		</section>
	</section>
</header>

<section class="body">
	<section class="container">
		
		<!-- PAGE -->
		<section class="threecolumn">
			
			<section class="column alpha">
				
	
				
				<div class="editor">
					
					<div class="category">
						<label>Edit</label>
						
						<h3>Edit Molecule</h3>
						<div class="actions">
							<ul>
								<li class="action cut"><a href="#">Cut</a></li>
								<li class="action add"><a href="#">Add Atom</a></li>
								<li class="action minimize"><a href="#">Minimize</a></li>
							</ul>
							<div class="clean"></div>
						</div>
						
						<hr />
						
						
						<h3>Add Atom</h3>
						<div class="actions">
							<ul>
								<li class="action add"><a href="#">H</a></li>
								<li class="action add"><a href="#">He</a></li>
								<li class="action add"><a href="#">Cl</a></li>
								<li class="action add"><a href="#">Be</a></li>
								<li class="action add"><a href="#">C</a></li>
							</ul>
							<div class="clean"></div>
						</div>
						
						
						
					</div>
				
				</div>


				
			</section>
			
			<section class="column beta">
				
			</section>
			
			<section class="column gamma">
				<div class="hidden">
					<script>
						// Initialize jMol
						jmolInitialize("script/jmol");
						jmolCheckBrowser("popup", "browsercheck", "onClick");
					</script>
				</div>
				<div class="canvas">
					<script>
						//jmolApplet(460);
						jmolApplet(460, "load caffeine.xyz.gz");
					</script>
				</div>
				

				<div class="add_atom_to_molecule hidden">
					<?php include('includes/periodic.inc.php');?>
				</div>

				
				<br />
				<br />
				<br />
				<br />
				
			</section>
			<div class="clean"></div>
		</section>
		<!-- /PAGE -->
		
	</section>
</section>


<footer>
	<section class="container">
		
	</section>
</footer>

</body>
</html>
