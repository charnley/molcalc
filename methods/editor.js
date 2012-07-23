$(function(){
	
	/**
	 *  BUTTON LIST
	 */
		
		function runJmolCommand(cmd) 
		{
			// Save State
			
			jmolScript(cmd);
		}
		
		/*
		 * Load Molecule
		 */
		$('.action.load .button').click(function() 
		{	
			$.infoPrompt('Not implemented yet');
			return false;	
		});
		
		/*
		 * Save Molecule
		 */
		$('.action.save .button').click(function() 
		{	
			$.infoPrompt('Not implemented yet');
			return false;	
		});
		
		
		/*
		 * Set Bond Type
		 */
		$('.action.bond .button').click(function() 
		{	
			var bond = $(this).attr('rel');
			
			$('.action.bond .button.active').removeClass('active');
			
			if(bond == 'n') 
			{
				jmolScript('set bondpicking false;');
			}
			else
			{
				jmolScript('set picking assignBond_'+bond+';');
				$(this).addClass('active');
			}

			return false;	
		});
				
		/*
		 * Add Atom
		 */
		$('.action.atom .button').click(function() 
		{
			var atom = $(this).attr('rel');
			$('.action.atom .button.active').removeClass('active');
			
			switch(atom)
			{
				case 'off':
					jmolScript('set atomPicking off');
					break;
				case 'dra':
					// TODO Not working
					jmolScript('set atomPicking on');
					jmolScript("set minimizationRefresh false;set useMinimizationThread false");
					jmolScript("set picking dragmolecule;");
					$(this).addClass('active');
					break;
				default:
					jmolScript('set atomPicking on');
					jmolScript('set picking assignAtom_'+atom);
					$(this).addClass('active');
			}
			
			//notes:
			//jmolScript('set atompicking false;');
			//jmolScript("set minimizationRefresh false;set useMinimizationThread false");
			//jmolScript("set picking dragmolecule;");
			//jmolScript('set picking off');


			return false;
		});
		
		/*
		 * Undo last action
		 */
		$('.action.undo .button').click(function () 
		{
			$.infoPrompt('Not implemented yet');
		});
		
		/*
		 * Undo last action
		 */
		$('.action.minimize .button').click(function () 
		{
			jmolScript('minimize');
			return false;
		});

		/*
		 * Picture Time
		 */
		$('.action.pic .button').click(function() 
		{

			var rel = $(this).attr('rel');
			var $imgCnt = $('.note.picture');
			var imgStr;

			if(rel == '3d')
			{
				imgStr = "data:image/jpeg;base64,";
				imgStr = imgStr + jmolGetPropertyAsString("image", "all");
			}
			else 
			{
				// http://cactus.nci.nih.gov/ - CADD Group Chemoinformatics Tools and User Services
				//alert( jmolEvaluate("{*}.length") ); // Length of molecule

				jmolSmiles = jmolEvaluate("{*}.find('SMILES')");
				
				imgStr = 'http://cactus.nci.nih.gov/chemical/structure?string=';
				imgStr = imgStr + jmolSmiles;
				imgStr = imgStr + '&representation=image';					
			}

			$imgCnt.prepend('<a class="picture" href="'+imgStr+'" target="_blank"><img src="'+imgStr+'" /></a>');

		});
		
		/*
		 * Calculation Time
		 */
		$('.actions.calculation .button').click(function() 
		{
			
			var message = '<p>Are you sure? You wont be able to edit the molecule beyond this point.</p>';
			
			var yes = $('<a class="button okay">Yes, I\'m sure</a>');
			var no = $('<a class="button okay">No, wait</a>');
			
			// TODO
			// Check molecule size
			
			// TODO ERROR
			// Following code does not working in linux - chromeium
			
			var coordinates = jmolEvaluate('write("coords")');
			
			
			// Fake
			//coordinates = "5\n\nC 0.00000 0.00000 0.00000 \nH 0.00000 1.09300 0.00000 \nH 1.03049 -0.36433 0.00000 \nH -0.51525 -0.36433 0.89243 \nH -0.51525 -0.36433 -0.89243 \n";
			
			//jmolGetPropertyAsJSON("atomList","all"); ARRAY OF ALL ATOMS
			

			

			no.click(function() 
			{
				$.promptCancel();
			});
			
			yes.click(function() 
			{
				$.post("calculation", 
					{ atoms: coordinates, ajax: true},
					function(data) {
						if(data != 0)
						{
							url = window.location.href.replace('editor','calculation?m='+data);
							//console.log(url);
							window.location = url;
						}
						else
						{
							$.infoPrompt('Invalid molecule submitted. Please read terms for molcule calculations.');
						}
					}
				);
			});
			
			yes = $('<li></li>').append(yes);
			no = $('<li></li>').append(no);
			
			respond = $('<ul></ul>');
			respond.append(yes);
			respond.append(no);

			$.prompt(message,respond,'Calculation','calculate');
			
			return false;
		});
});
