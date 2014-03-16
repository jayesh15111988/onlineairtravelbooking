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
var bookbuttontitletext='Book Now';
var getParameteresDictionary;
var travelDetails={};

airlinetravelmodule.controller('DetailController',function($scope,$routeParams){

  /*  $scope.totalPages=Array();
    for(var i=0;i<totalP;i++){
        $scope.totalPages.push(i);
    }*/
$scope.fullTravelDetails=travelDetails;

    //console.log($routeParams.id*10+ " id "+ (parseInt($routeParams.id)*10+9));

//    $scope.flightDetails = allFlightsDetail.slice($routeParams.id,parseInt($routeParams.id)+9);
    //console.log($scope.flightDetails.length);
})

Array.prototype.clear = function() {
    while (this.length > 0) {
        this.pop();
    }
};

airlinetravelmodule.controller('showflightscontroller',function($scope,$http,$routeParams,$location){
    //var baseUrl='http://jayeshkawli.com/airlinetravel/airportsapi.php?';
   // baseUrl=baseUrl+'searchString='+searchStringToPass;

    $scope.availableflightparameters="";
    $scope.numberOfResultsPerPage=10;
    $scope.departureDate='';
    var airline,airports;//=Array();
    var airlines=Array();//[{"name":"abs","iata":"xyz","icao":"asda"}];




    //console.log($routeParams.id+ " id "+ (parseInt($routeParams.id)+9));

   // console.log(get('source')+"babab");
    if(allFlightsDetail.length>0){
     //   console.log("yesss***");
        //source destination leavingdate comingindate direction
        $scope.flightDetails = allFlightsDetail.slice($routeParams.id*10,parseInt($routeParams.id*10)+9);
    $scope.bookbuttontitle=bookbuttontitletext;
        $scope.totalPages=totalPagesCount;
    $scope.airlines=appendixDictionary.airlines;
    $scope.airports=appendixDictionary.airports;
    $scope.equipments=appendixDictionary.equipments;
    console.log($scope.flightDetails.length);
    }

    var getFlightFromGivenParameters=function(source,destination,leavingdate,comingindate){
        $http({method: 'GET', url: 'http://jayeshkawli.com/airlinetravel/flightsearchapi.php?source='+source+"&destination="+destination+"&leavingdate="+leavingdate+"&comingindate="+comingindate,
            params: {}
        }).
            success(function(flightslist, status, headers, config) {
               console.log(flightslist.flights+ "final result");
                if(flightslist.flights){
                appendixDictionary=flightslist.appendix;
                // console.log(appendixDictionary);
                if(typeof appendixDictionary !='undefined' && appendixDictionary!=null){
                    if(appendixDictionary.airlines.length>0){
                        $scope.airlines=appendixDictionary.airlines;
                    }
                    if(appendixDictionary.airports.length>0){
                        $scope.airports=appendixDictionary.airports;
                    }
                    if(appendixDictionary.equipments.length>0){
                        $scope.equipments=appendixDictionary.equipments;
                    }
                }
                totalP=Math.ceil(flightslist.flights.length/$scope.numberOfResultsPerPage);
                $scope.totalPages=Array();
                for(var i=0;i<totalP;i++){
                    $scope.totalPages.push(i);
                }
                $scope.bookbuttontitle=bookbuttontitletext;
                totalPagesCount=$scope.totalPages;
                $scope.departureDate=leavingdate;
                allFlightsDetail=flightslist.flights;

                console.log(allFlightsDetail.departureDate+ " this is leaving ");
                $scope.flightDetails = allFlightsDetail.slice(0,9);
                }
                else{
                    if(flightslist.error){
                        $scope.errors=[{"name":flightslist.error.errorMessage,"code":flightslist.error.httpStatusCode,"codemessage":flightslist.error.errorCode,"resolution":"Wait for some more time","gobacklink":"#/flightsearch"}];
                    }
                    else{
                    $scope.errors=[{"name":"No results found","code":"404","resolution":"Try with different source and destinations","gobacklink":"#/flightsearch"}];
                    }
                }
            }).
            error(function(data, status, headers, config) {
                console.log(status+ "  &&&hahahahaha");
            });
    }

$scope.bookorgotoreturingflights=function(index){



if($scope.bookbuttontitle=="Book Now"){

    travelDetails.arrivalDetails=allFlightsDetail[index];
var numberOfKeys=Object.keys(travelDetails).length;
if(numberOfKeys==2){
    console.log("two way flight")
}
    else if(numberOfKeys==1){
    console.log("One way flight this is");
}
    //console.log(Object.keys(travelDetails).length+ " aaarrival");
}
    else if($scope.bookbuttontitle=="Select Returning Flight"){
bookbuttontitletext="Book Now";
    console.log(index +"departure");
    travelDetails.departureDetails=allFlightsDetail[index];
    console.log(travelDetails.departureDetails+ "departure");
    allFlightsDetail.clear();
    getFlightFromGivenParameters(getParameteresDictionary.destination,getParameteresDictionary.source,getParameteresDictionary.comingindate,getParameteresDictionary.leavingdate);

}
}

    getParameteresDictionary=$location.search();
if(allFlightsDetail.length==0){

    getFlightFromGivenParameters(getParameteresDictionary.source,getParameteresDictionary.destination,getParameteresDictionary.leavingdate,getParameteresDictionary.comingindate);
}



});

