function checkNetConnection(){
    var xhr = new XMLHttpRequest();
    var file = "http://www.jayeshkawli.com/airlinetravel/internet_connection_active_test.php";
    var r = Math.round(Math.random() * 10000);

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
