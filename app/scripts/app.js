'use strict';

var mymodule=angular.module('airtravelbookingappApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
]);
mymodule.config(['$routeProvider',function ($routeProvider) {
    $routeProvider
      .when('/addorder', {
        templateUrl: 'views/addorder.html',
        controller: 'addordercontroller',
      foodata:'you wanna add'
        })
      .when('/showorders/:orderid', {
        templateUrl: 'views/showorders.html',
        controller: 'showorderscontroller',
            foodata:'you wanna see - OK'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

mymodule.run(function($templateCache){
    $templateCache.put('myfile.html','<div> hello</div>');
});

mymodule.directive('hello',function(){
    return {
restrict:'EA',
        templateUrl:'myfile.html',
        replace:true
    }
})


mymodule.directive('accordian',function(){
return{
    restrict:'EA',
    replace:true,
    transclude:true,
    template:'<div ng-transclude></div>',
    controller:function(){
        var expanders=[];
       this.gotOpened=function(selectedExpander)
        {
            angular.forEach(expanders, function(expander)
            {
             if(expander!=selectedExpander)
            {
                expander.showme=false;
            }
        });
        }


        this.addExpander=function(expander){
            expanders.push(expander);
        }
    }
}});

mymodule.directive('expander',function(){
    return{
        restrict:'EA',
        replace:true,
        transclude:true,
        require:'^?accordian',
        scope:{title:'=expanderTitle'},
        template:'<div><div class="title" ng-click="toggle()">{{title}}</div>'+
            '<div class="body" ng-show="showme" ng-transclude></div></div>',
        link:function(scope,element,attrs,accordianController){
            scope.showme=false;
            accordianController.addExpander(scope);
            scope.toggle=function toggle(){
                scope.showme=!scope.showme;
                accordianController.gotOpened(scope);
            }
        }
    }
})
