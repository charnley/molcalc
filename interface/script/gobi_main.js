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
			'num': parseInt($(this).parent().find('.number').html()),
			'wei': parseFloat($(this).parent().find('.weight').html())
		}
		
		$(this).click(function() 
		{
			
			if(atom['num'] > 16 ){
					alert('too high');
					return false;
			}
			
			
			jmolScript('set picking assignAtom_'+atom['sym']);
			$('.periodictable .symbol.active').removeClass('active');
			$(this).addClass('active');
			
		});
	});


})();



