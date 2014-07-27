'use strict';

//Base URL - change any time we make deployment changes on server
var BASE_URL="http://jayeshkawli.com/airlinetravel/";

function checkNetConnection(){
    var xhr = new XMLHttpRequest();
    var file = BASE_URL+"internet_connection_active_test.php";
    var r = Math.round(Math.random() * 100);

    xhr.open('HEAD', file + "?subins=" + r, false);

    try {
        xhr.send();
        if (xhr.status >= 200 && xhr.status < 304) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
}

function clone(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = obj.constructor(); // changed

    for(var key in obj)
        temp[key] = clone(obj[key]);
    return temp;
}

Array.prototype.clear = function() {
    while (this.length > 0) {
        this.pop();
    }
};



function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

Date.prototype.addDays = function(days){

    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + (+days));
    return dat;

}


var getStandardDate=function(originalDate,numberOfDaysOffset){

    var pattern = /(\d{4})-(\d{2})-(\d{2})/;
    var dt = new Date(originalDate.replace(pattern,'$1-$2-$3'));
    return  new Date(dt.addDays(numberOfDaysOffset)).toISOString();

}


var getFormattedDateForDisplay=function(dateObject,dateFormat){


    var datePassed=new Date(dateObject)

    var monthOfYear = datePassed.getMonth()+1;
    var dayOfMonth = datePassed.getDate()+1;
    var yearOfBooking = datePassed.getFullYear();

    if(monthOfYear<10){
        monthOfYear='0'+monthOfYear;
    }
    if(dayOfMonth<10){
        dayOfMonth='0'+dayOfMonth;
    }

    if(dateFormat==0){
    return yearOfBooking+"-"+monthOfYear+"-"+dayOfMonth;
    }
    else if(dateFormat==1){
        return monthOfYear+"/"+dayOfMonth+"/"+yearOfBooking;
    }


}


Date.prototype.addMonthsToDate=function(numberOfMonthsToAdd){
    var inputDateInJavascriptFormat = new Date(this.valueOf());
    inputDateInJavascriptFormat.setMonth(inputDateInJavascriptFormat.getMonth() + numberOfMonthsToAdd);
    return inputDateInJavascriptFormat;
}


var isTelephoneNumberValid=function(passedTelephoneNumber){

    var telephoneRegex = /^\d{3}-?\d{3}-?\d{4}$/g
    return telephoneRegex.test(passedTelephoneNumber);
}


var isZipcodeValid=function(passedZipCode){

    var zipCodeRegex=/^\d{5,8}$/g;
    return (zipCodeRegex.test(passedZipCode));
}


function invalidServerCommunicationMethod(invalidMethod,message) {
    this.invalidMethod = invalidMethod;
    this.message = message;
}

var sendDataToServer=function(method,remoteURL,dataToSend,$http,successCallBackFunction,errorCallbackFunction){

    if(method==="GET"){
        $http({
            url: remoteURL,
            method: method,
            cache:true,
            params: dataToSend?dataToSend:"",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (serverResponseDataForGetRequest, status, headers, config) {
            successCallBackFunction(serverResponseDataForGetRequest);

            }).error(function (data, status, headers, config) {
                errorCallbackFunction(data,status,headers,config);
            });



    }
    else if(method==="POST"){

        $http.post(remoteURL, dataToSend)
            .success(function(response) {

             successCallBackFunction(response);

            }).error(function(errorMessage){

                errorCallbackFunction(errorMessage);

            });
    }
    else if(method==="JSONP"){
        $http({method: method, url: remoteURL, cache: true}).
            success(function(response, status) {
                successCallBackFunction(response);
            }).
            error(function(failureMessage, status) {
                errorCallbackFunction(failureMessage);
            });
    }
    else{
        throw new invalidServerCommunicationMethod(method,"Invalid Method Encountered. Please try request again with valid method");
    }
}