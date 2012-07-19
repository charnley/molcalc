/**
 * 
 * GOBI
 * GAMESS and ObenBAbel Interface
 * 
 */
$(function(){


		
		// TODO Save State before each action.
		// TODO Does not really need to be in jquery
		
		// TODO Add element (up to Ar)
		// TODO Add bond (up to triple bond)
		// TOOO Undo last action 
		// TODO Remove Atom
		// TODO Remove Bond
	
	// TODO Jquery notification system
	// - Prompt (questions)
	// - Small Notification (gnome like)
	// - 
	
	
	
	// TODO MOVE BUTTONS TO SEPERATE JS FOR SPECIFIC PAGE
	
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
			var atom = $(this).find('.text').html();
			$('.action.atom .button.active').removeClass('active');
			
			if(atom == 'Off')
			{
				//jmolScript('set atompicking false;');
				//jmolScript("set minimizationRefresh false;set useMinimizationThread false");
				//jmolScript("set picking dragmolecule;");
				//jmolScript('set picking off');
				jmolScript('set atomPicking off');
			}
			else
			{
				jmolScript('set picking assignAtom_'+atom);
				$(this).addClass('active');
			}
			
			
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
