(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .constant('APP_REQUIRES', {
          // jQuery based and standalone scripts
          scripts: {
            'modernizr':          ['/lib/modernizr/modernizr.js'],
            'icons':              ['/lib/fontawesome/css/font-awesome.min.css',
                                   '/lib/simple-line-icons/css/simple-line-icons.css']
          },
          // Angular based script (use the right module name)
          modules: [
            // {name: 'toaster', files: ['/lib/angularjs-toaster/toaster.js', '/lib/angularjs-toaster/toaster.css']}
            {name: 'angular-carousel',          files: ['/lib/angular-carousel/dist/angular-carousel.css',
                                                        '/lib/angular-carousel/dist/angular-carousel.js']},
            {name: 'angular-keyboard',          files: ['/lib/angular-virtual-keyboard/release/angular-virtual-keyboard.css',
                                                        '/lib/angular-virtual-keyboard/release/angular-virtual-keyboard.js']},
            {name: 'oitozero.ngSweetAlert',     files: ['/lib/sweetalert/dist/sweetalert.css',
                                                        '/lib/sweetalert/dist/sweetalert.min.js',
                                                        '/lib/angular-sweetalert/SweetAlert.js']},
            {name: 'ngDialog',                  files: ['/lib/ng-dialog/js/ngDialog.min.js',
                                                       '/lib/ng-dialog/css/ngDialog.min.css',
                                                       '/lib/ng-dialog/css/ngDialog-theme-default.min.css'] }                                                        
          ]
        })
        ;

})();
