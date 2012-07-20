

		
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
	
		// Common Block
		
$(function()
{
	
	var ajaxarea = $('.ajaxarea');
	
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

		ajaxarea
			.show()
			.html(html);

	}
	
	function xpromptCancel()
	{
		ajaxarea.fadeOut(200);
		
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
		
		var respond = $('<a class="button okay">Modtaget</a>');
		
		respond.click(function() {
			promptCancel();
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

