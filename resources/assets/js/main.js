(function($) {
    'use strict';

    /* ---------------------------------------------- /*
       * Preloader
      /* ---------------------------------------------- */

    $(window).load(function() {

        $('.loader').fadeOut();
        $('.page-loader').delay(350).fadeOut('slow');
    });

    if (window.matchMedia('(min-width: 48em)').matches) {
      $('.cl').click(function() {
        $('.listcard').fadeOut('100');
        $('#map').fadeOut('100');
        $('.loader').fadeIn('100');
        $('.page-loader').fadeIn('100');
        setTimeout(function(){
          $('#searchform').submit();
        }, 100);
      });
    }

})(jQuery);
