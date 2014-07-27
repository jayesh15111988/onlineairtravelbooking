/**
 * Created by jayeshkawli on 7/26/14.
 */
airlinetravelmodule.controller('DetailController',function($scope,$routeParams,$modal,$http,$window,$rootScope,sharedService,getStoredAuthTokenService,openRegistrationDialogueService,loginUserFunction,flightsGlobalParameters,flightsGlobalContainers){

    //This function is to check if we have active internet connection

    $scope.showPreviousBookingDetails=false;
    $scope.toShowPlaceHolder=false;

    var isBookingNewFlight=false;
    isBookingNewFlight = $routeParams.id;
    $scope.showbookingdetails=!isBookingNewFlight;
    var QueryString = function () {
        // This function is anonymous, is executed immediately and
        // the return value is assigned to QueryString!
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = pair[1];
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [ query_string[pair[0]], pair[1] ];
                query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                query_string[pair[0]].push(pair[1]);
            }
        }
        return query_string;
    } ();


    var userLoginIndicator={};
    userLoginIndicator = getStoredAuthTokenService.getStoredAuthToken();

    //console.log("type of email whole info "+  JSON.parse(localStorage.getItem('authTokenInfo')).emailaddress);
    //console.log("type Of email address must work now "+userLoginIndicator.emailaddress);


    var setupButtons=function(isLoggedInAlready){

        //console.log(isLoggedInAlready + " should say true or false");
        $scope.bookingbuttontitle=isLoggedInAlready?"Update Booking Info and Book":"Login";
        $scope.toshowsecond=!isLoggedInAlready;
    }

    //Call this method on new user registration or upon login new user
    //var updateButtonOnLoginLogoutActions=function(isLoggedIn){

    //  setupButtons(isLoggedIn);

    //}

    $rootScope.$on("userLoginStatusChanged", function (event,loginStatusValue) {

        $scope.bookingbuttontitle=loginStatusValue.loggedIn?"Update Booking Info and Book":"Login";
        $scope.toshowsecond=!loginStatusValue.loggedIn;
        $scope.toshowconfirmbutton=loginStatusValue.loggedIn;

    });

    setupButtons(userLoginIndicator);

    //If user already logged in?


    var registrationFunction=openRegistrationDialogueService.getProperty();
    $scope.openNewUserModalView=function(){

        registrationFunction(true);
    }



    $scope.showRegisterNewUserModalView=function(){

        //Send notifications for showing login view
        userLoginIndicator = getStoredAuthTokenService.getStoredAuthToken();
        if(!userLoginIndicator){
            var showLoginViewFunction=loginUserFunction.getLoginFunction();
            showLoginViewFunction();
        }
        //Send notification for register view
        else{
            registrationFunction(false);
            $scope.toshowconfirmbutton=true;
        }
    }

    //Add listener once user registers or logs into an account


    var urlEmailAddress=$routeParams.emailaddress;          //unescape(QueryString.reservationretrievalemail);
    var urlConfirmationCode=$routeParams.confirmationcode;  //QueryString.confirmationcode;

    $scope.getAirlineFullInfoFromCode=function(airlineFSCode){

        var temporaryAirportsDeepDetailsData=flightsGlobalContainers.getFlightsGlobalContainersParameters().airportsDeepDetailsGlobal;

        //It mean we came on this page while making booking - AND NOT while retrieving it from database from previous activity
        if(isBookingNewFlight){


            for (var i in arrayForAllAirlinesInfo) {
                if(arrayForAllAirlinesInfo[i].fs===airlineFSCode){
                    dataWithFullNameForAirportsAndAirlines[airlineFSCode]=arrayForAllAirlinesInfo[i].name;
                    return dataWithFullNameForAirportsAndAirlines[airlineFSCode];
                    break;
                }
            }
        }
        else{
            if(temporaryAirportsDeepDetailsData[airlineFSCode]){
                return temporaryAirportsDeepDetailsData[airlineFSCode].fullname;
            }
        }
        return airlineFSCode;
    }


    var isInputValid=false;



    var sendPDFCopyToAnEmailConfirmation = function ($scope, $modalInstance, items) {

        console.log("Entered now haha" + typeof items);
        var isInputValid=false;
        $scope.errormessage="";

        /*$scope.dothat=function(emailaddress){

         //Each time user starts typing, cleat out previous error message

         $scope.errormessage="";

         console.log("Typeing email address"+ isInputValid);

         }*/
        //console.log(angular.toJson(items.emailaddress)+ "Email occurred");
        console.log(typeof items + " type of email address info ");
        $scope.fieldName={emailAddresses:items};


        $scope.$watch('fieldName.emailAddresses',function(n,o){

            isInputValid=$scope.fieldName.emailAddresses.length>10;
            console.log("Email addres entered is input valid "+isInputValid);


        },true);


        if(items){
            $scope.fieldName.emailAddresses=items;
        }


        $scope.ok = function (emailAddresses,phoneNumber) {
            if(isInputValid){
                var data=[emailAddresses,phoneNumber];
                $modalInstance.close(data);
            }else{
                $scope.errormessage="Please input valid email address";
                console.log("Not valid input yet");
            }
        };

        $scope.cancel = function () {

            $modalInstance.dismiss('cancel');

        };
    };

