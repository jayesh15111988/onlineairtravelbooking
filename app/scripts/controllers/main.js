'use strict';

var airlinetravelmodule=angular.module('airtravelbookingappApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });


airlinetravelmodule.directive('registerFirstpage', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.dismiss = function() {
                element.modal('hide');
            };
            scope.show = function() {
                element.modal('show');
            };

        }
    }
});


airlinetravelmodule.directive('registerSecondpage', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.show = function() {
                element.modal('show');
            };
            scope.dismiss = function() {
                element.modal('hide');
            };
        }
    }
});

airlinetravelmodule.controller('samcontroller',function($scope){



    $scope.dataclicked=function(){
        //alert("datareceived");
        $scope.dismiss();
       $scope.show();
       // $('#registerview').modal('hide');
       // $('#gotoregistrationsecondpage').modal('show');

    }
})

