/**********************************************************************
calculation.js

Copyright (C) 2012 Jimmy Charnley Kromann, DGU

This file is part of the MolCalc project.

MolCalc is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

MolCalc is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
02110-1301, USA.
***********************************************************************/
$(function(){
	
  // VARIABLES
  // molid - Molecule System ID (hash)

  // For the direct urls etc
  function setHash(loc)
  {
    window.location.hash = "#/"+loc;
  }
  function getHash()
  {
    return window.location.hash.replace("#/", "");
  }

  // View the current 'tab'
  if(getHash() != "")
  {
    var hash = getHash();
    $('.calculation_page .view_navigation li a').removeClass('active');
    $('.calculation_page .view_navigation li.'+hash+' a').addClass('active');
  }
	
	// Tabs
  $('.calculation_page .view_navigation a').each(function ()
  {
    var active = "active";
    var that = $(this);
    var type = that.parent().attr('class');
    var content = $('div.'+type);

    // Hide contents
    if(!that.hasClass(active)) content.hide();

    that.click(function()
    {
      if(that.hasClass(active)) return false;
      $('.view_navigation a.active').removeClass(active);
      $('.calculationtype').hide();
      that.addClass(active);
      content.show();

      // JHJ, Calculate the input right away
      content.find('.button.calculateInput').click();

      // Set URL
      setHash(type);
      return false;
    });

  });

  // Calculation Types
  $('.calculationtype').each(function() 
  {
    var thistype = $(this);
    var caltype = thistype.attr('class').replace('calculationtype ','');
    var caltitle = $('.calculation_page .view_navigation li.'+caltype+' a').html();

    var button = thistype.find('.button.calculateInput');

    // Run a calculation
    button.click(function() {

      var calPrompt = new $.Prompt();
      calPrompt.setTitle('Calculating '+caltitle);

      /*
      <div class="loading_bar">
        <div class="high">
          <span class="highHlp">
            <span class="nom">0%</span>
          </span>
        </div>
        <div class="bar"></div>
      </div>
      */

      var loading_bar = $('<div class="bar"></div>');
      var loading_nom = $('<div class="nom">0%</div>');
      var loading_message = $('<div class="msg">Starting Calculation</div>');
      var loading = $('<div class="loading_bar"></div>');
      var tmp = $('<div class="highHlp"></div>').append(loading_nom);
      var loading_nomp = $('<div class="high"></div>').append(tmp)
      loading.append(loading_nomp);
      loading.append(loading_bar);

      var message = $('<div></div>').append(loading);
      message.append(loading_message);

      calPrompt.setMessage(message);

      function setPct(pct)
      {
        // TODO Make the pct go more smooth with the steps
        loading_nom.html(pct+"%");
        loading_bar.css('width', pct+'%');
        loading_nomp.css('left', pct+'%');
      }

      calPrompt.show();

      // And now to do a GAMESS Calculation.
      function step1()
      {
        // Checking system status
        var stepMessage = "Checking system status&hellip;";
        loading_message.html(stepMessage);
        setPct(10);

        $.post('../application/gamess/step1',
        {
          c:caltype,
          m:molid,
          ajax:true
        },function(data)
        {
          if(data != 1)
          {
            calPrompt.cancel();
            var failPrompt = new $.Prompt();
            failPrompt.setTitle('Calculating '+caltitle);
            failPrompt.setMessage('<div class="fail message">'+data+'</div>');
            failPrompt.addCancelBtn('Okay');
            failPrompt.show();
            return false;
          }
          else
          {
            setPct(25);
            step2();
          }
        });
      }

      function step2()
      {
        // Setup GAMESS Input file
        var stepMessage = "Setup of calculation&hellip;";
        loading_message.html(stepMessage);
        setPct(30);

        $.post('../application/gamess/step2',
        {
          c:caltype,
          m:molid,
          ajax:true
        },function(data)
        {
          if(data != 1)
          {
            calPrompt.cancel();
            var failPrompt = new $.Prompt();
            failPrompt.setTitle('Calculating '+caltitle);
            failPrompt.setMessage('<div class="fail message">'+data+'</div>');
            failPrompt.addCancelBtn('Okay');
            failPrompt.show();
          }
          else
          {
            setPct(50);
            step3();
          }
        });
      }

      function step3()
      {
        // Submit calculation too gamess
        var stepMessage = "GAMESS calculating&hellip;";
        loading_message.html(stepMessage);
        setPct(60);

        $.post('../application/gamess/step3',
        {
          c:caltype,
          m:molid,
          ajax:true
        },function(data)
        {
          if(data != 1)
          {
            calPrompt.cancel();
            var failPrompt = new $.Prompt();
            failPrompt.setTitle('Calculating '+caltitle);
            failPrompt.setMessage('<div class="fail message">'+data+'</div>');
            failPrompt.addCancelBtn('Okay');
            failPrompt.show();
          }
          else
          {
            setPct(100);
            calPrompt.setMessage('Loading results&hellip;');
            document.location.reload(true);
            // jquery.load does not execute javascript
            //$('.calculationtype.'+caltype).load(document.URL+' .calculationtype.'+caltype+' .acontainer', function() {
            //  calPrompt.cancel();
            //});
          }
        });

      }


      // Aaaaand begin:
      step1();

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
