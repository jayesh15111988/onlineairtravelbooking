'use strict';


/* This is the main controller moduel. We will store all controllers used in our code in this module */


var airlinetravelmodule=angular.module('airtravelbookingappApp');
airlinetravelmodule.controller('MainCtrl', function ($scope) {

  });

airlinetravelmodule.controller('MainCtrlSample', function ($scope) {

    });


airlinetravelmodule.directive('registerFirstpage', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.dismissFirstPage = function() {
                element.modal('hide');
            };
            scope.showFirstPage = function() {
                element.modal('show');
            };

        }
    }
});

airlinetravelmodule.directive('customOnChange', function() {
    'use strict';

    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            var onChangeFunc = element.scope()[attrs.customOnChange];
            element.bind('change', onChangeFunc);
        }
    };
});





airlinetravelmodule.directive('registerSecondpage', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.showSecondPage = function() {
                element.modal('show');
            };
            scope.dismissSecondPage = function() {
                element.modal('hide');
            };
        }
    }
});



airlinetravelmodule.directive('forgotPassword', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.dismissForgotPasswordView = function() {
                element.modal('hide');
            };
            scope.showForgotPasswordView = function() {
                element.modal('show');
            };

        }
    }
});


/* For showing and hiding login view */
airlinetravelmodule.directive('loginView', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.dismissLoginView = function() {
                element.modal('hide');
            };
            scope.showLoginView = function() {
                element.modal('show');
            };

        }
    }
});


airlinetravelmodule.controller('loginController',function($scope){
    $scope.forgotPassword=function(){
    $scope.showForgotPasswordView();
    }
})


airlinetravelmodule.controller('forgotpasswordcontroller',function($scope){
$scope.gotobackpage=function(){

    $scope.dismissForgotPasswordView();
   //$scope.showLoginView();
}
})


airlinetravelmodule.controller('samcontroller',function($scope){



    $scope.dataclicked=function(){
        $scope.dismissFirstPage();
       $scope.showSecondPage();

    }
})

//curl -v  -X GET "https://api.flightstats.com/flex/airports/rest/v1/json/active?appId=9738bcd8&appKey=6c713890a9bf2822f783ab8870332617"
airlinetravelmodule.config(function($httpProvider){
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });
/*
airlinetravelmodule.controller('flightsearchcontroller',function($scope,$http){
    $scope.getAirports=function(){
        $http.get('https://api.flightstats.com/flex/airports/rest/v1/json/active?',{
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }},
            {params: {appId: '9738bcd8',appKey:'6c713890a9bf2822f783ab8870332617'}
        }).success(function(data, status, headers, config) {
               console.log("successful");
                alert("success");
                // Do something successful.
            }).error(function(data, status, headers, config) {
                // Handle the error
                console.log("eerroro");
                alert(data+"\n"+status+"\n"+headers+"\n"+config);
            });

    }

})*/




airlinetravelmodule.controller('flightsearchcontroller',function($scope,$http){
    $scope.getAirports=function(){
var searchStringToPass='';

        if( typeof $scope.searchStringSource !== "undefined"){
            searchStringToPass=$scope.searchStringSource;
        }

        else if(typeof $scope.searchStringDestination !== "undefined"){
            searchStringToPass=$scope.searchStringDestination;
        }

        $http({method: 'GET', url: 'http://jayeshkawli.com/airlinetravel/airportsapi.php?searchstring='+searchStringToPass,
             params: {}
        }).
            success(function(airportslist, status, headers, config) {
                if (airportslist instanceof Array){
                for(var airports in airportslist){
                    console.log(airportslist[airports]);
                }
                }
                else{
                    console.log("No Suggestions");
                }
              //  for(var indiairports in airportsList){
                //    console.log(airportsList[indiairports]+"<br/>");
                //}
                // this callback will be called asynchronously
                // when the response is available
            }).
            error(function(data, status, headers, config) {

                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });


}});
