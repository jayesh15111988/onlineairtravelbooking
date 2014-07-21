'use strict';

angular.module('airtravelbookingappApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ui.bootstrap','autocomplete',
        'ngResource','ajoslin.promise-tracker'
    ],function($httpProvider){

    //Beginning of workaround for Angular's post http request not working

    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    var param = function(obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for(name in obj) {
            value = obj[name];

            if(value instanceof Array) {
                for(i=0; i<value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value instanceof Object) {
                for(subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
})

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
            .when('/retrievebooking/:confirmationcode/:emailaddress', {
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
    })
.service('sharedService',function(){
        var property='';

        return {
            getProperty: function () {
                return property;
            },
            setProperty: function(value) {
                property = value;
            }
        };
    })
    .service('openRegistrationDialogueService',function(){
        var registrationDialogueFunction;
        return {
            getProperty: function () {
                return registrationDialogueFunction;
            },
            setProperty: function(functionToAssign) {
                registrationDialogueFunction = functionToAssign;
            }
        };
    }).
service('getStoredAuthTokenService',function(){
       return {
           getStoredAuthToken:function(){

               var isAuthTokenExistsInLocalStorage = localStorage.getItem('authTokenInfo');
               if(typeof isAuthTokenExistsInLocalStorage === "string"){
                   isAuthTokenExistsInLocalStorage=JSON.parse(isAuthTokenExistsInLocalStorage);
               }

               return isAuthTokenExistsInLocalStorage;
           }
       }

    }).
    service('loginUserFunction',function(){
      var loginFunction;
       return {
           getLoginFunction:function(){
               return loginFunction;
           },
           setLoginFunction:function(loginFunctionaValue){
               loginFunction=loginFunctionaValue;
           }
       }
    }).
    service('flightsGlobalParameters',function(){
        var isLoggedInOnConfirmationScreenValue=false;
        var tripDirectionValue="OneWay";
        var isFilteringBasedOnAirlineValue=false;
        var bookbuttontitletextValue='Book Now';
        var numberOfResultsPerPageValue=10;
        var numberOfDaysToRetrieveFlightValue=1;
        var preferredAirlinesNameValue="";
        var connectionTypeValue='';
        var isEditingUserRegistrationInfoValue=false;
        var totalPValue;
        var totalPagesCountValue=10;
        //These parameters to maintain serach state while filtering flight search data
        //To do keep all of them in separate service - Intention is to separate out containers and simple variables
        //into respective services to avoid the possible confusion

        return {
            getFlightSearchParameters:function(){
        return {
            isLoggedInOnConfirmationScreen:isLoggedInOnConfirmationScreenValue,
            tripDirection:tripDirectionValue,
            isFilteringBasedOnAirline:isFilteringBasedOnAirlineValue,
            bookbuttontitletext:bookbuttontitletextValue,
            numberOfResultsPerPage:numberOfResultsPerPageValue,
            numberOfDaysToRetrieveFlight:numberOfDaysToRetrieveFlightValue,
            preferredAirlinesName:preferredAirlinesNameValue,
            connectionType:connectionTypeValue,
            isEditingUserRegistrationInfo:isEditingUserRegistrationInfoValue,
            totalP:totalPValue,
            totalPagesCount:totalPagesCountValue
        }
            },
            setIsLoggedInParameter:function(isLoggedIn){
isLoggedInOnConfirmationScreenValue=isLoggedIn;
            },
            setTripDirectionParameter:function(tripDirection){
                tripDirectionValue=tripDirection;
            },
            setBookButtonTitleParameter:function(bookButtonTitle){
                bookbuttontitletextValue=bookButtonTitle;
            },
            setNumberOfResultsPerPageParameter:function(numberOfResults){
                numberOfResultsPerPageValue=numberOfResults;
            },
        setIsFilteringBasedOnAirlineParameter:function(isFilteringOnairline){
            isFilteringBasedOnAirlineValue=isFilteringOnairline;
            },
            setNumberOfDaysToRetrieveFlightParameter:function(numberOfDaysToRetrieveFlightFor){
                numberOfDaysToRetrieveFlightValue=numberOfDaysToRetrieveFlightFor;
            },
            setPreferredAirlinesNameParameter:function(airlineName){
                preferredAirlinesNameValue=  airlineName;
            },
            setConnectionTypeParameter:function(connectionType){
                connectionTypeValue=connectionType;
            },
            setIsEditingUserRegistrationInfoParameter:function(isEditingUserInfo){
                isEditingUserRegistrationInfoValue=isEditingUserInfo;
            },
            setTotalPParameter:function(totalP){
                totalPValue=totalP;
            },
            setTotalPagesCountParameter:function(totalPagesCount){
              totalPagesCountValue=totalPagesCount;
            }
        }
    }).
    service('flightsGlobalContainers',function(){

        var getParameteresDictionaryValue={};
        var allFlightsDetailValue=Array();
        var appendixDictionaryValue={};
        var filteredArrayAfterAirlineSelectionValue=[];
        var tempHolderForAllFlightsValue=[];
        var departureDetailsGlobalValue=[];
        var arrivalDetailsglobalValue=[];
        var airportsDeepDetailsGlobalValue={};

        return {
            getFlightsGlobalContainersParameters:function(){
                return {
                getParameteresDictionary:getParameteresDictionaryValue,
                allFlightsDetail:allFlightsDetailValue,
                appendixDictionary:appendixDictionaryValue,
                filteredArrayAfterAirlineSelection:filteredArrayAfterAirlineSelectionValue,
                tempHolderForAllFlights:tempHolderForAllFlightsValue,
                departureDetailsGlobal:departureDetailsGlobalValue,
                arrivalDetailsglobal:arrivalDetailsglobalValue,
                airportsDeepDetailsGlobal :airportsDeepDetailsGlobalValue
                }
            },
            setGetParameteresDictionaryValueParameter:function(parametersDictionary){
                getParameteresDictionaryValue=parametersDictionary;
            },
            setAllFlightsDetailValueParameter:function(allFlightsDetail){
                allFlightsDetailValue=allFlightsDetail;
            },
            setAppendixDictionaryValueParameter:function(appendixDictionary){
                appendixDictionaryValue=appendixDictionary;
            },
            setFilteredArrayAfterAirlineSelectionValueParameter:function(filteredArrayAfterAirlineSelection){
                filteredArrayAfterAirlineSelectionValue=filteredArrayAfterAirlineSelection;
            },
            setTempHolderForAllFlightsValueParameter:function(tempHolderForAllFlights){
                tempHolderForAllFlightsValue=tempHolderForAllFlights;
            },
            setdepartureDetailsGlobalValueParameter:function(departureDetailsGlobal){
                departureDetailsGlobalValue=departureDetailsGlobal;
            },
            setArrivalDetailsglobalValueParameter:function(arrivalDetailsglobal){
                arrivalDetailsglobalValue=arrivalDetailsglobal;
            },
            setAirportsDeepDetailsGlobalParameter:function(airportsDeepDetailsGlobal){
                airportsDeepDetailsGlobalValue=airportsDeepDetailsGlobal;
            }

        }
    });




