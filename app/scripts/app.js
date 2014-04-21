'use strict';

angular.module('airtravelbookingappApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ui.bootstrap','autocomplete',
        'ngResource','ajoslin.promise-tracker'
    ])

    /* Route Provider decides which page to show based on the input URL */

    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/flightsearch', {
                templateUrl: 'views/flightsearch.html',
                controller: 'flightsearchcontroller'
            })
            .when('/showavailableflights/:id', {
                templateUrl: 'views/showflights.html',
                controller: 'showflightscontroller'
            })
            .when('/view/:id', {
                controller: 'DetailController',
                templateUrl: 'views/detail.html'
            })
            .when('/samfile',{
                controller:'',
                templateUrl:'views/sam.php'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
