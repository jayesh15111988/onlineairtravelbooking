/**
 * Created by jayeshkawli on 7/26/14.
 */




airlinetravelmodule.controller('flightsearchcontroller',function($scope,$http,$window,$timeout,$rootScope,openRegistrationDialogueService,getStoredAuthTokenService,flightsGlobalParameters,flightsGlobalContainers){


    //#warning to use while booking new flight it creates new user
    //#warning to remove afterwards - Used only to test if it's working fine

    //Called nowhere - as long as my knowledge goes

    /*
     $scope.showRegisterNewUserModalView=function(){
     var registrationFunction=openRegistrationDialogueService.getProperty();

     registrationFunction(true);

     }
     */

    $scope.defaultValue="N/A";
    $scope.sample=function(){

        //preferredAirlinesName=$scope.preferredairline.iata?$scope.preferredairline.iata:""
        flightsGlobalParameters.setPreferredAirlinesNameParameter($scope.preferredairline.iata?$scope.preferredairline.iata:"");
    }

    //We keep watch on destination airport - When it's different from source we set it as an international flight,
    //else as a domestic one
    $scope.$watch('destcodenew',function(newCountryCode,oldCountryCode){

        if($scope.sourcecodenew && newCountryCode){
            var isDomesticFlight = +(!($scope.sourcecodenew.toUpperCase()===newCountryCode.toUpperCase()));
            $scope.setpref(isDomesticFlight);
        }


    },true);

    //Get list of all active airports and populate it in a $scope array variable
    /*$http({
     url: 'http://jayeshkawli.com/airlinetravel/getallactiveairports.php',
     method: "GET",
     cache:true,
     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
     params: ""
     }).success(function (data, status, headers, config) {
     $scope.preferredairlineslist=data;
     $scope.preferredairlineslist.unshift({'name':"All Airlines","iata":"","icao":""});
     $scope.preferredairline=$scope.preferredairlineslist[0];


     }).error(function (data, status, headers, config) {

     });*/

    sendDataToServer("GET",BASE_URL+'getallactiveairports.php',{},$http,function(serverResponseData){
//        console.log(serverResponseData);
        $scope.preferredairlineslist=serverResponseData;
        $scope.preferredairlineslist.unshift({'name':"All Airlines","iata":"","icao":""});
        $scope.preferredairline=$scope.preferredairlineslist[0];

    },function(failureMessage,status,headers,config){
        console.log("Server request failed with message "+ failureMessage);


    });


    if(localStorage.getItem('recentlyReturnedFlightData')){
        localStorage.removeItem('recentlyReturnedFlightData');
    }


    $scope.toshowloadinganimation=false;
    $(function(){


        // setup autocomplete function pulling from currencies[] array
        $('#autocomplete1').autocomplete({
            lookup: currencies,
            onSelect: function (suggestion) {
                sourcecode= suggestion.data;
                $scope.sourcecodenew=sourcecode;
                console.log(suggestion.data+ "this is my");
            },
            onKeypress:function(event){
                console.log(event+" this is the key pressed");
            }
        });
        $('#autocomplete').autocomplete({
            lookup: currencies,
            onSelect: function (suggestion) {
                destcode= suggestion.data;
                $scope.destcodenew=destcode;
            }
        });



    });

    $scope.$watch('comingIn', function(){
        if($scope.comingIn < $scope.leavingOut) {
            $scope.comingIn='';
        }
    });








    $scope.firstdatechanged=function(){
        $scope.leavingOut='';
        console.log("Something has changed");
    }

    $scope.seconddatechanged=function(){
        $scope.comingIn='';
        console.log("Something has changed");
    }

    $scope.checkifvaliddate=function(){

        console.log($scope.leavingOut+ " Two ");
        console.log($scope.comingIn+ " One ");


        if($scope.comingIn<$scope.leavingOut){
            console.log("Problem");
        }
        else{
            console.log("No Problem");
        }

        console.log("Done");
    }

    $scope.movies = [];
    var userHistorydata={};


//Settings for our datepicker

    var today = new Date();

    var dateAfterAddingThreeMonths=today.addMonthsToDate(3);

    var afterThreeMonthsFormattedDate=getFormattedDateForDisplay(dateAfterAddingThreeMonths,1);//(lastMonth+3)+'/'+dd+'/'+yyyy;

    $scope.mindate='\''+today+'\'';
    $scope.maxdate1='\''+afterThreeMonthsFormattedDate+'\'';


    $scope.mindate2='\''+today+'\'';

    $scope.format = 'MM/dd/yyyy';




    $scope.dateOptions = {
        'year-format': "'yy'",
        'starting-day': 1,
        'show-weeks':true

    };


    var to = new Date();
    to.setDate(to.getDate() + 30);
//    console.log("date  "+to);

    var dd = to.getDate();
    var mm = to.getMonth()+1; //January is 0!
    var yyyy = to.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }


    var today22 = mm+'/'+dd+'/'+yyyy;






    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };




    $scope.doit1=function(){



        $scope.opened1=true;

    }

    $scope.open1 = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened1 = true;
    };

    $scope.isFlightButtonClicked=true;
    $scope.whichClassButtonClicked=true;
    $scope.isOneWayFlight=true;
    $scope.isDomestic=true;
    $scope.isVisibleReturningDate=false;

    if(localStorage.getItem('historySearchData')){
        userHistorydata=JSON.parse(localStorage.getItem('historySearchData'));

        //console.log(userHistorydata +" this is previously stored user data");
        $scope.sourcecodenew=userHistorydata.sourceCountry;
        $scope.destcodenew=userHistorydata.destinationCountry;
        $scope.searchStringSource=userHistorydata.sourceCity;
        $scope.searchStringDestination=userHistorydata.destinationCity;
        $scope.leavingOut=userHistorydata.leavingOutOn;
        $scope.comingIn=userHistorydata.comingInOn;
        flightsGlobalParameters.setTripDirectionParameter(userHistorydata.travelDirection);
        //tripDirection=userHistorydata.travelDirection;



        if(userHistorydata.travelDirection==='Round Trip'){
            $scope.isOneWayFlight=false;
            $scope.isVisibleReturningDate=true;

            flightsGlobalParameters.setBookButtonTitleParameter("Select Returning Flight")

        }
        else{
            $scope.isOneWayFlight=true;
            flightsGlobalParameters.setBookButtonTitleParameter("Book Now");
            //bookbuttontitletext="Book Now";
        }

        if(userHistorydata.travelType==='International'){
            $scope.isFlightButtonClicked=false;
        }
        else{
            //console.log("naaahhhh");
        }
    }


    /*Global Variable */


    var isSource=true;
    var sourcecode="";
    var destcode="";
    $scope.sourcevisible=false;
    $scope.destinationvisible=false;
    $scope.firstClassButtonClicked=false;
    $scope.businessClassButtonClicked=false;
    $scope.economyClassButtonClicked=true;
    $scope.whichAirline=true;
    $scope.flighttypedesiredwithstops=false;
    $scope.flighttypedesireddirect=true;
    $scope.searchByVariableDates=false;
    $scope.searchBySpecificDates=true;
    $scope.ten=true;
    /* parameters to be sent to database */

    var travelType="Domestic";
    var whichAirline="My Airline";
    var travelClass="Economy Class";
    var searchCriteria="Price";
    //var numberOfDaysToRetrieveFlight=1;

    $scope.numberAdult=[{number:'1'},{number:'2'},{number:'3'},{number:'4'},{number:'5'}];
    $scope.numberChildren=[{number:'0'},{number:'1'},{number:'2'},{number:'3'},{number:'4'},{number:'5'}];
    $scope.numberOfAdults=$scope.numberAdult[0];
    $scope.numberOfInfants=$scope.numberOfChildren=$scope.numberChildren[0];


    $scope.whichAirline=function(){
        whichAirline="My Airline";
    }

    $scope.isRoundTrip=function(val){



        if(!val){
            //tripDirection="OneWay";
            //bookbuttontitletext="Book Now";
            flightsGlobalParameters.setTripDirectionParameter("OneWay");
            flightsGlobalParameters.setBookButtonTitleParameter("Book Now");
            $scope.isVisibleReturningDate=false;
        }
        else{
            //tripDirection="Round Trip";
            //bookbuttontitletext="Select Returning Flight";
            flightsGlobalParameters.setTripDirectionParameter("Round Trip");
            flightsGlobalParameters.setBookButtonTitleParameter("Select Returning Flight");
            $scope.isVisibleReturningDate=true;
        }
    }

    $scope.classButtonPressed=function(val){
        $scope.firstClassButtonClicked=$scope.businessClassButtonClicked=$scope.economyClassButtonClicked=false;
        if(val==1){
            travelClass="First Class";
            $scope.firstClassButtonClicked=true;
        }
        else if(val==2){
            travelClass="Business Class";
            $scope.businessClassButtonClicked=true;
        }
        else if (val==3){
            travelClass="Economy Class";
            $scope.economyClassButtonClicked=true;

        }
    }

    $scope.searchbyconnectiontype=function(connectiontype){
        $scope.flighttypedesireddirect=$scope.flighttypedesiredwithstops=false;

        if(connectiontype==1){
            //connectionType='non_stop';
            flightsGlobalParameters.setConnectionTypeParameter('non_stop');
            $scope.flighttypedesireddirect=true;
        }
        else{
            //connectionType='connection';
            flightsGlobalParameters.setConnectionTypeParameter('Connection');
            $scope.flighttypedesiredwithstops=true;
        }
        console.log("connection type "+flightsGlobalParameters.getFlightSearchParameters().connectionType);
    } //1 for direct flight and 2 for flights with stop

    $scope.numberOfResultsPerPage=function(numberofresultsinput){
        $scope.ten=$scope.twenty=$scope.thirty=$scope.all=$scope.five=false;

        //numberOfResultsPerPage=numberofresultsinput;
        flightsGlobalParameters.setNumberOfResultsPerPageParameter(numberofresultsinput);
        if(numberofresultsinput==5){
            $scope.five=true;
        }
        else if(numberofresultsinput==10){
            $scope.ten=true;
        }
        else if(numberofresultsinput==20){
            $scope.twenty=true;
        }
        else if(numberofresultsinput==30){
            $scope.thirty=true;
        }
        else{
            $scope.all=true;
        }
    }










    var storedLocalAuthTokenInfo = getStoredAuthTokenService.getStoredAuthToken();

    //We will use this method to store given user's ip address and geolocation infromation in our database


    function IPAddressAndGeographicalInformationProcessingToServer(){


        /*$http.post('http://www.jayeshkawli.com/airlinetravel/iptogeographicalmappings.php', { ipAddressInformation: geographicalInformationData }
         )
         .success(function(response) {
         console.log("User Geographical Infromation successfully stored in the database with Response "+ response);

         }).error(function(errorMessage){
         console.log("Error Occurred "+ errorMessage);
         });*/




        /* $.get("http://ifconfig.me/ip.json",function(data,status){
         alert("Data: " + data + "\nStatus: " + status);
         });*/

        //Alternative CORS Solution
        //DO NOT FUCKIN ERASE THIS
        /* $.ajax({
         type: "GET",
         dataType: 'jsonp',
         url: "http://www.telize.com/jsonip",
         crossDomain : true,
         xhrFields: {

         }
         })
         .done(function( data ) {
         console.log(JSON.stringify(data));
         })
         .fail( function(xhr, textStatus, errorThrown) {
         alert(xhr.responseText);
         alert(textStatus);
         });
         */
        /*

         first time CORS successfull

         sendDataToServer("JSONP",IPAddressInfoURL,{},$http,function(serverResponseData){
         alert(JSON.stringify(serverResponseData));

         },function(failureMessage,status,headers,config){
         console.log("IP Address request failed with message "+ failureMessage+status+headers+config);


         });

         */
        sendDataToServer("JSONP",IPAddressInfoURL,{},$http,function(geoLocationInfo){
            var storedUserEmailAddress=storedLocalAuthTokenInfo?storedLocalAuthTokenInfo.emailaddress:"Anonymous";

            geoLocationInfo['userEmailAddress']=storedUserEmailAddress;

            sendDataToServer("POST",BASE_URL+'iptogeographicalmappings.php',
                {userGeoLocationInfo:geoLocationInfo},$http
                ,function(successfulResponse){
                    console.log("User Geographical Infromation successfully stored in the database with Response "+successfulResponse);
                },function(failureMessage){
                    console.log("Error Occurred in saving geolocaiton to database "+ failureMessage);
                });
        },function(failureMessage,status,headers,config){
            console.log("IP Address geolocation request failed with message "+ failureMessage);


        });




    }



    var saveIpAddressGeoLocationInformationInDatabase=function(){


        //This is website to get mappings from ipAddress to approximate location
        /* $http({
         //url: "https://freegeoip.net/json/",
         url: "http://www.telize.com/geoip",
         method: "GET",
         cache:true,
         params: "",
         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
         }).success(function (geographicalData, status, headers, config) {



         geographicalData['userEmailAddress']=storedLocalAuthTokenInfo?storedLocalAuthTokenInfo.emailaddress:"Anonymous";


         sendIPAddressAndGeographicalInformationToServer(geographicalData);

         }).error(function (data, status, headers, config) {

         console.log("Failed to get data from server with Error "+data+"Status "+status+"And Configuration "+config);

         });
         */


        /*sendDataToServer("GET",'http://www.telize.com/geoip?callback=?',{},$http,function(geographicalData){





         },function(failureMessage,status,headers,config){
         console.log("Failed to get data from server with Error "+failureMessage+"Status "+status+"And Configuration "+config);


         });*/

        IPAddressAndGeographicalInformationProcessingToServer();

    }








    $scope.bookNowPressed=function(){

//Store ip address info only if user has pressed flight search button, otherwise not
        saveIpAddressGeoLocationInformationInDatabase();
        /* tripDirection="Oneway";
         var travelType="Domestic";
         var whichAirline="My Airline";
         var travelClass="Economy Class";
         var searchCriteria="Price";*/



        var tempAllFlightsData= flightsGlobalContainers.getFlightsGlobalContainersParameters().allFlightsDetail;
        tempAllFlightsData.clear();

        //allFlightsDetail.clear();
        flightsGlobalContainers.setAllFlightsDetailValueParameter(tempAllFlightsData);
        $scope.toshowloadinganimation=true;

        if(typeof searchCriteria =="undefined"){
            searchCriteria="Price";
        }

        if(typeof  $scope.comingIn=="undefined"){
            $scope.comingIn="N/A";
        }

        //We are getting current serach parameters from user and store them in the local storage for offline usage

        userHistorydata.sourceCountry=$scope.sourcecodenew;
        userHistorydata.destinationCountry=$scope.destcodenew;
        userHistorydata.sourceCity=$scope.searchStringSource;
        userHistorydata.destinationCity=$scope.searchStringDestination;
        userHistorydata.travelDirection= flightsGlobalParameters.getFlightSearchParameters().tripDirection;//tripDirection;
        //console.log("Expected travel direction"+flightsGlobalParameters.getFlightSearchParameters().tripDirection);
        userHistorydata.travelType=(userHistorydata.sourceCountry===userHistorydata.destinationCountry)?"Domestic":"International";

        //var modelDate = $filter('date')($scope.leavingOut, "YYYY-MM-DD");
        //console.log("hahaha 100 "+modalDate);
        userHistorydata.leavingOutOn=$scope.leavingOut;
        userHistorydata.comingInOn=$scope.comingIn;
        userHistorydata.travelclass=travelClass;

        localStorage.setItem('historySearchData',JSON.stringify(userHistorydata));




        console.log(flightsGlobalParameters.getFlightSearchParameters().tripDirection);
        console.log(travelType);
        console.log(destcode);
        console.log($scope.searchStringSource);
        console.log($scope.searchStringDestination);
        console.log($scope.leavingOut);
        console.log($scope.comingIn);
        console.log($scope.numberOfAdults.number);
        console.log($scope.numberOfChildren.number);
        console.log($scope.numberOfInfants.number);
        console.log(flightsGlobalParameters.getFlightSearchParameters().numberOfDaysToRetrieveFlight);
        console.log(travelClass);
        console.log(whichAirline);
        console.log(searchCriteria);

        console.log($scope.sourcecodenew);
        console.log($scope.destcodenew);

        var formData = {
            'tripdirection' 				: flightsGlobalParameters.getFlightSearchParameters().tripDirection,
            'travelType':travelType,
            'sourcecode':$scope.sourcecodenew,
            'destcode':$scope.destcodenew,
            'sourceairport':$scope.searchStringSource,
            'destairport':$scope.searchStringDestination,
            'leavingout':$scope.leavingOut,
            'comingin':$scope.comingIn,
            'numadults':$scope.numberOfAdults.number,
            'numchildren':$scope.numberOfChildren.number,
            'numinfants':$scope.numberOfInfants.number,
            'travelclass':travelClass,
            'travelAirline':whichAirline,
            'serachcriteria':searchCriteria,
            'connectiontype':flightsGlobalParameters.getFlightSearchParameters().connectionType,
            'numberofresultsperpage':flightsGlobalParameters.getFlightSearchParameters().numberOfResultsPerPage
        };





        // Commented out for being stubborn
        /*      $http({
         url: 'http://jayeshkawli.com/airlinetravel/flightdetailsinsert.php',
         method: "GET",
         cache:true,
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
         params: formData
         }).success(function (data, status, headers, config) {
         console.log(data);
         $window.location.href = "#/showavailableflights/0?source="+$scope.searchStringSource+"&destination="+$scope.searchStringDestination+"&direction="+flightsGlobalParameters.getFlightSearchParameters().tripDirection+"&leavingdate="+$scope.leavingOut+"&comingindate="+$scope.comingIn+"&numberofdays="+flightsGlobalParameters.getFlightSearchParameters().numberOfDaysToRetrieveFlight;

         }).error(function (data, status, headers, config) {
         $scope.status = status;
         });
         */

        sendDataToServer("GET",BASE_URL+'flightdetailsinsert.php',formData,$http,function(serverResponseData){
            // console.log(serverResponseData);
            $window.location.href = "#/showavailableflights/0?source="+$scope.searchStringSource+"&destination="+$scope.searchStringDestination+"&direction="+flightsGlobalParameters.getFlightSearchParameters().tripDirection+"&leavingdate="+$scope.leavingOut+"&comingindate="+$scope.comingIn+"&numberofdays="+flightsGlobalParameters.getFlightSearchParameters().numberOfDaysToRetrieveFlight;
        },function(failureMessage,status,headers,config){
            console.log("Server request failed with message "+ failureMessage);
            $scope.status = status;

        });

    }

    $scope.searchByCriteriaButtonPressed=function(val){
        $scope.searchByPrice =$scope.searchByVariableDates =$scope.searchBySpecificDates =false;
        if(val==1){
            searchCriteria="Price";
            $scope.searchByPrice=true;
        }
        else if(val==2){
            searchCriteria="Variable Dates";
            //numberOfDaysToRetrieveFlight=3;
            flightsGlobalParameters.setNumberOfDaysToRetrieveFlightParameter(3);
            $scope.searchByVariableDates=true;
        }
        else if (val==3){
            searchCriteria="Specific Dates";
            //numberOfDaysToRetrieveFlight=1;
            flightsGlobalParameters.setNumberOfDaysToRetrieveFlightParameter(1);
            $scope.searchBySpecificDates=true;

        }
        console.log(flightsGlobalParameters.getFlightSearchParameters().numberOfDaysToRetrieveFlight+ "total number days to retrieev flight records");

    }



    $scope.setpref=function(val){


        if(val==0){
            travelType="Domestic";
            $scope.isFlightButtonClicked=true;
            $scope.isDomestic=true;
        }
        else{
            travelType="International";
            $scope.isFlightButtonClicked=false;
            $scope.isDomestic=false;
        }
    }
    $scope.changeDomestic= function(){
//console.log($scope.sourcecode);

        if($scope.isDomestic==true){
 //           console.log("indeed");
            $scope.destcodenew=document.getElementById('autocomplete1').value;

        }
    }
    $scope.setSource =function(isSourceTyping){
        console.log(isSourceTyping)
        if(isSourceTyping==1){
            // console.log("this is function1");
            isSource=true;
        }
        else if(isSourceTyping==0){
            //console.log("this is function2");
            isSource=false;
        }
    }



    $scope.getAirports=function(){


        var searchStringToPass='';




        var countryCode="";
        if( typeof $scope.searchStringSource !== "undefined" && isSource==true){
//            console.log("source");
            $scope.sourcevisible=true;
            searchStringToPass=$scope.searchStringSource;
            countryCode=document.getElementById('autocomplete1').value;
        }

        else if(typeof $scope.searchStringDestination !== "undefined" && isSource==false){

            $scope.destinationvisible=true;
            searchStringToPass=$scope.searchStringDestination;
            countryCode=document.getElementById('autocomplete').value;
        }
        if(typeof countryCode ==="undefined"){
            countryCode="";
        }
        var baseUrl=BASE_URL+'airportsapi.php?';



        baseUrl=baseUrl+'searchString='+searchStringToPass;

        var start = new Date().getTime();

        /*      $http({method: 'GET', url: 'http://jayeshkawli.com/airlinetravel/airportsapi.php?searchstring='+searchStringToPass+"&countryCode="+countryCode,
         params: {}
         }).
         success(function(airportslist, status, headers, config) {

         $scope.sourcevisible=false;
         $scope.destinationvisible=false;
         $scope.movies=airportslist;
         $scope.sam="";
         var end = new Date().getTime();
         var time = end - start;
         console.log('Execution time: ' + time);

         }).
         error(function(data, status, headers, config) {
         console.log("Error Occurred With response "+data+"And status message"+ status);
         });
         */
        sendDataToServer("GET",BASE_URL+'airportsapi.php?searchstring='+searchStringToPass+"&countryCode="+countryCode,{},$http,function(airportslist){
            $scope.sourcevisible=false;
            $scope.destinationvisible=false;
            $scope.movies=airportslist;
            $scope.sam="";
            var end = new Date().getTime();
            var time = end - start;
            console.log('Execution time: ' + time);

        },function(failureMessage,status,headers,config){
            console.log("Error Occurred With response "+failureMessage+" And status message "+ status);


        });
    }});
