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