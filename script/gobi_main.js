
// Note
// http://chemapps.stolaf.edu/jmol/docs/examples-11/new0.txt
// http://jmol.sourceforge.net/jslibrary/


// EXAMPLES
//jmolEvaluate("{*}.xyz");  Coordinates for the center of the molecule


	// TODO
	// TODO Save State before each action.
	// TOOO Undo last action 

		
$(function()
{
	
	var ajaxarea = $('.ajaxarea');
	var hideElements = $('.canvas');
	
	/**
	 * Prompt gives the user a prompt message to respond too.
	 * 
	 * @param message	The Message to prompt the user.
	 * @param responds	The actions the user can take.
	 */
	function xprompt(message,responds,title,classes)
	{
		
		// Define body
		var background 	= $('<div class="prompt-container"></div>');
		var box 	    		= $('<div class="prompt-box '+classes+'"></div>');
		var boxHeader  	= $('<div class="prompt-header"><strong>'+title+'</strong></div>');
		var boxMessage 	= $('<div class="prompt-message"></div>');
		var boxFooter 		= $('<div class="prompt-respond"></div>');
		
		// Insert Variable
		boxMessage.append(message);
		boxFooter.append(responds);
		boxFooter.append('<div class="clean"></div>');
		
		// Filling
		var html = box;
		
		html.append(boxHeader);
		html.append(boxMessage);
		html.append(boxFooter);
		
		html = background.append(html);
		
		hideElements.hide();
		
		ajaxarea
			.show()
			.html(html);
			
		

	}
	
	function xpromptCancel(callBack)
	{
		ajaxarea.fadeOut(200, function() {
		
				hideElements.show();
				
				if(typeof callBack == 'function')
				{
					callBack.call(this);
				}
			
		});
		
		
	}
	
	/**
	 * Prompt gives the user a prompt message to respond too.
	 * 
	 * @param message	The Message to prompt the user.
	 */
	function xerrorPrompt(message)
	{
		
		var respond = $('<a class="button okay">Modtaget</a>');
		
		respond.click(function() {
			promptCancel();
		});
		
		respond = $('<li></li>').append(respond);
		respond = $('<ul></ul>').append(respond);
		
		xprompt(message,respond,'Fejl Meddelse','error');
		
	}
	
	/**
	 * Prompt gives the user a prompt message to respond too.
	 * 
	 * @param message	The Message to prompt the user.
	 */
	function xinfoPrompt(message)
	{
		
		var respond = $('<a class="button okay">Ok</a>');
		
		respond.click(function() {
			xpromptCancel();
		});
		
		
		respond = $('<li></li>').append(respond);
		respond = $('<ul></ul>').append(respond);
		
		xprompt(message,respond,'&nbsp;','info');
		
	}
	
	/**
	 * Make it global
	 */
	jQuery.infoPrompt = function infoPrompt(msg)
	{
		xinfoPrompt(msg);
	}
	
	jQuery.prompt = function prompt(message,respond,title,classes)
	{
		xprompt(message,respond,title,classes);
	}
	jQuery.promptCancel = function promptCancel()
	{
		xpromptCancel();
	}
	
	
});

