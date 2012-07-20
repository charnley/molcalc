<section class="body">
	<section class="container">
		
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
						<label>About</label>
						<h3>About</h3>
						<div class="note">
							Lorem Ipsum is simply dummy text of the printing and typesetting industry.
							<br /> <br />
							Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
						</div>
					</div>
					
					<div class="category wavefunction">
						<label>Electric</label>
						<h3>Electronic Calculations</h3>
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
					</div>
					
					<div class="category wavefunction">
						<label>Vibrations</label>
						<h3>Vibrational Calculations</h3>
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
					</script>
				</div>
				<div class="canvas">
					<script>
						//jmolApplet(560);
						jmolApplet(560, "load start.xyz.gz");
					</script>
				</div>
			</section><!-- beta -->
			<div class="clean"></div>	
		</section>
		
		

				
				
	</section>
</section>
