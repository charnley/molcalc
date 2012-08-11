/**********************************************************************
calculation.js

Copyright (C) 2012 Jimmy Charnley Kromann, DGU

This file is part of the FragIt project.

FragIt is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

FragIt is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
02110-1301, USA.
***********************************************************************/
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

  // Vertical Tabs / Calculation Types
  $('.category .calculationtype').each(function() 
  {
    var caltype = $(this).attr('rel');
    var output =  $(this).find('.output');
    var thistab = $(this);
    var tabbtn = $(this).find('.cat.headlin');    

    output.hide();
    
    tabbtn.click(function() {
      
      if(thistab.hasClass('active'))
      {
        thistab.removeClass('active');
        output.fadeOut('fast');
      }
      else
      {
      
        $('.calculationtype.active').removeClass('active');
        thistab.addClass('active');

        $('.calculationtype .output').hide();
        thistab.find('.output').fadeIn('fast');
      }

      return false;
    });
    
    // Calculate Input
    thistab.find('.button.calculateInput').click(function() 
    {
      calculate(caltype);
      return false;
    });


  });
	
	
	
	/**
	 *  Buttons
	 */
  
  /*
   * Calculation AJAX Function
   */
	function calculate(caltype) 
	{
	  var message = $("<div><p>Starting a GAMESS calculation</p></div>");

		message.append($('<ul></ul>'));

    
		var respond = $('<a class="button cancel">Cancel</a>');
		
		respond.click(function() 
    {
      // TODO Kill Process 
      // TODO Cleanup Script

			$.promptCancel();
		});
		
    function check()
    {
      // TODO AJAX Create Check (check if ongoing .dat file)
      usrCheck = $('<li class="check">Checking data&hellip;</li>');
      message.find('ul').append(usrCheck);

      $.post('gamess/check', 
      {
        c:caltype, 
        m:molid, 
        ajax:true
      },function(data) 
      {
          usrCheck.removeClass('loading');
          
          if(data != 1)
          {
            usrCheck.addClass('fail');
            message.append('<p class="fail message">'+data+'</p>');
          }
          else
          {
            usrCheck.addClass('success');
            
            // Go the next part
            setup();
          }
      });

    }

    function setup()
    {
    
      usrSetup = $('<li class="setup loading">Generating input files&hellip;</li>');
      message.find('ul').append(usrSetup);
      
      $.post('gamess/setup', 
      {
        c:caltype, 
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
        c:caltype, 
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
        c:caltype, 
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
          }

          // Process Done See Results
          respond.find('.cancel').hide();
          var newrespond = $('<a href="#" class="button">See Results</a>');
          newrespond.click(function() 
          {
            // Get the new treatment section
            var outputSelect = '.calculationtype[rel='+caltype+'] .output';
            /*
            $(outputSelect).html('');
            $(outputSelect).load('gamess/treatment',function() {
              $(document).ready();
              $.promptCancel();
            });
            */
            
            
            $.post('gamess/treatment', 
            {
              c:caltype, 
              m:molid, 
              show:true
             },function(data) 
             {
              $(outputSelect).html(data);
              $.promptCancel();
             });
            
            return false;
          });

          respond.append($('<li></li>').append(newrespond));
      });
    
    }

		respond = $('<li></li>').append(respond);
		respond = $('<ul></ul>').append(respond);
	  	
		$.prompt(message,respond,'GAMESS Calculation','calculate');
		
    check();

	}
	
  $('.button.loadInpMol').click(function() {
			jmolScript("load data/"+molid+"/coordinates.xyz");
      return false;
  });

  $('a.loadResult').bind("click",
  function() {
    $('.button.loadResult.active').removeClass('active');
    $(this).addClass('active');
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

isosurface [atomic orbitals]
isosurface [ellipsoids]
isosurface [lcaoCartoon hybrid orbitals]
isosurface [molecular orbitals]
isosurface [spheres]
isosurface [user-defined functions]
isosurface JVXL file creation/reading

*/
	
	
});
