$(function(){
	

if($.browser.webkit)
{
  alert('The molecule editor is completely buggy in Chrome and Safari. Please use firefox! If you use Chrome, the molecule wont save.');  
}


	/**
	 *  BUTTON LIST
	 */
		
		function runJmolCommand(cmd) 
		{
			// Save State
			
			jmolScript(cmd);
		}
    
    /**
     * Auto Miminimze
     */
		jmolScript('set useMinimizationThread on'); // FALSE or ON
    $('.canvas').mouseout(function() {
      jmolScript('minimize');
    });
	  
    /*
     * Reset Molcule
     */
    $('.action.reset .button').click(function () {
      jmolScript('reset ALL');  
      return false;
    });

		/*
		 * Load Molecule
		 */
		$('.action.restore .button').click(function() 
		{	
      jmolScript('restore STATE temp');
			return false;	
		});
		
		/*
		 * Save Molecule
		 */
		$('.action.save .button').click(function() 
		{	
      jmolScript('save STATE temp');
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
			jmolScript('set useMinimizationThread on'); // FALSE or ON

			var atom = $(this).attr('rel');
			$('.action.atom .button.active').removeClass('active');
			
			switch(atom)
			{
				case 'off':
					jmolScript('set atomPicking off');
					break;
				case 'dra':
					// TODO 
          /*
          set allowMoveAtoms FALSE
          Set this parameter TRUE to allow the moving of selected atoms (not just whole molecules) using ALT-LEFT drag and ALT-SHIFT-LEFT drag.
          */
					jmolScript('set atomPicking on');
          jmolScript('set picking dragMinimize'); // on off
          //jmolScript('set picking dragAtom'); // on off
					$(this).addClass('active');
					break;
				default:
					jmolScript('set atomPicking on');
          jmolScript('set picking dragMinimize');
					jmolScript('set picking assignAtom_'+atom);
					$(this).addClass('active');
			}
			
			//notes:
			//jmolScript('set atompicking false;');
			//jmolScript("set minimizationRefresh false;set useMinimizationThread false");
			//jmolScript("set picking dragmolecule;");
			//jmolScript('set picking off');
/*
 set picking MEASURE
 Same as set picking MEASURE DISTANCE but also displays a distance measurement on the molecule.
  set picking MEASURE DISTANCE
  Turns picking on and returns atom identities and distance between two atoms. Three messages are sent to the MessageCallback function, if defined: Atom #1 (after the first click) and then Atom #2 and Distance (after the second click).
*/
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
			var coordinates = jmolEvaluate('write("coords")');
			
			//jmolGetPropertyAsJSON("atomList","all"); ARRAY OF ALL ATOMS

			no.click(function() 
			{
				$.promptCancel();
			});
			
			yes.click(function() 
			{ 
      
        var mess = '<ul><li class="loading">Preparing Calculation&hellip;</li></ul>';        
        $.prompt(mess,'','Preparing Calculation','calculate');
        
				$.post("calculation", 
					{ atoms: coordinates, ajax: true},
					function(data) {
            $.infoPrompt(data);
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
			
      // ERROR (In Chrome)
      if(coordinates.indexOf("ERROR") != -1 )
      {
        $.infoPrompt("I told you. Chrome won't play nice with Jmol. You wont be able to save a molecule with this browser. Please try Firefox.");
        return false;
      }

      // Check Molecule size. Maybe find \n in file?
      if(coordinates.match(/\n/g).length > (2+100))
      {
        // TODO Check kun for non Hydrogen atoms.
        $.infoPrompt("You have too many atoms in your molecule. Restrict yourself to 10 atoms.");
      }

      

			return false;
		});
});