airlinetravelmodule.controller('flightsearchcontroller',function($scope,$http,$window){


    $(function(){
        //var currencies = [{ data:'AD',value:'Andorra'},{ data:'AE',value:'United Arab Emirates'},{ data:'AF',value:'Afghanistan'},{ data:'AG',value:'Antigua and Barbuda'},{ data:'AI',value:'Anguilla'},{ data:'AL',value:'Albania'},{ data:'AM',value:'Armenia'},{ data:'AO',value:'Angola'},{ data:'AQ',value:'Antarctica'},{ data:'AR',value:'Argentina'},{ data:'AS',value:'American Samoa'},{ data:'AT',value:'Austria'},{ data:'AU',value:'Australia'},{ data:'AW',value:'Aruba'},{ data:'AX',value:'Åland Islands'},{ data:'AZ',value:'Azerbaijan'},{ data:'BA',value:'Bosnia and Herzegovina'},{ data:'BB',value:'Barbados'},{ data:'BD',value:'Bangladesh'},{ data:'BE',value:'Belgium'},{ data:'BF',value:'Burkina Faso'},{ data:'BG',value:'Bulgaria'},{ data:'BH',value:'Bahrain'},{ data:'BI',value:'Burundi'},{ data:'BJ',value:'Benin'},{ data:'BL',value:'Saint Barthélemy'},{ data:'BM',value:'Bermuda'},{ data:'BN',value:'Brunei Darussalam'},{ data:'BO',value:'Bolivia, Plurinational State of'},{ data:'BQ',value:'Bonaire, Sint Eustatius and Saba'},{ data:'BR',value:'Brazil'},{ data:'BS',value:'Bahamas'},{ data:'BT',value:'Bhutan'},{ data:'BV',value:'Bouvet Island'},{ data:'BW',value:'Botswana'},{ data:'BY',value:'Belarus'},{ data:'BZ',value:'Belize'},{ data:'CA',value:'Canada'},{ data:'CC',value:'Cocos (Keeling) Islands'},{ data:'CD',value:'Congo, the Democratic Republic of the'},{ data:'CF',value:'Central African Republic'},{ data:'CG',value:'Congo'},{ data:'CH',value:'Switzerland'},{ data:'CI',value:'Côte d Ivoire'},{ data:'CK',value:'Cook Islands'},{ data:'CL',value:'Chile'},{ data:'CM',value:'Cameroon'},{ data:'CN',value:'China'},{ data:'CO',value:'Colombia'},{ data:'CR',value:'Costa Rica'},{ data:'CU',value:'Cuba'},{ data:'CV',value:'Cape Verde'},{ data:'CW',value:'Curaçao'},{ data:'CX',value:'Christmas Island'},{ data:'CY',value:'Cyprus'},{ data:'CZ',value:'Czech Republic'},{ data:'DE',value:'Germany'},{ data:'DJ',value:'Djibouti'},{ data:'DK',value:'Denmark'},{ data:'DM',value:'Dominica'},{ data:'DO',value:'Dominican Republic'},{ data:'DZ',value:'Algeria'},{ data:'EC',value:'Ecuador'},{ data:'EE',value:'Estonia'},{ data:'EG',value:'Egypt'},{ data:'EH',value:'Western Sahara'},{ data:'ER',value:'Eritrea'},{ data:'ES',value:'Spain'},{ data:'ET',value:'Ethiopia'},{ data:'FI',value:'Finland'},{ data:'FJ',value:'Fiji'},{ data:'FK',value:'Falkland Islands (Malvinas)'},{ data:'FM',value:'Micronesia, Federated States of'},{ data:'FO',value:'Faroe Islands'},{ data:'FR',value:'France'},{ data:'GA',value:'Gabon'},{ data:'GB',value:'United Kingdom'},{ data:'GD',value:'Grenada'},{ data:'GE',value:'Georgia'},{ data:'GF',value:'French Guiana'},{ data:'GG',value:'Guernsey'},{ data:'GH',value:'Ghana'},{ data:'GI',value:'Gibraltar'},{ data:'GL',value:'Greenland'},{ data:'GM',value:'Gambia'},{ data:'GN',value:'Guinea'},{ data:'GP',value:'Guadeloupe'},{ data:'GQ',value:'Equatorial Guinea'},{ data:'GR',value:'Greece'},{ data:'GS',value:'South Georgia and the South Sandwich Islands'},{ data:'GT',value:'Guatemala'},{ data:'GU',value:'Guam'},{ data:'GW',value:'Guinea-Bissau'},{ data:'GY',value:'Guyana'},{ data:'HK',value:'Hong Kong'},{ data:'HM',value:'Heard Island and McDonald Islands'},{ data:'HN',value:'Honduras'},{ data:'HR',value:'Croatia'},{ data:'HT',value:'Haiti'},{ data:'HU',value:'Hungary'},{ data:'ID',value:'Indonesia'},{ data:'IE',value:'Ireland'},{ data:'IL',value:'Israel'},{ data:'IM',value:'Isle of Man'},{ data:'IN',value:'India'},{ data:'IO',value:'British Indian Ocean Territory'},{ data:'IQ',value:'Iraq'},{ data:'IR',value:'Iran, Islamic Republic of'},{ data:'IS',value:'Iceland'},{ data:'IT',value:'Italy'},{ data:'JE',value:'Jersey'},{ data:'JM',value:'Jamaica'},{ data:'JO',value:'Jordan'},{ data:'JP',value:'Japan'},{ data:'KE',value:'Kenya'},{ data:'KG',value:'Kyrgyzstan'},{ data:'KH',value:'Cambodia'},{ data:'KI',value:'Kiribati'},{ data:'KM',value:'Comoros'},{ data:'KN',value:'Saint Kitts and Nevis'},{ data:'KP',value:'Korea, Democratic Peoples Republic of'},{ data:'KR',value:'Korea, Republic of'},{ data:'KW',value:'Kuwait'},{ data:'KY',value:'Cayman Islands'},{ data:'KZ',value:'Kazakhstan'},{ data:'LA',value:'Lao Peoples Democratic Republic'},{ data:'LB',value:'Lebanon'},{ data:'LC',value:'Saint Lucia'},{ data:'LI',value:'Liechtenstein'},{ data:'LK',value:'Sri Lanka'},{ data:'LR',value:'Liberia'},{ data:'LS',value:'Lesotho'},{ data:'LT',value:'Lithuania'},{ data:'LU',value:'Luxembourg'},{ data:'LV',value:'Latvia'},{ data:'LY',value:'Libya'},{ data:'MA',value:'Morocco'},{ data:'MC',value:'Monaco'},{ data:'MD',value:'Moldova, Republic of'},{ data:'ME',value:'Montenegro'},{ data:'MF',value:'Saint Martin (French part)'},{ data:'MG',value:'Madagascar'},{ data:'MH',value:'Marshall Islands'},{ data:'MK',value:'Macedonia, the former Yugoslav Republic of'},{ data:'ML',value:'Mali'},{ data:'MM',value:'Myanmar'},{ data:'MN',value:'Mongolia'},{ data:'MO',value:'Macao'},{ data:'MP',value:'Northern Mariana Islands'},{ data:'MQ',value:'Martinique'},{ data:'MR',value:'Mauritania'},{ data:'MS',value:'Montserrat'},{ data:'MT',value:'Malta'},{ data:'MU',value:'Mauritius'},{ data:'MV',value:'Maldives'},{ data:'MW',value:'Malawi'},{ data:'MX',value:'Mexico'},{ data:'MY',value:'Malaysia'},{ data:'MZ',value:'Mozambique'},{ data:'NA',value:'Namibia'},{ data:'NC',value:'New Caledonia'},{ data:'NE',value:'Niger'},{ data:'NF',value:'Norfolk Island'},{ data:'NG',value:'Nigeria'},{ data:'NI',value:'Nicaragua'},{ data:'NL',value:'Netherlands'},{ data:'NO',value:'Norway'},{ data:'NP',value:'Nepal'},{ data:'NR',value:'Nauru'},{ data:'NU',value:'Niue'},{ data:'NZ',value:'New Zealand'},{ data:'OM',value:'Oman'},{ data:'PA',value:'Panama'},{ data:'PE',value:'Peru'},{ data:'PF',value:'French Polynesia'},{ data:'PG',value:'Papua New Guinea'},{ data:'PH',value:'Philippines'},{ data:'PK',value:'Pakistan'},{ data:'PL',value:'Poland'},{ data:'PM',value:'Saint Pierre and Miquelon'},{ data:'PN',value:'Pitcairn'},{ data:'PR',value:'Puerto Rico'},{ data:'PS',value:'Palestine, State of'},{ data:'PT',value:'Portugal'},{ data:'PW',value:'Palau'},{ data:'PY',value:'Paraguay'},{ data:'QA',value:'Qatar'},{ data:'RE',value:'Réunion'},{ data:'RO',value:'Romania'},{ data:'RS',value:'Serbia'},{ data:'RU',value:'Russian Federation'},{ data:'RW',value:'Rwanda'},{ data:'SA',value:'Saudi Arabia'},{ data:'SB',value:'Solomon Islands'},{ data:'SC',value:'Seychelles'},{ data:'SD',value:'Sudan'},{ data:'SE',value:'Sweden'},{ data:'SG',value:'Singapore'},{ data:'SH',value:'Saint Helena, Ascension and Tristan da Cunha'},{ data:'SI',value:'Slovenia'},{ data:'SJ',value:'Svalbard and Jan Mayen'},{ data:'SK',value:'Slovakia'},{ data:'SL',value:'Sierra Leone'},{ data:'SM',value:'San Marino'},{ data:'SN',value:'Senegal'},{ data:'SO',value:'Somalia'},{ data:'SR',value:'Suriname'},{ data:'SS',value:'South Sudan'},{ data:'ST',value:'Sao Tome and Principe'},{ data:'SV',value:'El Salvador'},{ data:'SX',value:'Sint Maarten (Dutch part)'},{ data:'SY',value:'Syrian Arab Republic'},{ data:'SZ',value:'Swaziland'},{ data:'TC',value:'Turks and Caicos Islands'},{ data:'TD',value:'Chad'},{ data:'TF',value:'French Southern Territories'},{ data:'TG',value:'Togo'},{ data:'TH',value:'Thailand'},{ data:'TJ',value:'Tajikistan'},{ data:'TK',value:'Tokelau'},{ data:'TL',value:'Timor-Leste'},{ data:'TM',value:'Turkmenistan'},{ data:'TN',value:'Tunisia'},{ data:'TO',value:'Tonga'},{ data:'TR',value:'Turkey'},{ data:'TT',value:'Trinidad and Tobago'},{ data:'TV',value:'Tuvalu'},{ data:'TW',value:'Taiwan, Province of China'},{ data:'TZ',value:'Tanzania, United Republic of'},{ data:'UA',value:'Ukraine'},{ data:'UG',value:'Uganda'},{ data:'UM',value:'United States Minor Outlying Islands'},{ data:'US',value:'United States'},{ data:'UY',value:'Uruguay'},{ data:'UZ',value:'Uzbekistan'},{ data:'VA',value:'Holy See (Vatican City State)'},{ data:'VC',value:'Saint Vincent and the Grenadines'},{ data:'VE',value:'Venezuela, Bolivarian Republic of'},{ data:'VG',value:'Virgin Islands, British'},{ data:'VI',value:'Virgin Islands, U.S.'},{ data:'VN',value:'Viet Nam'},{ data:'VU',value:'Vanuatu'},{ data:'WF',value:'Wallis and Futuna'},{ data:'WS',value:'Samoa'},{ data:'YE',value:'Yemen'},{ data:'YT',value:'Mayotte'},{ data:'ZA',value:'South Africa'},{ data:'ZM',value:'Zambia'},{ data:'ZW',value:'Zimbabwe'}];
        var currencies=[{ data:'AD',value:'Andorra - AD'},{ data:'AE',value:'United Arab Emirates - AE'},{ data:'AF',value:'Afghanistan - AF'},{ data:'AG',value:'Antigua and Barbuda - AG'},{ data:'AI',value:'Anguilla - AI'},{ data:'AL',value:'Albania - AL'},{ data:'AM',value:'Armenia - AM'},{ data:'AO',value:'Angola - AO'},{ data:'AQ',value:'Antarctica - AQ'},{ data:'AR',value:'Argentina - AR'},{ data:'AS',value:'American Samoa - AS'},{ data:'AT',value:'Austria - AT'},{ data:'AU',value:'Australia - AU'},{ data:'AW',value:'Aruba - AW'},{ data:'AX',value:'Åland Islands - AX'},{ data:'AZ',value:'Azerbaijan - AZ'},{ data:'BA',value:'Bosnia and Herzegovina - BA'},{ data:'BB',value:'Barbados - BB'},{ data:'BD',value:'Bangladesh - BD'},{ data:'BE',value:'Belgium - BE'},{ data:'BF',value:'Burkina Faso - BF'},{ data:'BG',value:'Bulgaria - BG'},{ data:'BH',value:'Bahrain - BH'},{ data:'BI',value:'Burundi - BI'},{ data:'BJ',value:'Benin - BJ'},{ data:'BL',value:'Saint Barthélemy - BL'},{ data:'BM',value:'Bermuda - BM'},{ data:'BN',value:'Brunei Darussalam - BN'},{ data:'BO',value:'Bolivia, Plurinational State of - BO'},{ data:'BQ',value:'Bonaire, Sint Eustatius and Saba - BQ'},{ data:'BR',value:'Brazil - BR'},{ data:'BS',value:'Bahamas - BS'},{ data:'BT',value:'Bhutan - BT'},{ data:'BV',value:'Bouvet Island - BV'},{ data:'BW',value:'Botswana - BW'},{ data:'BY',value:'Belarus - BY'},{ data:'BZ',value:'Belize - BZ'},{ data:'CA',value:'Canada - CA'},{ data:'CC',value:'Cocos (Keeling) Islands - CC'},{ data:'CD',value:'Congo, the Democratic Republic of the - CD'},{ data:'CF',value:'Central African Republic - CF'},{ data:'CG',value:'Congo - CG'},{ data:'CH',value:'Switzerland - CH'},{ data:'CI',value:'Côte dIvoire - CI'},{ data:'CK',value:'Cook Islands - CK'},{ data:'CL',value:'Chile - CL'},{ data:'CM',value:'Cameroon - CM'},{ data:'CN',value:'China - CN'},{ data:'CO',value:'Colombia - CO'},{ data:'CR',value:'Costa Rica - CR'},{ data:'CU',value:'Cuba - CU'},{ data:'CV',value:'Cape Verde - CV'},{ data:'CW',value:'Curaçao - CW'},{ data:'CX',value:'Christmas Island - CX'},{ data:'CY',value:'Cyprus - CY'},{ data:'CZ',value:'Czech Republic - CZ'},{ data:'DE',value:'Germany - DE'},{ data:'DJ',value:'Djibouti - DJ'},{ data:'DK',value:'Denmark - DK'},{ data:'DM',value:'Dominica - DM'},{ data:'DO',value:'Dominican Republic - DO'},{ data:'DZ',value:'Algeria - DZ'},{ data:'EC',value:'Ecuador - EC'},{ data:'EE',value:'Estonia - EE'},{ data:'EG',value:'Egypt - EG'},{ data:'EH',value:'Western Sahara - EH'},{ data:'ER',value:'Eritrea - ER'},{ data:'ES',value:'Spain - ES'},{ data:'ET',value:'Ethiopia - ET'},{ data:'FI',value:'Finland - FI'},{ data:'FJ',value:'Fiji - FJ'},{ data:'FK',value:'Falkland Islands (Malvinas) - FK'},{ data:'FM',value:'Micronesia, Federated States of - FM'},{ data:'FO',value:'Faroe Islands - FO'},{ data:'FR',value:'France - FR'},{ data:'GA',value:'Gabon - GA'},{ data:'GB',value:'United Kingdom - GB'},{ data:'GD',value:'Grenada - GD'},{ data:'GE',value:'Georgia - GE'},{ data:'GF',value:'French Guiana - GF'},{ data:'GG',value:'Guernsey - GG'},{ data:'GH',value:'Ghana - GH'},{ data:'GI',value:'Gibraltar - GI'},{ data:'GL',value:'Greenland - GL'},{ data:'GM',value:'Gambia - GM'},{ data:'GN',value:'Guinea - GN'},{ data:'GP',value:'Guadeloupe - GP'},{ data:'GQ',value:'Equatorial Guinea - GQ'},{ data:'GR',value:'Greece - GR'},{ data:'GS',value:'South Georgia and the South Sandwich Islands - GS'},{ data:'GT',value:'Guatemala - GT'},{ data:'GU',value:'Guam - GU'},{ data:'GW',value:'Guinea-Bissau - GW'},{ data:'GY',value:'Guyana - GY'},{ data:'HK',value:'Hong Kong - HK'},{ data:'HM',value:'Heard Island and McDonald Islands - HM'},{ data:'HN',value:'Honduras - HN'},{ data:'HR',value:'Croatia - HR'},{ data:'HT',value:'Haiti - HT'},{ data:'HU',value:'Hungary - HU'},{ data:'ID',value:'Indonesia - ID'},{ data:'IE',value:'Ireland - IE'},{ data:'IL',value:'Israel - IL'},{ data:'IM',value:'Isle of Man - IM'},{ data:'IN',value:'India - IN'},{ data:'IO',value:'British Indian Ocean Territory - IO'},{ data:'IQ',value:'Iraq - IQ'},{ data:'IR',value:'Iran, Islamic Republic of - IR'},{ data:'IS',value:'Iceland - IS'},{ data:'IT',value:'Italy - IT'},{ data:'JE',value:'Jersey - JE'},{ data:'JM',value:'Jamaica - JM'},{ data:'JO',value:'Jordan - JO'},{ data:'JP',value:'Japan - JP'},{ data:'KE',value:'Kenya - KE'},{ data:'KG',value:'Kyrgyzstan - KG'},{ data:'KH',value:'Cambodia - KH'},{ data:'KI',value:'Kiribati - KI'},{ data:'KM',value:'Comoros - KM'},{ data:'KN',value:'Saint Kitts and Nevis - KN'},{ data:'KP',value:'Korea, Democratic Peoples Republic of - KP'},{ data:'KR',value:'Korea, Republic of - KR'},{ data:'KW',value:'Kuwait - KW'},{ data:'KY',value:'Cayman Islands - KY'},{ data:'KZ',value:'Kazakhstan - KZ'},{ data:'LA',value:'Lao Peoples Democratic Republic - LA'},{ data:'LB',value:'Lebanon - LB'},{ data:'LC',value:'Saint Lucia - LC'},{ data:'LI',value:'Liechtenstein - LI'},{ data:'LK',value:'Sri Lanka - LK'},{ data:'LR',value:'Liberia - LR'},{ data:'LS',value:'Lesotho - LS'},{ data:'LT',value:'Lithuania - LT'},{ data:'LU',value:'Luxembourg - LU'},{ data:'LV',value:'Latvia - LV'},{ data:'LY',value:'Libya - LY'},{ data:'MA',value:'Morocco - MA'},{ data:'MC',value:'Monaco - MC'},{ data:'MD',value:'Moldova, Republic of - MD'},{ data:'ME',value:'Montenegro - ME'},{ data:'MF',value:'Saint Martin (French part) - MF'},{ data:'MG',value:'Madagascar - MG'},{ data:'MH',value:'Marshall Islands - MH'},{ data:'MK',value:'Macedonia, the former Yugoslav Republic of - MK'},{ data:'ML',value:'Mali - ML'},{ data:'MM',value:'Myanmar - MM'},{ data:'MN',value:'Mongolia - MN'},{ data:'MO',value:'Macao - MO'},{ data:'MP',value:'Northern Mariana Islands - MP'},{ data:'MQ',value:'Martinique - MQ'},{ data:'MR',value:'Mauritania - MR'},{ data:'MS',value:'Montserrat - MS'},{ data:'MT',value:'Malta - MT'},{ data:'MU',value:'Mauritius - MU'},{ data:'MV',value:'Maldives - MV'},{ data:'MW',value:'Malawi - MW'},{ data:'MX',value:'Mexico - MX'},{ data:'MY',value:'Malaysia - MY'},{ data:'MZ',value:'Mozambique - MZ'},{ data:'NA',value:'Namibia - NA'},{ data:'NC',value:'New Caledonia - NC'},{ data:'NE',value:'Niger - NE'},{ data:'NF',value:'Norfolk Island - NF'},{ data:'NG',value:'Nigeria - NG'},{ data:'NI',value:'Nicaragua - NI'},{ data:'NL',value:'Netherlands - NL'},{ data:'NO',value:'Norway - NO'},{ data:'NP',value:'Nepal - NP'},{ data:'NR',value:'Nauru - NR'},{ data:'NU',value:'Niue - NU'},{ data:'NZ',value:'New Zealand - NZ'},{ data:'OM',value:'Oman - OM'},{ data:'PA',value:'Panama - PA'},{ data:'PE',value:'Peru - PE'},{ data:'PF',value:'French Polynesia - PF'},{ data:'PG',value:'Papua New Guinea - PG'},{ data:'PH',value:'Philippines - PH'},{ data:'PK',value:'Pakistan - PK'},{ data:'PL',value:'Poland - PL'},{ data:'PM',value:'Saint Pierre and Miquelon - PM'},{ data:'PN',value:'Pitcairn - PN'},{ data:'PR',value:'Puerto Rico - PR'},{ data:'PS',value:'Palestine, State of - PS'},{ data:'PT',value:'Portugal - PT'},{ data:'PW',value:'Palau - PW'},{ data:'PY',value:'Paraguay - PY'},{ data:'QA',value:'Qatar - QA'},{ data:'RE',value:'Réunion - RE'},{ data:'RO',value:'Romania - RO'},{ data:'RS',value:'Serbia - RS'},{ data:'RU',value:'Russian Federation - RU'},{ data:'RW',value:'Rwanda - RW'},{ data:'SA',value:'Saudi Arabia - SA'},{ data:'SB',value:'Solomon Islands - SB'},{ data:'SC',value:'Seychelles - SC'},{ data:'SD',value:'Sudan - SD'},{ data:'SE',value:'Sweden - SE'},{ data:'SG',value:'Singapore - SG'},{ data:'SH',value:'Saint Helena, Ascension and Tristan da Cunha - SH'},{ data:'SI',value:'Slovenia - SI'},{ data:'SJ',value:'Svalbard and Jan Mayen - SJ'},{ data:'SK',value:'Slovakia - SK'},{ data:'SL',value:'Sierra Leone - SL'},{ data:'SM',value:'San Marino - SM'},{ data:'SN',value:'Senegal - SN'},{ data:'SO',value:'Somalia - SO'},{ data:'SR',value:'Suriname - SR'},{ data:'SS',value:'South Sudan - SS'},{ data:'ST',value:'Sao Tome and Principe - ST'},{ data:'SV',value:'El Salvador - SV'},{ data:'SX',value:'Sint Maarten (Dutch part) - SX'},{ data:'SY',value:'Syrian Arab Republic - SY'},{ data:'SZ',value:'Swaziland - SZ'},{ data:'TC',value:'Turks and Caicos Islands - TC'},{ data:'TD',value:'Chad - TD'},{ data:'TF',value:'French Southern Territories - TF'},{ data:'TG',value:'Togo - TG'},{ data:'TH',value:'Thailand - TH'},{ data:'TJ',value:'Tajikistan - TJ'},{ data:'TK',value:'Tokelau - TK'},{ data:'TL',value:'Timor-Leste - TL'},{ data:'TM',value:'Turkmenistan - TM'},{ data:'TN',value:'Tunisia - TN'},{ data:'TO',value:'Tonga - TO'},{ data:'TR',value:'Turkey - TR'},{ data:'TT',value:'Trinidad and Tobago - TT'},{ data:'TV',value:'Tuvalu - TV'},{ data:'TW',value:'Taiwan, Province of China - TW'},{ data:'TZ',value:'Tanzania, United Republic of - TZ'},{ data:'UA',value:'Ukraine - UA'},{ data:'UG',value:'Uganda - UG'},{ data:'UM',value:'United States Minor Outlying Islands - UM'},{ data:'US',value:'United States - US'},{ data:'UY',value:'Uruguay - UY'},{ data:'UZ',value:'Uzbekistan - UZ'},{ data:'VA',value:'Holy See (Vatican City State) - VA'},{ data:'VC',value:'Saint Vincent and the Grenadines - VC'},{ data:'VE',value:'Venezuela, Bolivarian Republic of - VE'},{ data:'VG',value:'Virgin Islands, British - VG'},{ data:'VI',value:'Virgin Islands, U.S. - VI'},{ data:'VN',value:'Viet Nam - VN'},{ data:'VU',value:'Vanuatu - VU'},{ data:'WF',value:'Wallis and Futuna - WF'},{ data:'WS',value:'Samoa - WS'},{ data:'YE',value:'Yemen - YE'},{ data:'YT',value:'Mayotte - YT'},{ data:'ZA',value:'South Africa - ZA'},{ data:'ZM',value:'Zambia - ZM'},{ data:'ZW',value:'Zimbabwe - ZW'}];
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

    $scope.movies = [];

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
            bookbuttontitletext="Book Now";
            $scope.isVisibleReturningDate=false;
        }
        else if(val==1){
            tripDirection="Round Trip";
            bookbuttontitletext="Select Returning Flight";
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
                $window.location.href = "#/showavailableflights/0?source="+$scope.searchStringSource+"&destination="+$scope.searchStringDestination+"&direction="+tripDirection+"&leavingdate="+$scope.leavingOut+"&comingindate="+$scope.comingIn;

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
