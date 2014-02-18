'use strict';

var airlinetravelmodule=angular.module('airtravelbookingappApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

airlinetravelmodule.controller('samcontroller',function($scope){



    $scope.dataclicked=function(){
        alert("datareceived");
        $('#registerview').modal('hide');
        $('#gotoregistrationsecondpage').modal('show');

    }
})

