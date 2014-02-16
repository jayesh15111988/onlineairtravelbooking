'use strict';
    var sampleApp=angular.module('airtravelbookingappApp');
    sampleApp.controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma1'
    ];
  });

sampleApp.controller('somecontroller',function($scope){
   // $scope.title='this is shrinked header';
    //$scope.message='this is shrinked content';
$scope.expanders=[{title:'message1',desc:'mydata1'},{title:'message2',desc:'mydata2'},{title:'message3',desc:'mydata3'},{title:'message4',desc:'mydata4'}];
})

sampleApp.controller('addordercontroller',function($scope,$route){
    $scope.message='this is message one for adding orderddd'+'and1 '+ $route.current.foodata;
})
sampleApp.controller('showorderscontroller',function($scope,$routeParams,$route){
    $scope.message='this is message one for showing orders and order id is'+$routeParams.orderid+ 'and '+ $route.current.foodata;
})

sampleApp.controller('tabController',function($scope){
    $scope.myname='jayesh';
    $scope.change=function(id){
    $scope.myname=id;
}
$scope.dateSelected=function(dateSelected){
    $location.path("/myplace/dateselected/nextdate="+dateSelected);
    $scope.apply();
}
});

