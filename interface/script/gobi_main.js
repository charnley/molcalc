/**
 * 
 * GOBI
 * GAMESS and ObenBAbel Interface
 * 
 */
$(function() {

	$('.periodictable .symbol').each(function() 
	{
		var atom = 
		{
			'sym': $(this).html(),
			'num': $(this).parent().find('.number').html(),
			'wei': $(this).parent().find('.weight').html()
		}
		
		$(this).click(function() 
		{
			
			jmolScript('set picking assignAtom_'+atom['sym']);
			$('.periodictable .symbol.active').removeClass('active');
			$(this).addClass('active');
			
		});
	});


})();



