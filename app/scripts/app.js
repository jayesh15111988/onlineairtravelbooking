'use strict';

angular.module('airtravelbookingappApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap','autocomplete',
        'ngResource'
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
      .otherwise({
        redirectTo: '/'
      });
  });
