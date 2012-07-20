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
					jmolScript("set minimizationRefresh false;set useMinimizationThread false");
					jmolScript("set picking dragmolecule;");
					$(this).addClass('active');
					break;
				default:
					jmolScript('set picking assignAtom_'+atom);
					$(this).addClass('active');
			}
			
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
			// TODO Load saved structure
			
			
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

});
