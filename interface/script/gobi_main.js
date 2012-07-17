/**
 * 
 * GOBI
 * GAMESS and ObenBAbel Interface
 * 
 */
$(function(){

	/**
    * Jmol Script Handler
    * 
    * @param cmd The Jmol valid command to run 
    * @return void
    */
	function runJmolCommand(cmd) 
	{
		// TODO Save State before each action.
		// TODO Does not really need to be in jquery
		
		// TODO Add element (up to Ar)
		// TODO Add bond (up to triple bond)
		// TOOO Undo last action 
		// TODO Remove Atom
		// TODO Remove Bond
	
	}

	// TODO Jquery notification system
	// - Prompt (questions)
	// - Small Notification (gnome like)
	// - 


	$('.periodictable .symbol').each(function() 
	{
		var atom = 
		{
			'sym': $(this).html(),
			'num': parseInt($(this).parent().find('.number').html()),
			'wei': parseFloat($(this).parent().find('.weight').html())
		}
		
		$(this).click(function() 
		{
			
			if(atom['num'] > 16 )
			{
					alert('too high');
					return false;
			}
			
			
			jmolScript('set picking assignAtom_'+atom['sym']);


			$('.periodictable .symbol.active').removeClass('active');
			$(this).addClass('active');
			
		});
	});
	
	$('a.undo').click(function() {
		
		alert('undo');

		jmolScript('undo');

		// save state
		// restore state

		return false;
	});

	$('a.undoMove').click(function() {
		
		alert('undoMove');

		jmolScript('undoMove');

		return false;
	});

	
	$('.minimize a').click(function() {


		jmolScript('minimize');

		return false;
	});
	
	$('.add a').click(function() {

		jmolScript('set picking assignAtom_C');

		return false;
	});
	





});



