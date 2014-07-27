/**
 * Created by jayeshkawli on 7/26/14.
 */
airlinetravelmodule.controller('showflightscontroller',function($scope,$http,$routeParams,$location,$window,$timeout,flightsGlobalParameters,flightsGlobalContainers){
    //var baseUrl='http://jayeshkawli.com/airlinetravel/airportsapi.php?';
    // baseUrl=baseUrl+'searchString='+searchStringToPass;

//This really shouldn't be a global variable, will see what happens next
    //Will fix if doesn't seem to be working after it



    //Remove all previous entries for departure and arrival date
    if(localStorage.getItem('updatedcomingindetail')){
        localStorage.removeItem('updatedcomingindetail');
    }

    //if(localStorage.getItem('updatedgoingoutdetail')){
    //  localStorage.removeItem('updatedgoingoutdetail');
    //}


    var isBookingReturnFlight=0;
    var preStoredGoingOutDate=JSON.parse(localStorage.getItem('historySearchData')).leavingOutOn;


    var originalDepartureDate;
    console.log("Returning date flag ****"+isBookingReturnFlight);
    if(!isBookingReturnFlight){
        if(preStoredGoingOutDate){
            originalDepartureDate=preStoredGoingOutDate;
        }
        else{
            originalDepartureDate=$scope.departureDate;
        }
        localStorage.setItem('updatedgoingoutdetail',JSON.stringify({updatedgoingoutdetail:originalDepartureDate}));
    }
    //else{

    //}


    console.log(originalDepartureDate+ "ooo riginal");
    var tempStorageForFlightDetailsAfterFilteringOnAirlines=[];



    $scope.hideConnectionDetails=function(divIdentifier){
        console.log(divIdentifier+ "This is relevant div identifier");
        $("#connectiondetails-"+divIdentifier).fadeToggle();
    }



    $scope.daysRange=[{displayDay:'-2 Days',backgroundDay:-2},{displayDay:'-1 Day',backgroundDay:-1},{displayDay:'Current Day',backgroundDay:0},{displayDay:'+1 Day',backgroundDay:1},{displayDay:'+2 days',backgroundDay:2}];

    $scope.dayOfBookingChanged=function(backgroundDay){


        console.log(originalDepartureDate+ "Original date");
        var previouslySelectedDate = originalDepartureDate;


        $scope.departureDate=getStandardDate(previouslySelectedDate,backgroundDay);
        //after updating date send another request with new departure Date

        $scope.loadingToDisplay=true;


        var previouslyStoredGetParametersInfo=flightsGlobalContainers.getFlightsGlobalContainersParameters().getParameteresDictionary;
        if(!isBookingReturnFlight){
            previouslyStoredGetParametersInfo.leavingdate=$scope.departureDate;
        }
        else{
            previouslyStoredGetParametersInfo.comingindate=$scope.departureDate;
        }
        flightsGlobalContainers.setGetParameteresDictionaryValueParameter(previouslyStoredGetParametersInfo);



        var previouslyStoredHistorySearchData=JSON.parse(localStorage.getItem('historySearchData'));


        if(!isBookingReturnFlight){


            previouslyStoredHistorySearchData.leavingOutOn=$scope.departureDate;


        }
        else{


            previouslyStoredHistorySearchData.comingInOn=$scope.departureDate;


        }


        localStorage.setItem('historySearchData',JSON.stringify(previouslyStoredHistorySearchData));


        var previouslyStoredFlightSearchParameters=flightsGlobalContainers.getFlightsGlobalContainersParameters().getParameteresDictionary;

        if(isBookingReturnFlight){
            getFlightFromGivenParameters(previouslyStoredFlightSearchParameters.destination,previouslyStoredFlightSearchParameters.source,$scope.departureDate,previouslyStoredFlightSearchParameters.comingindate,flightsGlobalParameters.getFlightSearchParameters().connectionType,flightsGlobalParameters.getFlightSearchParameters().numberOfDaysToRetrieveFlight);
        }
        else{
            getFlightFromGivenParameters(previouslyStoredFlightSearchParameters.source,previouslyStoredFlightSearchParameters.destination,$scope.departureDate,previouslyStoredFlightSearchParameters.comingindate,flightsGlobalParameters.getFlightSearchParameters().connectionType,flightsGlobalParameters.getFlightSearchParameters().numberOfDaysToRetrieveFlight);
        }


    }



    $scope.day=$scope.daysRange[2];
    $scope.availableflightparameters="";
    $scope.departureDate='';
    $scope.loadingToDisplay=true;
    var airline,airports;
    var airlines=Array();
    $scope.airportsDeepDetails={};

    var sortParamsEnum = {

        DEPTIME: "Departure Time",
        ARRTIME: "Arrival Time",
        DISTMILES:"Distance Miles",
        FLIGHTDURATION:"Flight Duration Minutes"

    };


    $scope.connectionTypeParameters=[
        {backgroundName:"CONNECTION",displayName:"With Stops"},
        {backgroundName:"NON_STOP",displayName:"Non Stop"},
        {backgroundName:"DIRECT",displayName:"Direct"}
    ];

    $scope.daysAdjustmentParameters=[{backgroundName:0,displayName:"0 Day"},{backgroundName:1,displayName:"1 Day"}];


    $scope.sortparamterscontainer=[{displayName:"Departure Time",backGroundName:"departureTime"},{displayName:"Arrival Time",backGroundName:"arrivalTime"},{displayName:"Distance Miles",backGroundName:"distanceMiles"},{displayName:"Flight Duration Minutes",backGroundName:"flightDurationMinutes"}];
    $scope.backgroundsortparamters=backgroundSortParametersValues;
    $scope.orderParametersArray=[{displayName:"Ascending",backGroundName:1},{displayName:"Descending",backGroundName:-1}];
    $scope.sortparameter=$scope.sortparamterscontainer[0];
    $scope.orderTypeForOptions=$scope.orderParametersArray[0];

    $scope.connectionTypeParameter=$scope.connectionTypeParameters[0];
    $scope.daysAdjustmentParameter=$scope.daysAdjustmentParameters[0];

    $scope.ascendingDescendingOptionChose=function(){



        var lastSortParameter=localStorage.getItem('lastUsedSortParameter')?localStorage.getItem('lastUsedSortParameter'):"departureTime";
        console.log(lastSortParameter+"Is this sensible enough?");
        $scope.filterWithAirline(lastSortParameter,0,false);

    }




    var getSampleAllAirlinesObject=function(){
        return {iata:"clearall", name:'All Airlines',fs:""};
    }


    $scope.filterWithAirline=function(airlineName,searchType,isFilterParameter){
        console.log(airlineName+ "actual name");


        flightsGlobalParameters.setIsFilteringBasedOnAirlineParameter(!(airlineName==='clearall'));
        //airlineName==='clearall'?(isFilteringBasedOnAirline=false):(isFilteringBasedOnAirline=true);

        //console.log(allFlightsDetail.length+ "this was the orifginal length");
        var preStoredTempFolderForAllFlights=flightsGlobalContainers.getFlightsGlobalContainersParameters().tempHolderForAllFlights;
        var previouslyStoredFilteredArrayAfterAirlineSelection=flightsGlobalContainers.getFlightsGlobalContainersParameters().filteredArrayAfterAirlineSelection;
        var previouslyStoredAllFlightsDetails=flightsGlobalContainers.getFlightsGlobalContainersParameters().allFlightsDetail;

        if(flightsGlobalParameters.getFlightSearchParameters().isFilteringBasedOnAirline){


            if(preStoredTempFolderForAllFlights.length==0){

                //tempHolderForAllFlights=allFlightsDetail;
                flightsGlobalContainers.setTempHolderForAllFlightsValueParameter(previouslyStoredAllFlightsDetails);
            }

            //Filter all connections based on a airline name
            if(searchType==2 && isFilterParameter!==false){






                var numberOfFlights = preStoredTempFolderForAllFlights.length;
                var flightLegsFromSavedData=[];
                var connectionDetailObject={};
                var individualFlightsRecord={};
                var connections={};



                if(previouslyStoredFilteredArrayAfterAirlineSelection.length>0){
                    previouslyStoredFilteredArrayAfterAirlineSelection.clear();
                }


                for (var i = 0; i < numberOfFlights; i++) {
                    individualFlightsRecord=clone(preStoredTempFolderForAllFlights[i]);
                    if(isFilterParameter=='airlineName'){
                        flightLegsFromSavedData=individualFlightsRecord.flightLegs;
                        var connectionLength=flightLegsFromSavedData.length;
                        console.log("this is ugly, but is required "+flightLegsFromSavedData);
                        for(var connections=0;connections<connectionLength;connections++){
                            connectionDetailObject= flightLegsFromSavedData[connections];
                            console.log("Verification actual "+connectionDetailObject.carrierFsCode+ "And parameter given to function "+ airlineName);
                            if(connectionDetailObject.carrierFsCode===airlineName){
                                previouslyStoredFilteredArrayAfterAirlineSelection.push(individualFlightsRecord);
                                break;
                            }
                        }
                    }
                    else if (isFilterParameter=='flightType'){

                        console.log("flighttype"+airlineName+ "  "+isFilterParameter+" last "+individualFlightsRecord.flightType);
                        if(individualFlightsRecord.flightType==airlineName){

                            previouslyStoredFilteredArrayAfterAirlineSelection.push(individualFlightsRecord);
                        }
                    }
                    else if(isFilterParameter=='arrivalDateAdjustment'){
                        if(individualFlightsRecord.arrivalDateAdjustment==airlineName){
                            previouslyStoredFilteredArrayAfterAirlineSelection.push(individualFlightsRecord);
                        }
                    }

                }

//Now update priviusly stored flights details with updatedo one
                flightsGlobalContainers.setFilteredArrayAfterAirlineSelectionValueParameter(previouslyStoredFilteredArrayAfterAirlineSelection);

            }
            else if(searchType==0){
                localStorage.setItem('lastUsedSortParameter',airlineName);
                //Sort by specific parameter check if filetred array contains any data first
                //var preStoredFilteredArray=flightsGlobalContainers.getFlightsGlobalContainersParameters().filteredArrayAfterAirlineSelection;

                var arrayToOperateOn=previouslyStoredFilteredArrayAfterAirlineSelection.length?previouslyStoredFilteredArrayAfterAirlineSelection.slice(0):preStoredTempFolderForAllFlights.slice(0);

                //filteredArrayAfterAirlineSelection=arrayToOperateOn.sort(dynamicSort(airlineName,$scope.orderTypeForOptions.backGroundName));
                flightsGlobalContainers.setFilteredArrayAfterAirlineSelectionValueParameter(arrayToOperateOn.sort(dynamicSort(airlineName,$scope.orderTypeForOptions.backGroundName)));
            }

        }
        else{

            //Come here only if user has previously sorted flight search results now we want to clear ALL previous search filters
            //And return all flights from original list - There is reason for not putting any filters on home screen

            if(preStoredTempFolderForAllFlights.length>0)
            {
                //filteredArrayAfterAirlineSelection.clear();
                var tempPreviouslyStoredFilteredData= previouslyStoredFilteredArrayAfterAirlineSelection.clear();
                flightsGlobalContainers.setFilteredArrayAfterAirlineSelectionValueParameter(tempPreviouslyStoredFilteredData);

                //filteredArrayAfterAirlineSelection.concat(tempHolderForAllFlights);


                previouslyStoredFilteredArrayAfterAirlineSelection.push.apply(previouslyStoredFilteredArrayAfterAirlineSelection, preStoredTempFolderForAllFlights);


                //tempHolderForAllFlights.clear();
                flightsGlobalContainers.setTempHolderForAllFlightsValueParameter([]);

                var clonedTempHolderForAllFlights= clone(previouslyStoredFilteredArrayAfterAirlineSelection);
                flightsGlobalContainers.setTempHolderForAllFlightsValueParameter(clonedTempHolderForAllFlights);


                flightsGlobalContainers.setFilteredArrayAfterAirlineSelectionValueParameter(previouslyStoredFilteredArrayAfterAirlineSelection);
            }
        }



        setupPageWithAllFlightDetails(previouslyStoredFilteredArrayAfterAirlineSelection);






        $scope.loadingToDisplay=false;
        console.log(previouslyStoredFilteredArrayAfterAirlineSelection.length);

    }

    function dynamicSort(property,sortOrder) {


        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    $scope.bookorgotoreturingflights=function(index){




        var previouslyStoredAllflightDetails=flightsGlobalContainers.getFlightsGlobalContainersParameters().allFlightsDetail;
        if($scope.bookbuttontitle=="Book Now"){





            flightsGlobalContainers.setArrivalDetailsglobalValueParameter(previouslyStoredAllflightDetails[index]);

            var preStoredArrivalDetails=flightsGlobalContainers.getFlightsGlobalContainersParameters().arrivalDetailsglobal;

            var numberOfKeys=Object.keys(preStoredArrivalDetails).length;


            if(flightsGlobalParameters.getFlightSearchParameters().tripDirection=="Round Trip"){
                console.log("two way flight")

            }
            else if(flightsGlobalParameters.getFlightSearchParameters().tripDirection=="OneWay"){
                console.log("One way flight this is");
            }
            $window.location.href="#/view/"+numberOfKeys;

        }
        else if($scope.bookbuttontitle=="Select Returning Flight"){
            isBookingReturnFlight=1;
            $scope.day=$scope.daysRange[2];
            //bookbuttontitletext="Book Now";
            flightsGlobalParameters.setBookButtonTitleParameter("Book Now");
            console.log(index +"departure");


            //departureDetailsGlobal=allFlightsDetail[index];
            flightsGlobalContainers.setdepartureDetailsGlobalValueParameter(previouslyStoredAllflightDetails[index]);


            previouslyStoredAllflightDetails.clear();

            //allFlightsDetail.clear();//
            flightsGlobalContainers.setAllFlightsDetailValueParameter(previouslyStoredAllflightDetails);

            $scope.loadingToDisplay=true;

            var prestoredComingIndate=JSON.parse(localStorage.getItem('historySearchData')).comingInOn;

            if(prestoredComingIndate){
                originalDepartureDate=prestoredComingIndate;
            }
            else{
                originalDepartureDate=$scope.departureDate;
            }

            $scope.departuredate=originalDepartureDate;

            //localStorage.setItem('updatedcomingindetail',JSON.stringify({updatedcomingindetail:originalDepartureDate}));

            var previouslyStoredGetParameters=flightsGlobalContainers.getFlightsGlobalContainersParameters().getParameteresDictionary;

            getFlightFromGivenParameters(previouslyStoredGetParameters.destination,previouslyStoredGetParameters.source,previouslyStoredGetParameters.comingindate,previouslyStoredGetParameters.leavingdate,flightsGlobalParameters.getFlightSearchParameters().connectionType,flightsGlobalParameters.getFlightSearchParameters().numberOfDaysToRetrieveFlight);

        }
    }

    //console.log($routeParams.id+ " id "+ (parseInt($routeParams.id)+9));

    // console.log(get('source')+"babab");
    var previouslyStoredAllflightDetails=flightsGlobalContainers.getFlightsGlobalContainersParameters().allFlightsDetail;
    if(previouslyStoredAllflightDetails.length>0){


        var prestoredAppendixDictionary=flightsGlobalContainers.getFlightsGlobalContainersParameters().appendixDictionary;

        $scope.flightDetails = previouslyStoredAllflightDetails.slice($routeParams.id*flightsGlobalParameters.getFlightSearchParameters().numberOfResultsPerPage,parseInt($routeParams.id*flightsGlobalParameters.getFlightSearchParameters().numberOfResultsPerPage)+flightsGlobalParameters.getFlightSearchParameters().numberOfResultsPerPage);
        $scope.bookbuttontitle= flightsGlobalParameters.getFlightSearchParameters().bookbuttontitletext;
        $scope.totalPages=flightsGlobalParameters.getFlightSearchParameters().totalPagesCount;// totalPagesCount;
        $scope.airlines=prestoredAppendixDictionary.airlines;

        $scope.airports=prestoredAppendixDictionary.airports;
        $scope.equipments=prestoredAppendixDictionary.equipments;
        $scope.loadingToDisplay=false;

    }


    var setupPageWithAllFlightDetails=function(flightDetails){


        var preStoredGetParametersDictionary=flightsGlobalContainers.getFlightsGlobalContainersParameters().getParameteresDictionary;

        if(flightsGlobalParameters.getFlightSearchParameters().numberOfResultsPerPage=='all'){
            flightsGlobalParameters.setTotalPParameter(flightDetails.length); //totalP=;
        }
        else{
            //totalP=Math.ceil(flightDetails.length/numberOfResultsPerPage);
            flightsGlobalParameters.setTotalPParameter(Math.ceil(flightDetails.length/flightsGlobalParameters.getFlightSearchParameters().numberOfResultsPerPage));
        }


        $scope.totalPages=Array();
        for(var i=0;i<flightsGlobalParameters.getFlightSearchParameters().totalP;i++){
            $scope.totalPages.push(i);
        }
        $scope.bookbuttontitle=flightsGlobalParameters.getFlightSearchParameters().bookbuttontitletext;
        //totalPagesCount=$scope.totalPages;
        flightsGlobalParameters.setTotalPagesCountParameter($scope.totalPages);
        var travelDate;
        if(!isBookingReturnFlight){
            if(preStoredGetParametersDictionary.leavingdate){
                travelDate=new Date(preStoredGetParametersDictionary.leavingdate);

            }
            else{

                travelDate = new Date(JSON.parse(localStorage.getItem('historySearchData')).leavingOutOn);

            }
        }
        else{

            ///
            if(preStoredGetParametersDictionary.comingindate){
                travelDate=new Date(preStoredGetParametersDictionary.comingindate);

            }
            else{

                travelDate = new Date(JSON.parse(localStorage.getItem('historySearchData')).comingInOn);

            }


        }

        $scope.departureDate=((travelDate.getMonth()+1)+"/"+travelDate.getDate()+ "/"+travelDate.getFullYear());
        flightsGlobalContainers.setAllFlightsDetailValueParameter(flightDetails);


        $scope.flightDetails = flightDetails.slice(0,flightsGlobalParameters.getFlightSearchParameters().numberOfResultsPerPage);
        $scope.loadingToDisplay=false;


    }

    function addToAirportDetails(airportsArray){

        var airportsArrayLength=airportsArray.length;
//sdfsd
        for(var i =0;i<airportsArrayLength;i++){
            var airportCode=airportsArray[i].iata;
            //console.log(airportCode);
            $scope.airportsDeepDetails[airportCode]=airportsArray[i];

            //console.log($scope.airportsDeepDetails[airportCode]);
        }
        //airportsDeepDetailsGlobal=$scope.airportsDeepDetails;
        flightsGlobalContainers.setAirportsDeepDetailsGlobalParameter($scope.airportsDeepDetails);

    }


    $scope.getairportsindi=function(iatacode,isTitle){
        $scope.airportTitle=iatacode;


        var previouslyStoredAirportDeepDetails=flightsGlobalContainers.getFlightsGlobalContainersParameters().airportsDeepDetailsGlobal;

        if(Object.keys($scope.airportsDeepDetails).length==0){
            $scope.airportsDeepDetails=previouslyStoredAirportDeepDetails;
        }

        if(isTitle==1){
            return $scope.airportsDeepDetails[iatacode].name;
        }

        else{
            return '<div style="width: 300px">'+$scope.airportsDeepDetails[iatacode].name+ '<br/><br/> '+$scope.airportsDeepDetails[iatacode].countryName+ ' '+$scope.airportsDeepDetails[iatacode].city+ ' Region -  '+$scope.airportsDeepDetails[iatacode].regionName + '<br/><br/>Local Time  '+ $scope.airportsDeepDetails[iatacode].localTime+'<br/><br/><button class="btn btn-default"><a href="http://maps.google.com/maps?q='+$scope.airportsDeepDetails[iatacode].latitude+','+$scope.airportsDeepDetails[iatacode].longitude+'" target=_blank > Map It </a></button></div>';
        }

    }

    var getFlightFromGivenParameters=function(source,destination,leavingdate,comingindate,contype,numberofdays){
        console.log("Another Web Request with URL "+BASE_URL+"flightsearchapi.php?source="+source+"&destination="+destination+"&leavingdate="+leavingdate+"&comingindate="+comingindate+"&numberofdays="+numberofdays+"&connectiontype="+contype+"&airlinepreferred="+flightsGlobalParameters.getFlightSearchParameters().preferredAirlinesName);
        var start = new Date().getTime();
        $http({method: 'GET', url: BASE_URL+'flightsearchapi.php?source='+source+"&destination="+destination+"&leavingdate="+leavingdate+"&comingindate="+comingindate+"&numberofdays="+numberofdays+"&connectiontype="+contype+"&airlinepreferred="+flightsGlobalParameters.getFlightSearchParameters().preferredAirlinesName,
            params: {}
        }).
            success(function(flightslist, status, headers, config) {

                if(flightslist.flights){
                    //appendixDictionary=flightslist.appendix;
                    flightsGlobalContainers.setAppendixDictionaryValueParameter(flightslist.appendix);

                    var prestoredAppendixInformation=flightsGlobalContainers.getFlightsGlobalContainersParameters().appendixDictionary;


                    if(typeof prestoredAppendixInformation !='undefined' && prestoredAppendixInformation!=null){
                        if(prestoredAppendixInformation.airlines.length>0){
                            prestoredAppendixInformation.airlines.unshift(getSampleAllAirlinesObject());
                            $scope.airlines=prestoredAppendixInformation.airlines;
                            $scope.airline=$scope.airlines[0];
                        }
                        if(prestoredAppendixInformation.airports.length>0){
                            $scope.airports=prestoredAppendixInformation.airports;
                            addToAirportDetails(prestoredAppendixInformation.airports);
                        }
                        if(prestoredAppendixInformation.equipments.length>0){
                            $scope.equipments=prestoredAppendixInformation.equipments;
                        }
                    }
                    setupPageWithAllFlightDetails(flightslist.flights);

                    $timeout(function () {

                        $('div[id^="connectiondetails-"]').hide();

                    },0.0);
                    //We are doing it only once for each web request - New web request mean flushing of previous data and overlapping it with new one
                    // if(!localStorage.getItem("recentlyReturnedFlightData")){
                    localStorage.setItem('recentlyReturnedFlightData',JSON.stringify(flightslist.flights));
                    localStorage.setItem('airlines',JSON.stringify(prestoredAppendixInformation.airlines));
                    localStorage.setItem('airports',JSON.stringify(prestoredAppendixInformation.airports));
                    localStorage.setItem('equipments',JSON.stringify(prestoredAppendixInformation.equipments));
                    //}
                    var end = new Date().getTime();
                    var time = end - start;
                    console.log('Execution time: ' + time);
                }
                else{
                    if(flightslist.error){
                        $scope.errors=[{"name":flightslist.error.errorMessage,"code":flightslist.error.httpStatusCode,"codemessage":flightslist.error.errorCode,"resolution":"Wait for some more time","gobacklink":"#/flightsearch"}];
                    }
                    else{
                        $scope.errors=[{"name":"No results found","code":"404","resolution":"Try with different source and destinations","gobacklink":"#/flightsearch"}];
                    }
                    $scope.loadingToDisplay=false;
                }
            }).
            error(function(data, status, headers, config) {
                console.log(status+ "  &&&hahahahaha");
            });
    }




    //getParameteresDictionary=$location.search();

    flightsGlobalContainers.setGetParameteresDictionaryValueParameter($location.search());

    if(localStorage.getItem("recentlyReturnedFlightData")){

        flightsGlobalContainers.setAllFlightsDetailValueParameter(JSON.parse(localStorage.getItem("recentlyReturnedFlightData")));
        $scope.airlines=JSON.parse(localStorage.getItem('airlines'));

        //to remove - We are adding all airlines twice just to be safe because we already have cached data in we didnt propogate changes to it
        $scope.airlines.unshift(getSampleAllAirlinesObject());
        $scope.airline=$scope.airlines[0];
        $scope.airports	=JSON.parse(localStorage.getItem('airports'));
        addToAirportDetails($scope.airports);
        $scope.equipments=JSON.parse(localStorage.getItem('equipments'));

        setupPageWithAllFlightDetails(flightsGlobalContainers.getFlightsGlobalContainersParameters().allFlightsDetail);
    }
    else{
        var previouslyStoredAllFlightDetails=flightsGlobalContainers.getFlightsGlobalContainersParameters().allFlightsDetail;

        if(previouslyStoredAllFlightDetails.length==0){

            getFlightFromGivenParameters(flightsGlobalContainers.getFlightsGlobalContainersParameters().getParameteresDictionary.source,flightsGlobalContainers.getFlightsGlobalContainersParameters().getParameteresDictionary.destination,flightsGlobalContainers.getFlightsGlobalContainersParameters().getParameteresDictionary.leavingdate,flightsGlobalContainers.getFlightsGlobalContainersParameters().getParameteresDictionary.comingindate,flightsGlobalParameters.getFlightSearchParameters().connectionType,flightsGlobalParameters.getFlightSearchParameters().numberOfDaysToRetrieveFlight);
        }
    }


    $timeout(function () {

        $('div[id^="connectiondetails-"]').hide();

    },0.0);

});