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


airlinetravelmodule.controller('MyCtrl1', function($scope){

});

var allFlightsDetail=Array();
var appendixDictionary={};
var totalPagesCount=Array();
var totalP;

airlinetravelmodule.controller('DetailController',function($scope,$routeParams){

    $scope.totalPages=Array();
    for(var i=0;i<totalP;i++){
        $scope.totalPages.push(i);
    }

    //console.log($routeParams.id*10+ " id "+ (parseInt($routeParams.id)*10+9));

    $scope.flightDetails = allFlightsDetail.slice($routeParams.id,parseInt($routeParams.id)+9);
    console.log($scope.flightDetails.length);
})

Array.prototype.clear = function() {
    while (this.length > 0) {
        this.pop();
    }
};

airlinetravelmodule.controller('showflightscontroller',function($scope,$http,$routeParams){
    //var baseUrl='http://jayeshkawli.com/airlinetravel/airportsapi.php?';
   // baseUrl=baseUrl+'searchString='+searchStringToPass;

    $scope.availableflightparameters="";
    $scope.numberOfResultsPerPage=10;

    var airline,airports;//=Array();
    var airlines=[{"name":"abs","iata":"xyz","icao":"asda"}];



    //console.log($routeParams.id+ " id "+ (parseInt($routeParams.id)+9));

    if(allFlightsDetail.length>0){
        console.log("yesss***");
        $scope.flightDetails = allFlightsDetail.slice($routeParams.id*10,parseInt($routeParams.id*10)+9);
    $scope.totalPages=totalPagesCount;
    $scope.airlines=appendixDictionary.airlines;
    $scope.airports=appendixDictionary.airports;
    $scope.equipments=appendixDictionary.equipments;
    console.log($scope.flightDetails.length);
    }

if(allFlightsDetail.length==0){
    $http({method: 'GET', url: 'http://jayeshkawli.com/airlinetravel/flightsearchapi.php',//?searchstring='+searchStringToPass+"&countryCode="+countryCode,
        params: {}
    }).
        success(function(flightslist, status, headers, config) {

            //$scope.flightdetails=flightslist;
            //airline=flightslist;
           console.log("noooooooo***");
            appendixDictionary=flightslist.appendix;
            $scope.airlines=appendixDictionary.airlines;
            $scope.airports=appendixDictionary.airports;
            $scope.equipments=appendixDictionary.equipments;
            totalP=Math.ceil(flightslist.flights.length/$scope.numberOfResultsPerPage);
            $scope.totalPages=Array();
            console.log(totalP+"&&");
            for(var i=0;i<totalP;i++){
               $scope.totalPages.push(i);
            }
            console.log(totalPagesCount+"&&");
            totalPagesCount=$scope.totalPages;
            allFlightsDetail=flightslist.flights;


            var airlineslisttodisplay="";

            for(airline in airlines){
                airlineslisttodisplay+="<div id='"+airlines[airline].icao+"'><a href='"+airlines[airline].iata+"'>"+airlines[airline].name+"</a></div><br/>";
            }
            $scope.flightDetails = allFlightsDetail.slice(0,9);
//console.log(airlineslisttodisplay);
         //   $scope.data=airlineslisttodisplay;

        }).
        error(function(data, status, headers, config) {
console.log("error");
        });
}
});

