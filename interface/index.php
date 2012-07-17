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
				<li><a href="#">Calculate</a></li>
				<li><a href="#">About DGU</a></li>
				<li><a href="#">Understanding Reulsts</a></li>
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
						
						<h3>Molecule Tools</h3>
						<div class="actions">
							<ul>
								<li class="action cut"><a href=""><span class="hvrHlpCnt"><span class="hvrHlp">Remove atom</span></span><span class="text">Remove</span></a></li>
								<li class="action undo"><a href=""><span class="hvrHlpCnt"><span class="hvrHlp">Undo last action</span></span><span class="text">Undo</span></a></li>
								<li class="action minimize"><a href=""><span class="hvrHlpCnt"><span class="hvrHlp">Minimize Geometry</span></span><span class="text">Minimize</span></a></li>
							</ul>
							<div class="clean"></div>
						</div>
						
						<hr />
						
						
						<h3>Atom Addition</h3>
						<div class="actions">
							<ul>
								<li class="action add"><a href=""><span class="hvrHlpCnt"><span class="hvrHlp">Hydrogen</span></span><span class="text">H</span></a></li>
								<li class="action add"><a href=""><span class="hvrHlpCnt"><span class="hvrHlp">Helium</span></span><span class="text">He</span></a></li>
								<li class="action add"><a href=""><span class="hvrHlpCnt"><span class="hvrHlp">Lithium</span></span><span class="text">Li</span></a></li>
								<li class="action add"><a href=""><span class="hvrHlpCnt"><span class="hvrHlp">Beryllium</span></span><span class="text">Be</span></a></li>
								<li class="action add"><a href=""><span class="hvrHlpCnt"><span class="hvrHlp">Boron</span></span><span class="text">B</span></a></li>
								<li class="action add"><a href=""><span class="hvrHlpCnt"><span class="hvrHlp">Carbon</span></span><span class="text">C</span></a></li>
								<li class="action add"><a href=""><span class="hvrHlpCnt"><span class="hvrHlp">Nitrogen</span></span><span class="text">N</span></a></li>
								<li class="action add"><a href=""><span class="hvrHlpCnt"><span class="hvrHlp">Oxygen</span></span><span class="text">O</span></a></li>
								<li class="action add"><a href=""><span class="hvrHlpCnt"><span class="hvrHlp">Fluorine</span></span><span class="text">F</span></a></li>
								<li class="action add"><a href=""><span class="hvrHlpCnt"><span class="hvrHlp">Neon</span></span><span class="text">Ne</span></a></li>
								<li class="action add"><a href=""><span class="hvrHlpCnt"><span class="hvrHlp">Sodium</span></span><span class="text">Na</span></a></li>
								<li class="action add"><a href=""><span class="hvrHlpCnt"><span class="hvrHlp">Magnesium</span></span><span class="text">Mg</span></a></li>
								<li class="action add"><a href=""><span class="hvrHlpCnt"><span class="hvrHlp">Aluminium</span></span><span class="text">Al</span></a></li>
								<li class="action add"><a href=""><span class="hvrHlpCnt"><span class="hvrHlp">Silicon</span></span><span class="text">Si</span></a></li>
								<li class="action add"><a href=""><span class="hvrHlpCnt"><span class="hvrHlp">Phosphorus</span></span><span class="text">P</span></a></li>
								<li class="action add"><a href=""><span class="hvrHlpCnt"><span class="hvrHlp">Sulfur</span></span><span class="text">S</span></a></li>
								<li class="action add"><a href=""><span class="hvrHlpCnt"><span class="hvrHlp">Chlorine</span></span><span class="text">Cl</span></a></li>
								<li class="action add"><a href=""><span class="hvrHlpCnt"><span class="hvrHlp">Argon</span></span><span class="text">Ar</span></a></li>
							</ul>
							<div class="clean"></div>
						</div>
						
						
						
					</div>
				
				</div>


				
			</section>
			
			<section class="column beta">
				
				<div class="note">
					Note: <br />
					If you are using Chrome on Linux you will notice lots of bugs, and I
					recommend you using Firefox instead.
				</div>
				
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