//start of controllers code for delay index for specific airport

    //Get delay ratings for given airport
    $scope.getDelayRatingsForAirport=function(airportFSCode,fullAirportName){

        var delayIndexModalInstance = $modal.open({
            templateUrl: 'delayIndexView',
            controller: delayIndexController,
            size: 'sm',
            resolve: {
                airportFSCodeValue: function () {
                    return [airportFSCode,fullAirportName];
                }
            }
        });

        delayIndexModalInstance.result.then(function (selectedItem) {
            console.log("Delay index item box closed with ok button");
        }, function () {
            console.log('Delay index modal dismissed at: ' + new Date());
        });
    };


//Actual controller for delay index controller on our view
    var delayIndexController = function ($scope, $modalInstance, airportFSCodeValue) {

        $scope.airportFullName=airportFSCodeValue[1];

        //Load all data from php script based on the airport FS code in picture
        /*$http({
         url: 'http://jayeshkawli.com/airlinetravel/getdelayindexbyparameter.php',
         method: "GET",
         cache:true,
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
         params: {"airportFSCode":airportFSCodeValue[0]}
         }).success(function (data, status, headers, config) {

         $scope.delayIndexParameters = data['delayIndexes'][0];

         }).error(function (data, status, headers, config) {



         });*/



        sendDataToServer("GET",BASE_URL+'getdelayindexbyparameter.php',{"airportFSCode":airportFSCodeValue[0]},$http,function(serverResponseData){
            $scope.delayIndexParameters = serverResponseData['delayIndexes'][0];

        },function(failureMessage,status,headers,config){
            console.log("Server request failed with message "+ failureMessage);


        });


        //Empty implementation - Not needed for now
        $scope.ok = function () {
            $modalInstance.close(airportFSCodeValue);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
//This should probably be global - But it's here for time being
        var monthNames =listOfMonths;


        $scope.getFormattedDate=function(dateToFormat){


            if(dateToFormat){
                //   var pattern = /(\d{4})-(\d{2})-(\d{2})/;
                var dt = new Date(dateToFormat);
                var fullDateInFormat = monthNames[dt.getMonth()]+ ", "+dt.getDate()+ " "+dt.getFullYear();
                return fullDateInFormat;
            }

        }

    }


    //End of delay index code

//Code for weather info at given source and destination


    $scope.openWeatherInformationPopUpFor=function(sourceAirportName){

        var delayIndexModalInstance = $modal.open({
            templateUrl: 'weatherReportView',
            controller: weatherReportController,
            size: 'sm',
            resolve: {
                airportFullNameValue: function () {
                    return sourceAirportName;
                }
            }
        });

        delayIndexModalInstance.result.then(function (selectedAirportName) {
            console.log("Weather report box closed with ok button "+ selectedAirportName);
        }, function () {
            console.log('Weather report modal dismissed at: ' + new Date());
        });
    }

    var  weatherReportController = function ($scope, $modalInstance, airportFullNameValue) {


        $scope.airportFullName="Weather Report for "+ airportFullNameValue;

        $scope.$watch('indiDayForecastValue', function (newValueOfDay, oldValueOfDay) {

            console.log('oldValue=' + oldValueOfDay);
            console.log('newValue=' + newValueOfDay);

        },true);



        $scope.zoneForecast=[];
        $scope.subsequentDaysInfo=[];
        $scope.indiDayForecastValue={};

        $scope.individualDayForecastValue={};
        $scope.individualDayForecastValue.airline={};


        var temporaryLookupMapping={};

//$scope.individualDayForecastValue={};



        function setupWeatherInfoForSpecificDayWithData(weatherInfoData){
            $scope.dayChosen=weatherInfoData['day'];
            $scope.forecastInfo=weatherInfoData['forecast'];
            $scope.startDate=weatherInfoData['start'];
            $scope.endDate=weatherInfoData['end'];

            $scope.extraWeatherInformation=weatherInfoData['tags'];
        }

        //Load all data from php script based on the airport FS code in picture
        /*      $http({
         url: 'http://jayeshkawli.com/airlinetravel/getweatherbyairportname.php',
         method: "GET",
         cache:true,
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
         params: {"airportFullName":airportFullNameValue}
         }).success(function (data, status, headers, config) {

         console.log(JSON.stringify(data)+ " Weather info received from server ");
         $scope.metar=data['metar'];
         $scope.tags=data['metar']['tags'];
         $scope.conditions=data['metar']['conditions'];
         $scope.zoneForecast=data['zoneForecast'];
         $scope.subsequentDaysInfo=data['zoneForecast']['dayForecasts'];
         $scope.individualDayForecastValue.airline=$scope.subsequentDaysInfo[0]['day'];
         $scope.areaInformation=$scope.zoneForecast['header'];
         setupWeatherInfoForSpecificDayWithData($scope.subsequentDaysInfo[0]);

         //Now fill in lookup object with name as key
         for(var individualDayWeatherObject in $scope.subsequentDaysInfo){
         var tempObjectUnderSelection=$scope.subsequentDaysInfo[individualDayWeatherObject];
         temporaryLookupMapping[tempObjectUnderSelection['day']]=tempObjectUnderSelection;
         }
         }).error(function (data, status, headers, config) {



         });

         */
        sendDataToServer("GET",BASE_URL+'getweatherbyairportname.php',{"airportFullName":airportFullNameValue},$http,function(serverResponseData){


            $scope.metar=serverResponseData['metar'];
            $scope.tags=serverResponseData['metar']['tags'];
            $scope.conditions=serverResponseData['metar']['conditions'];
            $scope.zoneForecast=serverResponseData['zoneForecast'];
            $scope.subsequentDaysInfo=serverResponseData['zoneForecast']['dayForecasts'];
            $scope.individualDayForecastValue.airline=$scope.subsequentDaysInfo[0]['day'];
            $scope.areaInformation=$scope.zoneForecast['header'];
            setupWeatherInfoForSpecificDayWithData($scope.subsequentDaysInfo[0]);

            //Now fill in lookup object with name as key
            for(var individualDayWeatherObject in $scope.subsequentDaysInfo){
                var tempObjectUnderSelection=$scope.subsequentDaysInfo[individualDayWeatherObject];
                temporaryLookupMapping[tempObjectUnderSelection['day']]=tempObjectUnderSelection;
            }

        },function(failureMessage,status,headers,config){
            console.log("Server request failed with message "+ failureMessage);


        });


        $scope.forecastDayChanged=function(){
            var weatherDataForSelectedDay = temporaryLookupMapping[$scope.individualDayForecastValue.airline];

            setupWeatherInfoForSpecificDayWithData(weatherDataForSelectedDay);

        }


        //Empty implementation - Not needed for now
        $scope.ok = function () {
            $modalInstance.close(airportFullNameValue);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
//This code for in case user toggles dropdown menu to check weather on some different day


    }



    //End of code for weather information


    $scope.open = function () {

        var modalInstance = $modal.open({
            templateUrl: isBookingNewFlight?'bookingconfirmation':'sendpdfdoctoemailaddress',
            controller: sendPDFCopyToAnEmailConfirmation,
            size: 'sm',
            resolve: {
                items:function () {
                    if(isBookingNewFlight){
                        return userLoginIndicator.emailaddress;
                    }
                    else{
                        return  $scope.emailaddress;
                    }
                }
            }
        });
        modalInstance.checkif=function(isInputValidFromUser){

            isInputValid=isInputValidFromUser;
        }

        modalInstance.result.then(function (data1) {

                //User has confirmed to send infomration to server and reserve booking
                //Book ticket, make database entry and send email and pdf
                var dataToSendForBookingConfirmation=[];

                if(localStorage.getItem('authTokenInfo')){
                    dataToSendForBookingConfirmation.push(JSON.parse(localStorage.getItem('authTokenInfo')));
                }
                else{
                    console.log("This is to fix ASAP - This is special case as described below");
                    //User did not login, nor does it have an account - This option falls into case where user is doing guest checkout and
                    //We need some mechanism to keep track of user informaiton. Probably auto enroll him in the registration while checking out
                    //As a guest. That seems closest possible approach to follow
                }

                if(localStorage.getItem('historySearchData')){
                    var historySearchData=JSON.parse(localStorage.getItem('historySearchData'));
                    //These are addiitonal fields added in case user wants to receive updates via extra means
                    historySearchData.additionalEmails=data1[0];
                    historySearchData.phoneNumberToSend=data1[1];
                    dataToSendForBookingConfirmation.push(historySearchData);
                }

                //This is to get full names for respective airlines - Probably won't be available while retrieving reservations back
                dataToSendForBookingConfirmation.push(dataWithFullNameForAirportsAndAirlines);
                dataToSendForBookingConfirmation.push(JSON.parse(localStorage.getItem('goingoutdetails')));


                if(flightsGlobalParameters.getFlightSearchParameters().tripDirection=="Round Trip"){
                    dataToSendForBookingConfirmation.push(JSON.parse(localStorage.getItem('comingindetails')));
                }

                console.log("Is booking new flight "+dataToSendForBookingConfirmation);
                if(isBookingNewFlight){




                    sendDataToServer("POST",BASE_URL+'finalbookingconfirmation.php',
                        { bookinginformation: dataToSendForBookingConfirmation },$http
                        ,function(successfulResponse){
                            //Show something fancy as we successfully booked the flight now


                            showModalViewWithSuccessfullConfirmation();

                            console.log(" Successful Response "+successfulResponse);
                        },function(failureMessage){
                            console.log("Error Occurred "+ failureMessage);
                        });
                    /*   $http.post('http://www.jayeshkawli.com/airlinetravel/finalbookingconfirmation.php', { bookinginformation: dataToSendForBookingConfirmation })
                     .success(function(response) {



                     }).error(function(errorMessage){



                     });*/
                }
                else{

                    sendDataToServer("POST",BASE_URL+'sendpdffiletoemail.php',
                        { emailaddresses: data1[0],confirmationcode:urlConfirmationCode },$http
                        ,function(successfulResponse){

                            console.log(" Successful Sent the pdf file on email addresses "+successfulResponse);
                        },function(failureMessage){
                            console.log("Error Occurred "+ failureMessage);
                        });
                    /*$http.post('http://www.jayeshkawli.com/airlinetravel/sendpdffiletoemail.php', { emailaddresses: data1[0],confirmationcode:urlConfirmationCode })
                     .success(function(response) {



                     }).error(function(errorMessage){

                     console.log("Error Occurred "+ errorMessage);

                     });*/
                }


            }, function (cancelResult) {

                console.log("dismissed at "+ new Date()+cancelResult);

            }

        );

    };



    var showModalViewWithSuccessfullConfirmation=function(){
        var modalInstance = $modal.open({
            templateUrl: 'successfullDialogue.html',
            controller: successfullRegistrationController,
            size: 'sm',
            resolve: {
                items: function () {
                    return "Kawli";
                }
            }
        });


        modalInstance.result.then(function (selectedItem) {
            console.log('Modal dismissed with message ' + selectedItem);
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };


    var successfullRegistrationController = function ($scope, $modalInstance, items) {

        $scope.ok = function () {
            $modalInstance.close(items);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };






    //Put logic to check if user has valid auth token or not
    $scope.fullTravelDetails=[];
    $scope.fullTravelDetails.arrival=[];
    $scope.fullTravelDetails.departure=[];
    var fullCodeNames={};

    var isUserLoggedIn;
    if(isBookingNewFlight){


        var dataWithFullNameForAirportsAndAirlines={};
        var arrayForAllAirlinesInfo= JSON.parse(localStorage.getItem('airlines'));

        $scope.toshowconfirmbutton=false;

        var storedUserHistorydata=JSON.parse(localStorage.getItem('historySearchData'));
        flightsGlobalParameters.setTripDirectionParameter(storedUserHistorydata.travelDirection);
        //tripDirection=storedUserHistorydata.travelDirection;

        var preStoredGlobalArrivalDetailsDetails=flightsGlobalContainers.getFlightsGlobalContainersParameters().arrivalDetailsglobal;

        var preStoredAirportsDeepDetailsData=flightsGlobalContainers.getFlightsGlobalContainersParameters().airportsDeepDetailsGlobal

        var numberOfKeys=Object.keys(preStoredGlobalArrivalDetailsDetails).length;
        isUserLoggedIn=localStorage.getItem('authTokenInfo');
        if(Object.keys(preStoredAirportsDeepDetailsData).length>0){
            if(localStorage.getItem('allAvailableAirportDetailsWithFullNames')){
                localStorage.removeItem('allAvailableAirportDetailsWithFullNames');
            }
            localStorage.setItem( 'allAvailableAirportDetailsWithFullNames', JSON.stringify(preStoredAirportsDeepDetailsData) );
        }
        // airportsDeepDetailsGlobal=JSON.parse(localStorage.getItem('allAvailableAirportDetailsWithFullNames'));
        flightsGlobalContainers.setAirportsDeepDetailsGlobalParameter(JSON.parse(localStorage.getItem('allAvailableAirportDetailsWithFullNames')));
        $scope.toshowfirst=true;

    }
    else{

        $scope.showAdditionalInformation=true;
        $scope.toshowconfirmbutton=false;
        $scope.toshowfirst=false;
        //It says checkout as a guest or register option which should not be available if retreiving booking
        $scope.toshowsecond=false;


    }


    $scope.getAirlineImageFromAirlineCode=function(airlineFSCode){
        return airlineImageSourceBaseURL+airlineFSCode+".gif";
    }


    $scope.checkoutguest=function(){

        //Not sure if it will wotk or now - But will see it
        var registrationFunction=openRegistrationDialogueService.getProperty();
        registrationFunction(true);

    }

    //User has either logged in/Updated information/created new registration account
    //Unfortunately we cannot use it when user logs in as page refreshes, we are not really able to catch the boradcast right
    //after user logs in. So we are using global variable 'isLoggedInOnConfirmationScreen' to check if credentials are valid and
    //We are ok to confirm booking on final screen

    //This block is applicable only when user creates new account or updates account details


    //$scope.$on('handleBroadcast', function(event, args) {
    $scope.$on('someEvent', function(event, args) {

        if(args.message!=-1){
            $scope.bookingbuttontitle="Login"
            $scope.toshowsecond=true;
            isUserLoggedIn=localStorage.getItem('authTokenInfo');
        }
        else{
            $scope.toshowconfirmbutton=true;
        }
    });

    //This block applicable only when user logs in on cofirmation page, waiting to finalize booking


    if(flightsGlobalParameters.getFlightSearchParameters().isLoggedInOnConfirmationScreen){// isLoggedInOnConfirmationScreen){
        $scope.toshowconfirmbutton=true;
    }

    $scope.showconfirmationorloginwindow=function(){

        if(isUserLoggedIn){
            //User is already logged in
            $scope.$broadcast("SET_MESSAGE_HEADER","Sample message");
            $("#userupdateview").modal('show');
        }
        else{
            //User is not logged in - Give change to either act as a guest or allow them to create new register

            $('#loginview').modal('show');
        }
    }


    $scope.getairportsindi=function(iatacode){


        //console.log("now stored iata code data is  "+iatacode);
        var previouslyStoredAirportsDeepDetailsData=flightsGlobalContainers.getFlightsGlobalContainersParameters().airportsDeepDetailsGlobal



        if(isBookingNewFlight){
            if(previouslyStoredAirportsDeepDetailsData.hasOwnProperty(iatacode)){
                dataWithFullNameForAirportsAndAirlines[iatacode]=previouslyStoredAirportsDeepDetailsData[iatacode].name
                return dataWithFullNameForAirportsAndAirlines[iatacode];
            }

        }else{
            if(previouslyStoredAirportsDeepDetailsData[iatacode]){
                return previouslyStoredAirportsDeepDetailsData[iatacode].fullname;
            }
        }
        return "";
    }


    function setupTripDetailsForOneWayFlight(){

        //Show that part only when we arrive here otherwise keep it hidden for time being
        $scope.setupTripDetailsForOneWayFlight=true;
        if(flightsGlobalParameters.getFlightSearchParameters().tripDirection=="OneWay"){

            $scope.showsecondpartofflightbooking=false;
            $scope.showreturningflights=true;
            $scope.flightDetailsSecondPart="One way flight details";

            //Storing our details in the local storage
            var preStoredArrivalDetails=flightsGlobalContainers.getFlightsGlobalContainersParameters().arrivalDetailsglobal;

            if(Object.keys(preStoredArrivalDetails).length>0){
                localStorage.setItem( 'goingoutdetails', JSON.stringify(preStoredArrivalDetails) );
            }

            $scope.fullTravelDetails.departure=JSON.parse(localStorage.getItem('goingoutdetails'));
            $scope.updateDeparture=JSON.parse(localStorage.getItem('historySearchData')).leavingOutOn;
            $scope.updateDeparture1=getStandardDate($scope.updateDeparture,$scope.fullTravelDetails.departure.arrivalDateAdjustment);

            $scope.bottomarrivalstatus="Have a nice flight1";
        }

        else if(flightsGlobalParameters.getFlightSearchParameters().tripDirection=="Round Trip"){



            $scope.arrivalstatus="Arrival Flight Details";
            $scope.showsecondpartofflightbooking=true;
            $scope.showreturningflights=true;
            $scope.flightDetailsFirstPart="Two way flight details - First Part";
            $scope.flightDetailsSecondPart="Two way flight details - Second Part";
            $scope.updateDeparture=JSON.parse(localStorage.getItem('historySearchData')).leavingOutOn;
            $scope.departureDate2=JSON.parse(localStorage.getItem('historySearchData')).comingInOn;

            //Going two way first part
            //We are removing any stale entries that might be lingering in local storage

            var preStoredDepartureDetails=flightsGlobalContainers.getFlightsGlobalContainersParameters().departureDetailsGlobal;
            var preStoredArrivalDetails=flightsGlobalContainers.getFlightsGlobalContainersParameters().arrivalDetailsglobal;

            if(Object.keys(preStoredDepartureDetails).length>0 || Object.keys(preStoredArrivalDetails).length>0){
                localStorage.setItem( 'goingoutdetails', JSON.stringify(preStoredDepartureDetails) );
                localStorage.setItem( 'comingindetails', JSON.stringify(preStoredArrivalDetails) );
            }

            //Departure section comes first and then arrives arrival - I mean name of identifier which displays airline booking info

            $scope.fullTravelDetails.departure=JSON.parse(localStorage.getItem('goingoutdetails'));
            $scope.fullTravelDetails.arrival=JSON.parse(localStorage.getItem('comingindetails'));

            //Set going and coming out detail
            $scope.updateDeparture1=getStandardDate( $scope.updateDeparture,$scope.fullTravelDetails.departure.arrivalDateAdjustment);
            $scope.departureDate3=getStandardDate($scope.departureDate2,$scope.fullTravelDetails.arrival.arrivalDateAdjustment);
            $scope.fullTravelDetails.departure.departureDateFrom=JSON.parse(localStorage.getItem('historySearchData')).leavingOutOn;//JSON.parse(localStorage.getItem('updatedgoingoutdetail')).updatedgoingoutdetail;

            $scope.arrivalstatus="Have a nice flight2";
        }


    }


    //We have user with appropriate code and we will user it to retrieve stored reservation

    function retrieveTripDetailsFromBackEnd(){



        $scope.showreturningflights=true;

        $http({method: 'GET', url: BASE_URL+'retrievepreviousbookings.php',params:{emailaddress:urlEmailAddress,confirmationcodetoquerywith:urlConfirmationCode}}).
            success(function(data, status, headers, config) {
                $scope.loadingToDisplay=false;

                //console.log("previous reservation data from server ****  "+JSON.stringify(data));
                if(data.success===false){
                    $window.location.href = "#/";
                    sharedService.setProperty(data.message);
                    $rootScope.$broadcast("errorInReservationRetrieval", { });
                    $scope.toShowPlaceHolder=true;
                    return;
                }
                console.log(urlEmailAddress+ " email address ");
                console.log(urlConfirmationCode+ " confirmation code ");

//Make sure we set airport deep details before any iata code could query on them to get full airport name
                $scope.showPreviousBookingDetails=true;
                //console.log(JSON.stringify(data.code_names_with_fullform)+ " Airport data with codes and full name");
                flightsGlobalContainers.setAirportsDeepDetailsGlobalParameter(data.code_names_with_fullform);
                //console.log("Now verifying previously stored information "+JSON.stringify(flightsGlobalContainers.getFlightsGlobalContainersParameters()().airportsDeepDetailsGlobal));//.);
                //console.log("Now verifying previously stored information sample "+sharedService.setProperty("Jayesh Kawli"));//.airportsDeepDetailsGlobal);
                //console.log("Now verifying previously stored information sample 2 "+sharedService.getProperty());
                $scope.toshowsendpdfdocbutton=true;


                var passengerbookingdetails=data.booking_details;

                //console.log("Passenger booking details in normal form "+JSON.stringify(passengerbookingdetails));

//SetUp passenger details before showing their flight details on screen
                $scope.fullname=passengerbookingdetails.userfullname;
                $scope.emailaddress=passengerbookingdetails.useremailaddress;
                $scope.confirmationcode=passengerbookingdetails.confirmationnumber;
                $scope.ticketcode=passengerbookingdetails.ticketnumber;
                $scope.flighttype=passengerbookingdetails.flighttype;
                $scope.travelclass=passengerbookingdetails.travelclass;
                $scope.traveldirection=passengerbookingdetails.traveldirection;
                $scope.sourcecity=passengerbookingdetails.source;
                $scope.destinationcity=passengerbookingdetails.destination;



                $scope.fullTravelDetails.departure=data.going_out_details;
                $scope.updateDeparture=passengerbookingdetails.dateofgoingout;

//We want date in yyyy/mm/dd format and not in the format javascript puts forth

                $scope.updateDeparture1=getFormattedDateForDisplay(getStandardDate( $scope.updateDeparture,$scope.fullTravelDetails.departure.arrivalDateAdjustment),0);


                //console.log("updated departure  "+passengerbookingdetails.dateofgoingout);
                //  fullCodeNames=data.code_names_with_fullform;
                //airportsDeepDetailsGlobal=data.code_names_with_fullform;



                $scope.flightDetailsSecondPart="One way flight details";
                //console.log(" Full Name    "+JSON.stringify(airportsDeepDetailsGlobal));

                if(data.coming_in_details){
                    //Two way flight chosen by the customer
                    //TwoWay
                    $scope.arrivalstatus="Arrival Flight Details";
                    $scope.flightDetailsFirstPart="Two way flight details - First Part";
                    $scope.flightDetailsSecondPart="Two way flight details - Second Part";
                    $scope.arrivalstatus="Have a nice flight2";


                    $scope.showsecondpartofflightbooking=true;
                    $scope.arrivalstatus="Arrival Flight Details";
                    $scope.fullTravelDetails.arrival=data.coming_in_details;
                    $scope.departureDate2=passengerbookingdetails.dateofgoingout;

                    $scope.departureDate3=getStandardDate($scope.departureDate2,$scope.fullTravelDetails.arrival.arrivalDateAdjustment);
                }
                else{
                    //OneWay Flight Chosen by the customer
                    $scope.flightDetailsSecondPart="One way flight details";
                    $scope.bottomarrivalstatus="Have a nice flight1";
                }
                //console.log(JSON.stringify(data)+ "Data received from server");
                // this callback will be called asynchronously
                // when the response is available
            }).
            error(function(data, status, headers, config) {
                $scope.loadingToDisplay=false;
                console.log("Error Occurred as following "+ data+ "With status "+status);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    }


    if(isBookingNewFlight){
        $scope.showPreviousBookingDetails=true;
        setupTripDetailsForOneWayFlight();
    }
    else{
        $scope.loadingToDisplay=true;
        //Retrieve backend booking details from database using confirmation code and user's email address
        retrieveTripDetailsFromBackEnd();
    }



});