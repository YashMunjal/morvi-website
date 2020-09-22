$( document ).ready(function() {
	
	if(document.location.hash.indexOf('#page=') == 0) {
		var pageNo = document.location.hash.split('=')[1];
		$('[data-anc-page="root"]').data('anc-page-no', pageNo);
		$('[data-anc-page="root-ajax"]').data('anc-page-no', pageNo);
	}

	if(document.location.href.indexOf('/editor.html/') < 0 || !kmi.editMode)$('[data-anc-page="root"]').each(function() {anchorsPagination.init('[data-anc-page="root"]');}) ;
	
	$( "body" ).on( "click", "a[href^='http']:not([href*='" + window.location.hostname + "']):not([data-call-youtube])", function( event ) {
	    $( this ).attr( "target", "_blank" );
	});

	//if(kmi.runMode.indexOf('author') > -1) {
	
		/*
		$( "body" ).on( "click", "a[href^='/']:not([download]), a[href*='" + window.location.hostname + "']:not([download])", function( event ) {
			if(! endWithHtml($(this).attr('href')) )
				$( this ).attr( 'href', addWithHtml($(this).attr('href')) );
		});
		
		$( "body" ).on( "click", "button[data-href^='/'], button[data-href*='" + window.location.hostname + "']", function( event ) {
			if(! endWithHtml($(this).attr('href')) )
				$( this ).attr( 'href', addWithHtml($(this).attr('href')) );
		});
		
		$( "body" ).on( "submit", "form[action^='/'], form[action*='" + window.location.hostname + "']", function( event ) {
			if(! endWithHtml($(this).attr('action')) )
				$( this ).attr( 'action', addWithHtml($(this).attr('action')) );
		});
		*/
		
		
		/* GNB Tagging */
		$( "#gnb" ).on( "click", "a.gnb-a", function( event ) {
			gtagEvent({category:'GNB', action:$(this).find('span.text').text(), label:$(this).find('span.text').text()});
		});
		
		$( "#gnb" ).on( "click", "a.d2-a", function( event ) {
			gtagEvent({category:'GNB', action:$(this).closest('.gnb-item').find('a.gnb-a span.text').text(), label:$(this).find('span.text').text()});
		});
		
		$( "#footer" ).on( "click", "a.d1-a", function( event ) {
			gtagEvent({category:'Footer', action:$(this).text(), label:$(this).text()});
		});

		$( "#footer" ).on( "click", "a.d2-a", function( event ) {
			gtagEvent({category:'Footer', action:$(this).closest('.d1-div').find('a.d1-a').text(), label:$(this).find('span.text').text()});
		});
		
		$( "#footer" ).on( "click", "a.main-link", function( event ) {
			gtagEvent({category:'GNB-Footer', action:'Button_Click', label:$(this).text()});
		});
		
		$( "#footer" ).on( "click", "a.social-link", function( event ) {
			gtagEvent({category:'Click', action:'SNS share', label:$(this).find('span').text()});
		});
		
		$( ".nav-list" ).on( "click", "a.nav-link", function( event ) {
			if($(this).attr('href').split('#').length > 1)
				gtagEvent({category:'Product-Detail_' + vehicleName, action:'reach_area', label:$(this).attr('href').split('#')[1]});
		});
		
		$('.enquiries-call').on('click', 'a', function( event ) {
			gtagEvent({category:'Click', action:'Enquiries Call', label:$(this).text()});
		});
		
		$('.gnb-item--location a, .header-pad .search-location').on( "click", function(event) {
			gtagEvent({category:'Click', action:'Button_Click', label:'Find A Dealer'});
		});
		
	//}
	
		
		window.onpopstate = function(event) {
		  var state = event.state;
		  if(state && state.pushType == 'asyncPagination') {
			  anchorsAsyncPagination.init( state.rootSelector, state.pageNo, state.callback );
		  }
		  
		};
		
		
		if(document.location.href.indexOf('/editor.html/') < 0 || !kmi.editMode)$('[data-anc-page="root-ajax"]').each(function() {
			$('[data-anc-page="root-ajax"]').trigger('load');
		}) ;

	function endWithHtml(url) {
		try{
			return !!url.split('#')[0].split('?')[0].match(/\.html$/);
		}catch(e) {
			return false;
		}
	}
	
	function addWithHtml(url) {
		var result = '';
		try{
			result = url.split('#')[0].split('?')[0] + '.html' ;
			if(url.split('#')[0].split('?').length > 1) result += '?' + url.split('#')[0].split('?')[1];
			if(url.split('#').length > 1) result += '#' + url.split('#')[1];
		}catch(e) {}
		return result;
	}
	
	
	
	
	var lastScrollTop = 0;
	$(window).scroll(function(event){
	   var st = $(this).scrollTop();
	   $('[data-ga-section]').each(function (idx) {
			if(st > $(this).offset().top && $(this).offset().top > lastScrollTop) {
				//gtagEvent({category:$(this).data('ga-category'), action:'reach_area', label:$(this).data('ga-area')});
				gtagEvent({category:kmi.gaEventCategory + '_Impression', action:'reach_area', label:$(this).data('ga-area')});
			}else if (st < $(this).offset().top && $(this).offset().top < lastScrollTop) {
				//gtagEvent({category:$(this).data('ga-category'), action:'reach_area', label:$(this).data('ga-area')});   
				gtagEvent({category:kmi.gaEventCategory + '_Impression', action:'reach_area', label:$(this).data('ga-area')});
			}	
		});
	   
	   
	   $('[data-nav-target]').each(function (idx) {
			if(st > $(this).offset().top && $(this).offset().top > lastScrollTop) {
				//document.location.href='#' + $(this).parent().attr('id');
				if(window.vehicleName)
					gtagEvent({category:'Product-Detail_' + vehicleName, action:'reach_area', label:$(this).parent().attr('id')});
			}else if (st < $(this).offset().top && $(this).offset().top < lastScrollTop) {
				
				if(window.vehicleName)//document.location.href='#' + $(this).parent().attr('id');
					gtagEvent({category:'Product-Detail_' + vehicleName, action:'reach_area', label:$(this).parent().attr('id')});   
			}	
		});
	   
	   
	   
	   
	   
	   
	   /*
	   if (st > lastScrollTop){
	       // downscroll code
	   } else {
	      // upscroll code
	   }*/
	   lastScrollTop = st;
	});	
	
	
	
	
	
	
	
});