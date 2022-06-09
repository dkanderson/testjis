/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 * ======================================================================== */

( function ( $ ) {

  var $D = {},
      el = '',
      ppl = '',
      artworkWidth = 0;;



// Use this variable to set up the common and page specific functions. If you
// rename this variable, you will also need to rename the namespace below.
$D = {
  // All pages

  sliderInnerWidth: 0,

  scrollPosition: 0,

  common: {

    init: function () {
      // JavaScript to be fired on all pages
        /**
         * Copyright 2012, Digital Fusion
         * Licensed under the MIT license.
         * http://teamdf.com/jquery-plugins/license/
         *
         * @author Sam Sehnert
         * @desc A small plugin that checks whether elements are within
         *     the user visible viewport of a web browser.
         *     only accounts for vertical position, not horizontal.
         */


        $.fn.visible = function ( partial ) {

            var $t            = $( this ),
                $w            = $( window ),
                viewTop       = $w.scrollTop(),
                viewBottom    = viewTop + $w.height(),
                _top          = $t.offset().top,
                _bottom       = _top + $t.height(),
                compareTop    = partial === true ? _bottom : _top,
                compareBottom = partial === true ? _top : _bottom;

          return ( ( compareBottom <= viewBottom ) && ( compareTop >= viewTop ) );

        };

       

        
       $( window ).scroll( function ( event ) {

              if ( ppl.visible ( true ) ) {

                //do something cool

              }

        });
    }
  },
  // Home page
  home: {

    init: function () {
      // JavaScript to be fired on the home page
    }
  }
  // Add pages as needed

};

// The routing fires all common scripts, followed by the page specific scripts.
// Add additional events for more control over timing e.g. a finalize event

var UTIL = {

  fire: function( func, funcname, args ) {

    var namespace = $D;
    funcname = ( funcname === undefined ) ? 'init' : funcname;

    if ( func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function' ) {

      namespace[ func ][ funcname ] (args);

    }
  },

  loadEvents: function() {

    UTIL.fire( 'common' );

    $.each( document.body.className.replace( /-/g, '_' ).split( /\s+/ ),function( i,classnm ) {

      UTIL.fire( classnm );

    });

  }
};

$( document ).ready( UTIL.loadEvents );

})( jQuery ); // Fully reference jQuery after this point.
