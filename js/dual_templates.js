// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
// CHANGE THE FILE NAME TO REFLECT THE USE OF THIS FILE
//
// SET THE CAMPAIAGN TO USE THE WATERFALL LAYOUT
// PLACE THIS FILE AND COORESPONDING CSS FILE ON THE CDN
// REFERENCE THIS FILE IN THE JQUERY URL PATH IN YOUR MODULE CONFIG
// MAKE SURE YOU'RE PULLING TWITTER CONTENT
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// PLACE ANY CODE IN HERE THAT NEEDS TO BE TRIGGERED WHEN THE PAGE LOADS
$(document).ready(function() {
	
});

$(function(){
	
	// GRAB PARAMS FROM URL
	function GetURLParameter(sParam) {
		var sPageURL = window.location.search.substring(1);
		var sURLVariables = sPageURL.split('&');
		for (var i = 0; i < sURLVariables.length; i++) {
			var sParameterName = sURLVariables[i].split('=');
			if (sParameterName[0] == sParam) {
				return sParameterName[1];
			}
		}
	}
	
	// SET TO OFF TO TURN PAGINATION OFF
	pagination = 'on';
	
	if (pagination == 'off') {
		$('.pagination').hide();
	}
	
	template = GetURLParameter('template');
	
	// MULTICOLOR ON/OFF (ONLY FOR TWITTER WATERFALL)
	multicolor = 'yes';
	
	// CHANGE URL TO POINT TO THE PROPER LOCATION OF THE CSS FILE
	if (template == 'flex_grid'){
		$('head').append('<link rel="stylesheet" href="https://cdn.vitrue.com/vitrue/oracle/smm/clients/dmexco/cx_flex.css" type="text/css" />');
	} else {
		$('head').append('<link rel="stylesheet" href="https://cdn.vitrue.com/vitrue/oracle/smm/clients/dmexco/cx.css" type="text/css" />');
	}
	
	//Set body background
	$('html').height('100%');
	
	var hashTags = '<span style="display: inline;">#HASHTAG0</span>';
	 		hashTags += '<span>#HASHTAG1</span>';
	 		hashTags += '<span>#HASHTAG2</span>';
	 		hashTags += '<span>#HASHTAG3</span>';
	 		hashTags += '<span>#HASHTAG4</span>';

	var leftColumn = '<div id="leftColumn"></div>'
	
	var backgroundContent = '<div id="contentAndTags">';
			backgroundContent += '<div class="title pull-left"><img src="https://cdn.vitrue.com/vitrue/oracle/smm/clients/dmexco/dmexcologo.png"></div>';
			backgroundContent += '<div class="hashtags pull-right">'+hashTags+'</div>';
			backgroundContent += '</div>';

	var poweredBy = '<div id="poweredBy"><img src="https://cdn.vitrue.com/vitrue/oracle/mme/powered_by.png" class="pull-right"></div>';

	if (template == 'flex_grid'){
		$('.social-wall').prepend('<div id="background">'+backgroundContent+poweredBy+'</div>');
	} else {
		$('.social-wall').before('<div id="background">'+leftColumn+backgroundContent+poweredBy+'</div>');
	}
		
	//Update layout for facebook tab display
	if($(window).width() <= 810){
		$('.social-wall').css({
			'padding': '0 0 140px'
		});
		$('#contentAndTags').addClass('narrow');
		$('#post-container').css({
			'float': 'none',
			'width': '80%',
			'margin': '0 auto',
			'padding' : '240px 0 0'
		});
	}
	
	if($(window).height() <= 720){
		$('.social-wall').css('height','620px');
	}
	
	if (multicolor == 'yes'){
		$('.post:nth-child(1)').addClass('first-post');
		$('.post:nth-child(2)').addClass('second-post');
		$('.post:nth-child(3)').addClass('third-post');
		$('.post:nth-child(4)').addClass('fourth-post');
		$('.post:nth-child(5)').addClass('fifth-post');
		$('.post:nth-child(6)').addClass('sixth-post');
		$('.post:nth-child(7)').addClass('seventh-post');
	} else {
		// DO NOTHING
	}
	
	//Wrap hashtags
	$('.thumbnail .post-message').each(function(){
		$(this).html(
			$(this).html().replace(/(\#[-\w]+)/g,'<span class="hashtag">$1</span>')
		);
	});
	
	// Add @ symbol for usernames
	$('.thumbnail .post-username').each(function(){
		$(this).html(
			'@'+$(this).html()
		);
	});
	
	//Listen for creation of new posts
	$('#post-container').arrive('.post', function(){
	  var $newElem = $(this);
		//Add proper styling class to new post
		if (multicolor == 'yes'){		
			if($('.post:eq(1)').hasClass('first-post')) $newElem.addClass('second-post');
			if($('.post:eq(2)').hasClass('second-post')) $newElem.addClass('third-post');
			if($('.post:eq(3)').hasClass('third-post')) $newElem.addClass('fourth-post');
			if($('.post:eq(4)').hasClass('fourth-post')) $newElem.addClass('fifth-post');
			if($('.post:eq(5)').hasClass('fifth-post')) $newElem.addClass('sixth-post');
			if($('.post:eq(6)').hasClass('sixth-post')) $newElem.addClass('seventh-post');
			if($('.post:eq(7)').hasClass('seventh-post')) $newElem.addClass('first-post');
		} else {
			// DO NOTHING
		}
		
		//Wrap hashtags within post text
		$newElem.html($newElem.html().replace(/(\#[-\w]+)/g,'<span class="hashtag">$1</span>'));
		// Add @ symbol for usernames
		$newElem.find('.post-username').html('@'+$newElem.find('.post-username').html());
		$('.media-body').textTailor();		
	});
	
  var allBoxes = $("div.hashtags").children("span");

	// THIS WILL FADE BETWEEN MULTIPLE HASHTAGS
  transitionBox(null, allBoxes.first());

	function transitionBox(from, to) {
	  function next() {
	    var nextTo;
	    if (to.is(":last-child")) {
	      nextTo = to.closest(".hashtags").children("span").first();
	    } else {
	      nextTo = to.next();
	    }
	    to.fadeIn(500, function () {
	      setTimeout(function () {
	        transitionBox(to, nextTo);
        }, 10000);
	    });
	  }

	  if (from) {
	    from.fadeOut(500, next);
	  } else {
	    next();
	  }
	}
	
});

/*
 * arrive.js
 * v2.0.0
 * https://github.com/uzairfarooq/arrive
 * MIT licensed
 *
 * Copyright (c) 2014 Uzair Farooq
 */

(function(q,r,m){function n(a,b,e){for(var d=0,c;c=a[d];d++)f.matchesSelector(c,b.selector)&&-1==b.firedElems.indexOf(c)&&(b.firedElems.push(c),e.push({callback:b.callback,elem:c})),0<c.childNodes.length&&n(c.childNodes,b,e)}function s(a){for(var b=0,e;e=a[b];b++)e.callback.call(e.elem)}function g(a){a.arrive=h.bindEvent;f.addMethod(a,"unbindArrive",h.unbindEvent);f.addMethod(a,"unbindArrive",h.unbindEventWithSelectorOrCallback);f.addMethod(a,"unbindArrive",h.unbindEventWithSelectorAndCallback);a.leave=
k.bindEvent;f.addMethod(a,"unbindLeave",k.unbindEvent);f.addMethod(a,"unbindLeave",k.unbindEventWithSelectorOrCallback);f.addMethod(a,"unbindLeave",k.unbindEventWithSelectorAndCallback)}var f=function(){var a=HTMLElement.prototype.matches||HTMLElement.prototype.webkitMatchesSelector||HTMLElement.prototype.mozMatchesSelector||HTMLElement.prototype.msMatchesSelector;return{matchesSelector:function(b,e){return b instanceof HTMLElement&&a.call(b,e)},addMethod:function(b,a,d){var c=b[a];b[a]=function(){if(d.length==
arguments.length)return d.apply(this,arguments);if("function"==typeof c)return c.apply(this,arguments)}}}}(),t=function(){var a=function(){this._eventsBucket=[];this._beforeRemoving=this._beforeAdding=null};a.prototype.addEvent=function(b,a,d,c){b={target:b,selector:a,options:d,callback:c,firedElems:[]};this._beforeAdding&&this._beforeAdding(b);this._eventsBucket.push(b);return b};a.prototype.removeEvent=function(b){for(var a=this._eventsBucket.length-1,d;d=this._eventsBucket[a];a--)b(d)&&(this._beforeRemoving&&
this._beforeRemoving(d),this._eventsBucket.splice(a,1))};a.prototype.beforeAdding=function(b){this._beforeAdding=b};a.prototype.beforeRemoving=function(b){this._beforeRemoving=b};return a}();m=function(a,b,e){function d(b){"number"!==typeof b.length&&(b=[b]);return b}var c=new t;c.beforeAdding(function(b){var c=b.target,d;if(c===q.document||c===q)c=document.getElementsByTagName("html")[0];d=new MutationObserver(function(a){e.call(this,a,b)});var l=a(b.options);d.observe(c,l);b.observer=d});c.beforeRemoving(function(b){b.observer.disconnect()});
this.bindEvent=function(a,e,p){"undefined"===typeof p&&(p=e,e=b);for(var l=d(this),f=0;f<l.length;f++)c.addEvent(l[f],a,e,p)};this.unbindEvent=function(){var b=d(this);c.removeEvent(function(a){for(var c=0;c<b.length;c++)if(a.target===b[c])return!0;return!1})};this.unbindEventWithSelectorOrCallback=function(b){var a=d(this);c.removeEvent("function"===typeof b?function(c){for(var d=0;d<a.length;d++)if(c.target===a[d]&&c.callback===b)return!0;return!1}:function(c){for(var d=0;d<a.length;d++)if(c.target===
a[d]&&c.selector===b)return!0;return!1})};this.unbindEventWithSelectorAndCallback=function(b,a){var e=d(this);c.removeEvent(function(c){for(var d=0;d<e.length;d++)if(c.target===e[d]&&c.selector===b&&c.callback===a)return!0;return!1})};return this};var h=new m(function(a){var b={attributes:!1,childList:!0,subtree:!0};a.fireOnAttributesModification&&(b.attributes=!0);return b},{fireOnAttributesModification:!1},function(a,b){a.forEach(function(a){var d=a.addedNodes,c=a.target,g=[];null!==d&&0<d.length?
n(d,b,g):"attributes"===a.type&&f.matchesSelector(c,b.selector)&&-1==b.firedElems.indexOf(c)&&(b.firedElems.push(c),g.push({callback:b.callback,elem:c}));s(g)})}),k=new m(function(a){return{childList:!0,subtree:!0}},{},function(a,b){a.forEach(function(a){a=a.removedNodes;var d=[];null!==a&&0<a.length&&n(a,b,d);s(d)})});r&&g(r.fn);g(HTMLElement.prototype);g(NodeList.prototype);g(HTMLCollection.prototype);g(HTMLDocument.prototype);g(Window.prototype)})(this,"undefined"===typeof jQuery?null:jQuery);

/*! TextTailor.js - 0.1.0 - 2014-09-17 | https://github.com/jpntex/TextTailor.js | Copyright (c) 2014 João Teixeira (@jpntex) | MIT License */
!function(a,b){"use strict";function c(b,c){this.el=b,this.options=a.extend({},d,c),this.init()}var d={minFont:1,maxFont:9999,preWrapText:!1,lineHeight:1.45,resizable:!0,debounce:!1,fit:!0,ellipsis:!0,center:!1,justify:!1};c.prototype={init:function(){{var c=this.options.minFont>this.options.maxFont;a(this.el)}if(c&&b.console&&console.log("TextTailor error: minFont needs to be smaller than maxFont!"),this.HTML=this.el.innerHTML,!c){var d,e=this;this.options.resizable&&a(b).on("resize",function(){e.options.debounce?(clearTimeout(d),d=setTimeout(function(){e.start()},200)):e.start()}),this.start()}},start:function(){var b=a(this.el);this.el.innerHTML=this.HTML,b.wrapInner("<div/>"),this.wraped=a(this.el.firstChild),this.wraped.css({"line-height":this.options.lineHeight,tranform:"translateZ(0)",height:"auto"}),this.options.preWrapText&&this.wraped.css("white-space","pre-line"),this.maxHeight=b.height(),this.maxWidth=b.width(),this.fit().ellipsis().center().justify()},fit:function(){if(this.options.fit){var a=this,b=this.wraped,c=30,d=0,e=function h(e,f,g){return++d===c?e:e<=a.options.minFont?a.options.minFont:e>=a.options.maxFont?a.options.maxFont:f===g?f:(b.css("fontSize",e),b[0].scrollHeight<a.maxHeight?(b.css("fontSize",e+1),b[0].scrollHeight>=a.maxHeight?e:h(Math.round((g+e)/2),e,g)):(b.css("fontSize",e-1),h(Math.round((f+e)/2),f,e)))},f=Math.round((this.options.maxFont+this.options.minFont)/2);b.css("fontSize",f);var g=e(f,this.options.minFont,this.options.maxFont);b.css("fontSize",g)}return this},ellipsis:function(){if(this.options.ellipsis){var a=this.wraped;if(a.css({overflow:"hidden","text-overflow":"ellipsis"}),a.height()>this.maxHeight){var b=a.html();a.html("O");for(var c=(a.height(),1),d=b.length;d>c;){var e=Math.ceil((c+d)/2);a.html(b.slice(0,e)+"..."),a.height()<=this.maxHeight?c=e:d=e-1}a.html(b.slice(0,c)+"...")}}return this},center:function(){if(this.options.center){var b=a(this.el).css("position");"relative"!==b&&"absolute"!==b&&a(this.el).css("position","relative"),this.wraped.css({position:"absolute",width:this.wraped.width()+"px",left:"0",right:"0",top:"0",bottom:"0",height:this.wraped.height()+"px",margin:"auto"})}return this},justify:function(){return this.options.justify&&this.wraped.css({"text-align":"justify"}),this}},a.fn.textTailor=function(b){return this.each(function(){a.data(this,"TextTailor")||a.data(this,"TextTailor",new c(this,b))})}}(jQuery,window);