airlinetravelmodule.controller('flightsearchcontroller',function($scope,$http,$window){


    $(function(){
        var currencies = [{ data:'AD',value:'Andorra'},{ data:'AE',value:'United Arab Emirates'},{ data:'AF',value:'Afghanistan'},{ data:'AG',value:'Antigua and Barbuda'},{ data:'AI',value:'Anguilla'},{ data:'AL',value:'Albania'},{ data:'AM',value:'Armenia'},{ data:'AO',value:'Angola'},{ data:'AQ',value:'Antarctica'},{ data:'AR',value:'Argentina'},{ data:'AS',value:'American Samoa'},{ data:'AT',value:'Austria'},{ data:'AU',value:'Australia'},{ data:'AW',value:'Aruba'},{ data:'AX',value:'Åland Islands'},{ data:'AZ',value:'Azerbaijan'},{ data:'BA',value:'Bosnia and Herzegovina'},{ data:'BB',value:'Barbados'},{ data:'BD',value:'Bangladesh'},{ data:'BE',value:'Belgium'},{ data:'BF',value:'Burkina Faso'},{ data:'BG',value:'Bulgaria'},{ data:'BH',value:'Bahrain'},{ data:'BI',value:'Burundi'},{ data:'BJ',value:'Benin'},{ data:'BL',value:'Saint Barthélemy'},{ data:'BM',value:'Bermuda'},{ data:'BN',value:'Brunei Darussalam'},{ data:'BO',value:'Bolivia, Plurinational State of'},{ data:'BQ',value:'Bonaire, Sint Eustatius and Saba'},{ data:'BR',value:'Brazil'},{ data:'BS',value:'Bahamas'},{ data:'BT',value:'Bhutan'},{ data:'BV',value:'Bouvet Island'},{ data:'BW',value:'Botswana'},{ data:'BY',value:'Belarus'},{ data:'BZ',value:'Belize'},{ data:'CA',value:'Canada'},{ data:'CC',value:'Cocos (Keeling) Islands'},{ data:'CD',value:'Congo, the Democratic Republic of the'},{ data:'CF',value:'Central African Republic'},{ data:'CG',value:'Congo'},{ data:'CH',value:'Switzerland'},{ data:'CI',value:'Côte d Ivoire'},{ data:'CK',value:'Cook Islands'},{ data:'CL',value:'Chile'},{ data:'CM',value:'Cameroon'},{ data:'CN',value:'China'},{ data:'CO',value:'Colombia'},{ data:'CR',value:'Costa Rica'},{ data:'CU',value:'Cuba'},{ data:'CV',value:'Cape Verde'},{ data:'CW',value:'Curaçao'},{ data:'CX',value:'Christmas Island'},{ data:'CY',value:'Cyprus'},{ data:'CZ',value:'Czech Republic'},{ data:'DE',value:'Germany'},{ data:'DJ',value:'Djibouti'},{ data:'DK',value:'Denmark'},{ data:'DM',value:'Dominica'},{ data:'DO',value:'Dominican Republic'},{ data:'DZ',value:'Algeria'},{ data:'EC',value:'Ecuador'},{ data:'EE',value:'Estonia'},{ data:'EG',value:'Egypt'},{ data:'EH',value:'Western Sahara'},{ data:'ER',value:'Eritrea'},{ data:'ES',value:'Spain'},{ data:'ET',value:'Ethiopia'},{ data:'FI',value:'Finland'},{ data:'FJ',value:'Fiji'},{ data:'FK',value:'Falkland Islands (Malvinas)'},{ data:'FM',value:'Micronesia, Federated States of'},{ data:'FO',value:'Faroe Islands'},{ data:'FR',value:'France'},{ data:'GA',value:'Gabon'},{ data:'GB',value:'United Kingdom'},{ data:'GD',value:'Grenada'},{ data:'GE',value:'Georgia'},{ data:'GF',value:'French Guiana'},{ data:'GG',value:'Guernsey'},{ data:'GH',value:'Ghana'},{ data:'GI',value:'Gibraltar'},{ data:'GL',value:'Greenland'},{ data:'GM',value:'Gambia'},{ data:'GN',value:'Guinea'},{ data:'GP',value:'Guadeloupe'},{ data:'GQ',value:'Equatorial Guinea'},{ data:'GR',value:'Greece'},{ data:'GS',value:'South Georgia and the South Sandwich Islands'},{ data:'GT',value:'Guatemala'},{ data:'GU',value:'Guam'},{ data:'GW',value:'Guinea-Bissau'},{ data:'GY',value:'Guyana'},{ data:'HK',value:'Hong Kong'},{ data:'HM',value:'Heard Island and McDonald Islands'},{ data:'HN',value:'Honduras'},{ data:'HR',value:'Croatia'},{ data:'HT',value:'Haiti'},{ data:'HU',value:'Hungary'},{ data:'ID',value:'Indonesia'},{ data:'IE',value:'Ireland'},{ data:'IL',value:'Israel'},{ data:'IM',value:'Isle of Man'},{ data:'IN',value:'India'},{ data:'IO',value:'British Indian Ocean Territory'},{ data:'IQ',value:'Iraq'},{ data:'IR',value:'Iran, Islamic Republic of'},{ data:'IS',value:'Iceland'},{ data:'IT',value:'Italy'},{ data:'JE',value:'Jersey'},{ data:'JM',value:'Jamaica'},{ data:'JO',value:'Jordan'},{ data:'JP',value:'Japan'},{ data:'KE',value:'Kenya'},{ data:'KG',value:'Kyrgyzstan'},{ data:'KH',value:'Cambodia'},{ data:'KI',value:'Kiribati'},{ data:'KM',value:'Comoros'},{ data:'KN',value:'Saint Kitts and Nevis'},{ data:'KP',value:'Korea, Democratic Peoples Republic of'},{ data:'KR',value:'Korea, Republic of'},{ data:'KW',value:'Kuwait'},{ data:'KY',value:'Cayman Islands'},{ data:'KZ',value:'Kazakhstan'},{ data:'LA',value:'Lao Peoples Democratic Republic'},{ data:'LB',value:'Lebanon'},{ data:'LC',value:'Saint Lucia'},{ data:'LI',value:'Liechtenstein'},{ data:'LK',value:'Sri Lanka'},{ data:'LR',value:'Liberia'},{ data:'LS',value:'Lesotho'},{ data:'LT',value:'Lithuania'},{ data:'LU',value:'Luxembourg'},{ data:'LV',value:'Latvia'},{ data:'LY',value:'Libya'},{ data:'MA',value:'Morocco'},{ data:'MC',value:'Monaco'},{ data:'MD',value:'Moldova, Republic of'},{ data:'ME',value:'Montenegro'},{ data:'MF',value:'Saint Martin (French part)'},{ data:'MG',value:'Madagascar'},{ data:'MH',value:'Marshall Islands'},{ data:'MK',value:'Macedonia, the former Yugoslav Republic of'},{ data:'ML',value:'Mali'},{ data:'MM',value:'Myanmar'},{ data:'MN',value:'Mongolia'},{ data:'MO',value:'Macao'},{ data:'MP',value:'Northern Mariana Islands'},{ data:'MQ',value:'Martinique'},{ data:'MR',value:'Mauritania'},{ data:'MS',value:'Montserrat'},{ data:'MT',value:'Malta'},{ data:'MU',value:'Mauritius'},{ data:'MV',value:'Maldives'},{ data:'MW',value:'Malawi'},{ data:'MX',value:'Mexico'},{ data:'MY',value:'Malaysia'},{ data:'MZ',value:'Mozambique'},{ data:'NA',value:'Namibia'},{ data:'NC',value:'New Caledonia'},{ data:'NE',value:'Niger'},{ data:'NF',value:'Norfolk Island'},{ data:'NG',value:'Nigeria'},{ data:'NI',value:'Nicaragua'},{ data:'NL',value:'Netherlands'},{ data:'NO',value:'Norway'},{ data:'NP',value:'Nepal'},{ data:'NR',value:'Nauru'},{ data:'NU',value:'Niue'},{ data:'NZ',value:'New Zealand'},{ data:'OM',value:'Oman'},{ data:'PA',value:'Panama'},{ data:'PE',value:'Peru'},{ data:'PF',value:'French Polynesia'},{ data:'PG',value:'Papua New Guinea'},{ data:'PH',value:'Philippines'},{ data:'PK',value:'Pakistan'},{ data:'PL',value:'Poland'},{ data:'PM',value:'Saint Pierre and Miquelon'},{ data:'PN',value:'Pitcairn'},{ data:'PR',value:'Puerto Rico'},{ data:'PS',value:'Palestine, State of'},{ data:'PT',value:'Portugal'},{ data:'PW',value:'Palau'},{ data:'PY',value:'Paraguay'},{ data:'QA',value:'Qatar'},{ data:'RE',value:'Réunion'},{ data:'RO',value:'Romania'},{ data:'RS',value:'Serbia'},{ data:'RU',value:'Russian Federation'},{ data:'RW',value:'Rwanda'},{ data:'SA',value:'Saudi Arabia'},{ data:'SB',value:'Solomon Islands'},{ data:'SC',value:'Seychelles'},{ data:'SD',value:'Sudan'},{ data:'SE',value:'Sweden'},{ data:'SG',value:'Singapore'},{ data:'SH',value:'Saint Helena, Ascension and Tristan da Cunha'},{ data:'SI',value:'Slovenia'},{ data:'SJ',value:'Svalbard and Jan Mayen'},{ data:'SK',value:'Slovakia'},{ data:'SL',value:'Sierra Leone'},{ data:'SM',value:'San Marino'},{ data:'SN',value:'Senegal'},{ data:'SO',value:'Somalia'},{ data:'SR',value:'Suriname'},{ data:'SS',value:'South Sudan'},{ data:'ST',value:'Sao Tome and Principe'},{ data:'SV',value:'El Salvador'},{ data:'SX',value:'Sint Maarten (Dutch part)'},{ data:'SY',value:'Syrian Arab Republic'},{ data:'SZ',value:'Swaziland'},{ data:'TC',value:'Turks and Caicos Islands'},{ data:'TD',value:'Chad'},{ data:'TF',value:'French Southern Territories'},{ data:'TG',value:'Togo'},{ data:'TH',value:'Thailand'},{ data:'TJ',value:'Tajikistan'},{ data:'TK',value:'Tokelau'},{ data:'TL',value:'Timor-Leste'},{ data:'TM',value:'Turkmenistan'},{ data:'TN',value:'Tunisia'},{ data:'TO',value:'Tonga'},{ data:'TR',value:'Turkey'},{ data:'TT',value:'Trinidad and Tobago'},{ data:'TV',value:'Tuvalu'},{ data:'TW',value:'Taiwan, Province of China'},{ data:'TZ',value:'Tanzania, United Republic of'},{ data:'UA',value:'Ukraine'},{ data:'UG',value:'Uganda'},{ data:'UM',value:'United States Minor Outlying Islands'},{ data:'US',value:'United States'},{ data:'UY',value:'Uruguay'},{ data:'UZ',value:'Uzbekistan'},{ data:'VA',value:'Holy See (Vatican City State)'},{ data:'VC',value:'Saint Vincent and the Grenadines'},{ data:'VE',value:'Venezuela, Bolivarian Republic of'},{ data:'VG',value:'Virgin Islands, British'},{ data:'VI',value:'Virgin Islands, U.S.'},{ data:'VN',value:'Viet Nam'},{ data:'VU',value:'Vanuatu'},{ data:'WF',value:'Wallis and Futuna'},{ data:'WS',value:'Samoa'},{ data:'YE',value:'Yemen'},{ data:'YT',value:'Mayotte'},{ data:'ZA',value:'South Africa'},{ data:'ZM',value:'Zambia'},{ data:'ZW',value:'Zimbabwe'}];

        // setup autocomplete function pulling from currencies[] array
        $('#autocomplete1').autocomplete({
            lookup: currencies,
            onSelect: function (suggestion) {
sourcecode= suggestion.data;
            }
        });
        $('#autocomplete').autocomplete({
            lookup: currencies,
            onSelect: function (suggestion) {
                destcode= suggestion.data;
            }
        });



    });

    $scope.movies = [""];

    // gives another movie array on change
    /*$scope.updateMovies = function(typed){
        // MovieRetriever could be some service returning a promise
        // $scope.newmovies = MovieRetriever.getmovies(typed);
        // $scope.newmovies.then(function(data){
        //  $scope.movies = data;
        //});
    }*/
    var isSource=true;
    var sourcecode="";
    var destcode="";
    $scope.sourcevisible=false;
    $scope.destinationvisible=false;
    $scope.firstClassButtonClicked=false;
    $scope.businessClassButtonClicked=false;
    $scope.economyClassButtonClicked=true;
    $scope.whichAirline=true;
    $scope.isVisibleReturningDate=false;
    $scope.searchByPrice=true;
    $scope.searchByVariableDates=false;
    $scope.searchBySpecificDates=false;
    $scope.is
    /* parameters to be sent to database */
    var tripDirection="Oneway";
    var travelType="Domestic";
    var whichAirline="My Airline";
    var travelClass="Economy Class";
    var searchCriteria="Price";


    $scope.numberAdult=[{number:'1'},{number:'2'},{number:'3'},{number:'4'},{number:'5'}];
    $scope.numberChildren=[{number:'0'},{number:'1'},{number:'2'},{number:'3'},{number:'4'},{number:'5'}];
    $scope.numberOfAdults=$scope.numberAdult[0];
    $scope.numberOfInfants=$scope.numberOfChildren=$scope.numberChildren[0];


    $scope.whichAirline=function(){
        whichAirline="My Airline";
    }

    $scope.isRoundTrip=function(val){
        if(val==0){
            tripDirection="OneWay";
            $scope.isVisibleReturningDate=false;
        }
        else if(val==1){
            tripDirection="Round Trip";
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

    $scope.bookNowPressed=function(){
       /* tripDirection="Oneway";
        var travelType="Domestic";
        var whichAirline="My Airline";
        var travelClass="Economy Class";
        var searchCriteria="Price";*/
allFlightsDetail.clear();
        if(typeof searchCriteria =="undefined"){
            searchCriteria="Price";
        }
        if(typeof  $scope.comingIn=="undefined"){
            $scope.comingIn="N/A";
        }
        console.log(tripDirection);
        console.log(travelType);
        console.log(sourcecode);
        console.log(destcode);
        console.log($scope.searchStringSource);
        console.log($scope.searchStringDestination);
        console.log($scope.leavingOut);
        console.log($scope.comingIn);
        console.log($scope.numberOfAdults.number);
        console.log($scope.numberOfChildren.number);
        console.log($scope.numberOfInfants.number);
        console.log(travelClass);
        console.log(whichAirline);
        console.log(searchCriteria);
        var formData = {
            'tripdirection' 				: tripDirection,
            'travelType':travelType,
            'sourcecode':sourcecode,
            'destcode':destcode,
            'sourceairport':$scope.searchStringSource,
        'destairport':$scope.searchStringDestination,
            'leavingout':$scope.leavingOut,
            'comingin':$scope.comingIn,
            'numadults':$scope.numberOfAdults.number,
                'numchildren':$scope.numberOfChildren.number,
        'numinfants':$scope.numberOfInfants.number,
            'travelclass':travelClass,
            'travelAirline':whichAirline,
            'serachcriteria':searchCriteria
        };

        $http({
            url: 'http://localhost:9000/airlinetravel/flightdetailsinsert.php',
            method: "GET",
            cache:true,
            params: formData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
                console.log(data);
                $window.location.href = '#/showavailableflights/0';

            }).error(function (data, status, headers, config) {
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
            $scope.searchByVariableDates=true;
        }
        else if (val==3){
            searchCriteria="Specific Dates";
            $scope.searchBySpecificDates=true;

        }
    }
    $scope.isFlightButtonClicked=true;
    $scope.whichClassButtonClicked=true;

    $scope.isDomestic=true;


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
            console.log("indeed");
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
            console.log("source");
            $scope.sourcevisible=true;
            searchStringToPass=$scope.searchStringSource;
            countryCode=document.getElementById('autocomplete1').value;
        }

        else if(typeof $scope.searchStringDestination !== "undefined" && isSource==false){
            console.log("destination");
            $scope.destinationvisible=true;
            searchStringToPass=$scope.searchStringDestination;
            countryCode=document.getElementById('autocomplete').value;
        }
if(typeof countryCode ==="undefined"){
    countryCode="";
}
         var baseUrl='http://jayeshkawli.com/airlinetravel/airportsapi.php?';



        baseUrl=baseUrl+'searchString='+searchStringToPass;


        $http({method: 'GET', url: 'http://jayeshkawli.com/airlinetravel/airportsapi.php?searchstring='+searchStringToPass+"&countryCode="+countryCode,
             params: {}
        }).
            success(function(airportslist, status, headers, config) {

                $scope.sourcevisible=false;

                $scope.destinationvisible=false;



                $scope.movies=airportslist;
                $scope.sam="";
                if (airportslist instanceof Array){
               // for(var airports in airportslist){
                  //  console.log(airportslist[airports]);
               // }
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
