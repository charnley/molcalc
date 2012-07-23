$(function(){
	
	
	// Tabs
	$tabCnt = $('.column.tab');
	$categories = $('.column.tab .category');
	$tabs = $('.tabs ul');
	
	$categories.each(function(index) 
	{
		var category = $(this);
		var headline = $(this).find('label').html();
		
		category.hide();
		
		$button = $('<a href="#">'+headline+'</a>');
		
		$button.click(function() {
			 
			 $categories.hide();
			 category.fadeIn();
			 
			 $('.tabs ul a.active').removeClass('active');
			 $(this).addClass('active');
			 
			 
			 return false;
			 
		 });
		 
		$button = $('<li></li>').append($button);
		$tabs.append($button);
	});
	
	$('.tabs a').eq(0).click();
	
	
	
	/**
	 *  Buttons
	 */
	$('.action.electric.calculate .button').click(function() 
	{
		
		message = '<ul><li>Creating input file ...</li><li>Running GAMESS ...</li><li>Manipulating Results ...</li></ul>';
		
		var respond = $('<a class="button okay">See Results</a>');
		
		respond.click(function() {
			$.promptCancel();
		});
		
		respond = $('<li></li>').append(respond);
		respond = $('<ul></ul>').append(respond);
		
		$.prompt(message,respond,'Running GAMESS Calculation','calculate');
		
	});
	
	
	
/*

isosurface [atomic orbitals]
isosurface [ellipsoids]
isosurface [lcaoCartoon hybrid orbitals]
isosurface [molecular orbitals]
isosurface [spheres]
isosurface [user-defined functions]
isosurface JVXL file creation/reading

*/
	
	
});
