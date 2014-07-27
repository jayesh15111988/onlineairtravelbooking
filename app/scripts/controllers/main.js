'use strict';


/* This is the main controller module. We will store all controllers used in our code in this module */



var airlinetravelmodule=angular.module('airtravelbookingappApp');



airlinetravelmodule.config(function($httpProvider){
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
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


//Directive to add focus for particular text field on screen

airlinetravelmodule.directive('successfullRegistration', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.dismissSuccessfullRegistration = function() {
                element.modal('hide');
            };
            scope.showSuccessfullRegistration = function() {
                element.modal('show');
            };

        }
    }
});


airlinetravelmodule.directive('registerUpdatepage', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.dismissRegPage = function() {
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

airlinetravelmodule.run(function($rootScope) {
    /*
     Receive emitted message and broadcast it.
     Event names must be distinct or browser will blow up!
     */
    $rootScope.$on('handleEmit', function(event, args) {
        $rootScope.$broadcast('handleBroadcast', args);
    });
});

//How to create directive based approach to show hide modal view Important
//Don't remove thic code even though not being used
/*airlinetravelmodule.directive('registerSecondpage', function() {
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
*/


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

airlinetravelmodule.directive('registerView',function(){
    return {
        restrict: 'A',
        link:function(scope,element,attr){
            scope.dismissRegisterView=function(){
                element.model('hide');
            };
            scope.showRegisterView=function(){
                element.modal('show');
            }
        }
    }

});






function sendUserDataToServer(formData,$scope,isCreatingUser,$http,callBackFunctionToExecute){


    var updateUrl=BASE_URL+'customerdetailsinsert.php';
    if(!isCreatingUser){
        updateUrl=BASE_URL+'customerdetailsupdate.php'
    }



    var authTokenInfoFromLocalStorage=JSON.parse(localStorage.getItem('authTokenInfo'));





    sendDataToServer("POST",updateUrl,
        formData,$http
        ,function(successfulResponse){

            var serverResponseData=JSON.stringify(successfulResponse);
            if(successfulResponse.success===true){
                if(localStorage.getItem('serverloginauthenticationsuccess')){
                    localStorage.removeItem('serverloginauthenticationsuccess');
                    localStorage.removeItem('authTokenInfo');
                }
                localStorage.setItem( 'serverloginauthenticationsuccess', serverResponseData);
                localStorage.setItem('authTokenInfo',JSON.stringify({'authtoken':successfulResponse.authorization,'emailaddress':successfulResponse.emailaddress,firstname:successfulResponse.firstname,tokenexpirytime:addMinutes(new Date(),30)}));
                callBackFunctionToExecute(successfulResponse);
            }
            else if (data.success===false){
                alert("User Creation failed with an error -> "+data.errorinfo);
                localStorage.setItem( 'serverregistrationerror', serverResponseData);
            }

        },function(failureMessage){
            console.log(failureMessage+ "this error occurred in the process");
            if(!isCreatingUser){
                $scope.$broadcast("SET_MESSAGE_HEADER_FAILURE","Failed to update");
            }
            else{
                $scope.messages = 'Your registration information has been unsuccessfully sent! No try again later...';
            }
        });
}



