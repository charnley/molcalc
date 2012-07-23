$(function(){
	
  /**
   *
   * Page Enviromental Variables
   */
  // molid - Molecule System ID 
	
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

  /*
   * Orbital Calculation
   */
	$('.action.electric.calculate .button').click(function() 
	{
	  var message = $("<div><p>Starting a GAMESS calculation</p></div>");

		message.append($('<ul></ul>'));

    
		var respond = $('<a class="button okay">Cancel Calculation</a>');
		
		respond.click(function() 
    {
      // TODO Kill Process 
      // TODO Cleanup Script

			$.promptCancel();
		});
		
    function check()
    {
      usrCheck = $('<li class="check">Checking data&hellip;</li>');
      message.find('ul').append(usrCheck);
      
      setup();

      usrCheck
        .removeClass('loading')
        .addClass('success');
    }

    function setup()
    {
    
      usrSetup = $('<li class="setup loading">Generating input files&hellip;</li>');
      message.find('ul').append(usrSetup);
      
      $.post('gamess/setup', 
      {
        c:'motype', 
        m:molid, 
        ajax:true
      },function(data) 
      {
          usrSetup.removeClass('loading');
          
          if(data != 1)
          {
            usrSetup.addClass('fail');
          }
          else
          {
            usrSetup.addClass('success');
            
            // Go the next part
            handle();
          }
      });
    }

    function handle()
    {
      usrHandle = $('<li class="handle loading">Calculating request&hellip;</li>');
      message.find('ul').append(usrHandle);
      $.post('gamess/handle', 
      {
        c:'motype', 
        m:molid, 
        ajax:true
      },function(data) 
      {
          usrHandle.removeClass('loading')
          
          if(data != 1)
          {
            usrHandle.addClass('fail');
          }
          else
          {
            usrHandle.addClass('success');
            process();
          }
       });
    }

    
    function process()
    {
    
      var usrProces = $('<li class="proces loading">Processing data&hellip;</li>');
      message.find('ul').append(usrProces);
      
      $.post('gamess/treatment', 
      {
        c:'motype', 
        m:molid, 
        ajax:true
      },function(data) 
      {
          usrProces.removeClass('loading');
          
          if(data != 1)
          {
            usrProces.addClass('fail');
          }
          else
          {
            
            usrProces.addClass('success');
            
            // Process Done See Results
            respond.find('.cancel').hide();
            var newrespond = $('<a href="#" class="button">See Results</a>');
            newrespond.click(function() 
            {
              
              // TODO Remove current calculation button
              // TODO Get data
              
              $.promptCancel();
              return false;
            });

            respond.append($('<li></li>').append(newrespond));
            
          }
      });
    
    }

		respond = $('<li></li>').append(respond);
		respond = $('<ul></ul>').append(respond);
	  	
		$.prompt(message,respond,'GAMESS Calculation','calculate');
		
    check();

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

isosurface [atomic orbitals]
isosurface [ellipsoids]
isosurface [lcaoCartoon hybrid orbitals]
isosurface [molecular orbitals]
isosurface [spheres]
isosurface [user-defined functions]
isosurface JVXL file creation/reading

*/
	
	
});
