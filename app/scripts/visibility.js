/**
 * Created by jayeshkawli on 7/26/14.
 */

/* Reference :
 https://developer.mozilla.org/en-US/docs/Web/Guide/User_experience/Using_the_Page_Visibility_API
 http://blog.teamtreehouse.com/an-introduction-to-the-page-visibility-api
 */

//Making sure this function works well with all standard browsers

var hidden, visibilityChange;

if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden";
    visibilityChange = "visibilitychange";
} else if (typeof document.mozHidden !== "undefined") {
    hidden = "mozHidden";
    visibilityChange = "mozvisibilitychange";
} else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
}

function handleVisibilityChange() {
    if (document[hidden]) {
//Do something when tab goes in the background
        console.log("Controller Hiding");//+ checkNetConnection());
    } else {
//Do something when tab comes back
        console.log("Controller showing");//+checkNetConnection());
    }
}

if (typeof document.addEventListener === "undefined" || typeof hidden === "undefined") {
    console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the " +
        "Page Visibility API. Not able to Demonstrate Visibility API capability of this application");

}
else{
document.addEventListener(visibilityChange, handleVisibilityChange,false);
}