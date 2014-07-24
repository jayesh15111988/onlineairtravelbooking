'use strict';


/* This is the main controller module. We will store all controllers used in our code in this module */






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
//Directive to add focus for particular text field on screen



airlinetravelmodule.directive('successfullRegistration', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.dismissSuccessfullRegistration = function() {
                element.modal('hide');
            };
            scope.showSuccessfullRegistration = function() {
                element.modal('show');
            };

        }
    }
});


airlinetravelmodule.directive('registerUpdatepage', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.dismissRegPage = function() {
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

airlinetravelmodule.run(function($rootScope) {
    /*
     Receive emitted message and broadcast it.
     Event names must be distinct or browser will blow up!
     */
    $rootScope.$on('handleEmit', function(event, args) {
        $rootScope.$broadcast('handleBroadcast', args);
    });
});

//How to create directive based approach to show hide modal view Important
/*airlinetravelmodule.directive('registerSecondpage', function() {
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
*/


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

airlinetravelmodule.directive('registerView',function(){
    return {
        restrict: 'A',
        link:function(scope,element,attr){
            scope.dismissRegisterView=function(){
                element.model('hide');
            };
            scope.showRegisterView=function(){
                element.modal('show');
            }
        }
    }

});

airlinetravelmodule.controller('userupdatecontroller',function($scope){

    console.log("update came");

    $scope.$on("DISMISS_UPDATE_VIEW", function(event, data){
        $scope.dismissRegPage();
    });

    $scope.openUpdate = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.openedUpdate = true;
    };

    var prestoredUserData=JSON.parse(localStorage.getItem('serverloginauthenticationsuccess'));

//console.log(prestoredUserData.country+ " that's it ");

    $scope.$on("SET_MESSAGE_HEADER_SUCCESS", function(event, data){

        console.log("child reset message");
        $scope.messages=data;
        //var prestoredUserData=JSON.parse(localStorage.getItem('serverloginauthenticationsuccess'));
        //$scope.country=prestoredUserData.country;
    });



    $scope.$on("SET_MESSAGE_HEADER_FAILURE", function(event, data){


        $scope.messages=data;

    });






//Pre-populate all fields from Local storage - Here, since user already create an account or logged, in we know that serverloginauthenticationsuccess
    //Will be non-empty! If it is, either user is not logged in or it messed up local stoarge data! In the latter case - What a Douchebag!

    if(localStorage.getItem('serverloginauthenticationsuccess')){

        $scope.salutation=prestoredUserData.salutation;
        $scope.firstname=prestoredUserData.firstname;
        $scope.middlename=prestoredUserData.middlename;
        $scope.lastname=prestoredUserData.lastname;
        $scope.birthdate=prestoredUserData.dateofbirth.substring(0,10);
        //var sam=$scope.countrynameslist.indexOf(prestoredUserData.country);
        //console.log("asdsa"+sam);
        //$scope.country=$scope.countrynameslist[sam];

        //$scope.country=prestoredUserData.country;
        //console.log("Full street info is "+prestoredUserData.streetinfo);
        //Full streetinfo contains two parts which in turn are separated by ':'
        //split them and show as streetinfo and streetsubinfo



        $scope.zipcode=prestoredUserData.zipcode;
        $scope.city=prestoredUserData.city;
        $scope.state=prestoredUserData.state;
        $scope.subscribingforpromotionaloffers=prestoredUserData.issubscribed;
        $scope.email=$scope.reemail= prestoredUserData.emailaddress;
        $scope.userid=prestoredUserData.userid;
        $scope.password=$scope.repassword=prestoredUserData.password;
        $scope.telephonenumber=prestoredUserData.phonenumber;
        $scope.languagechoice=prestoredUserData.languagechoice;
        $scope.travelpurpose=prestoredUserData.travelpurpose;
        $scope.comments=prestoredUserData.comments;
        console.log("Came into update hahah"+ prestoredUserData.country);
    }

    $scope.$on("SET_MESSAGE_HEADER", function(event, data){
        /*        var prestoredUserData=JSON.parse(localStorage.getItem('serverloginauthenticationsuccess'));

         console.log("child reset message");
         $scope.messages="";
         console.log(typeof prestoredUserData.country);
         console.log(prestoredUserData.country+ "this is actual country name");
         var sam=$scope.countrynameslist.indexOf(prestoredUserData.country);
         console.log("asdsa"+sam);
         $scope.country=$scope.countrynameslist[sam];*/

    });

    var test=function(moduleObject,formData){

        console.log("This is form data -> " + formData.issubscribed);
        moduleObject.$emit("UPDATE_PARENT", formData);
    }

    $scope.submitUpdatedInformation=function(form){

        $scope.submitted = true;





        // If form is invalid, return and let AngularJS show validation errors.
        if (form.$invalid || !$scope.didConditionsAccepted) {
            return;
        }



        var formData={
            'salutation':$scope.salutation,
            'firstname':$scope.firstname,
            'middlename':$scope.middlename,
            'lastname':$scope.lastname,
            'dateofbirth':$scope.birthdate,
            'country':$scope.country,
            'streetinfo':$scope.streetname + ":"+$scope.streetsubname,
            'zipcode':$scope.zipcode,
            'city':$scope.city,
            'state':$scope.state,
            'issubscribed':$scope.subscribingforpromotionaloffers,
            'emailaddress':$scope.email,
            'userid':$scope.userid,
            'password':$scope.password,
            'phonenumber':$scope.telephonenumber,
            'languagechoice':$scope.languagechoice,
            'travelreason':$scope.travelpurpose,
            'comments':$scope.comments
        }


        test(this,formData);
        $scope.sendmessage=function(){
            this.$emit("UPDATE_PARENT", "Updated");
            //this.$emit("UPDATE_PARENT", formData);
        }

    }

});


airlinetravelmodule.controller('samcontroller',function($scope, $http, $log, promiseTracker, $timeout,$window,$rootScope,sharedService,$modal,openRegistrationDialogueService,getStoredAuthTokenService,loginUserFunction,flightsGlobalParameters){

    //console.log("parent one controller came");

//$scope.toShowDropdownMenuForResrevationRetrieval=false;

    // another controller or even directive

    /*$rootScope.$on("createNewUserAccount", function (args) {
//This notification is used to pop up a dialogue which will then be used to create a new user during user checkout process
  //      console.log(angular.toJson(args, true));

openRegistrationDialogue(true);

    });*/
//As soon as user comes on this page, retrieve his ip address and snd request to server to store
    //Geographical information got from our api

    setUserFirstNameOnDisplay();




    $rootScope.$on("errorInReservationRetrieval", function (args) {

        $scope.showRetrievelError=true;
        $scope.errormessage=sharedService.getProperty();//"Record Not found for given Confirmation Code and email address";
        $scope.toShowDropdownMenuForResrevationRetrieval=true;

    });




    if(localStorage.getItem('authTokenInfo')){

        var expiryTime = new Date(JSON.parse(localStorage.getItem('authTokenInfo')).tokenexpirytime);
        var currentTime = new Date();
//asdsa
        console.log("now time"+currentTime+ "Future time"+ expiryTime);
        if(currentTime>expiryTime){

            //Send server request to generate new token
            //console.log("your session expired");

            var storedAuthData=JSON.parse(localStorage.getItem('authTokenInfo'));


            var previousFirstName=storedAuthData.firstname;
            var prevAuthData={"email":storedAuthData.emailaddress,"currentauthtoken": storedAuthData.authtoken};
            alert("Session ended requesting new authorization token from server");
            localStorage.removeItem('authTokenInfo');

            $http({
                url: "http://jayeshkawli.com/airlinetravel/generatenewtoken.php",
                method: "GET",
                cache:true,
                params: prevAuthData,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data, status, headers, config) {

                    console.log(data+ "whole data we have");

                    if(data.success==true){

                        data.tokenexpirytime=addMinutes(new Date(),30);
                        data.firstname=previousFirstName;

                        localStorage.setItem('authTokenInfo',JSON.stringify(data));
setUserFirstNameOnDisplay();
                    }
                    else if(data.success==false){
                        loguserinwithmodalview();
                       // $('#loginview').modal('show');
                    }
                }).error(function (data, status, headers, config) {
                    console.log("Token regenration failer with response: "+ data+ "And status code "+status);

                });
        }
        else{
            console.log("Sesion in progress");
        }

    }
    else{
        console.log("no session exists");
    }

//For Reservation button and validation upon clicking a link
    //We are removing all JS support for better practice

   $scope.toShowDropdownMenuForResrevationRetrieval=false;
$scope.recordlocator='';
    var currentConfirmationCodeLength=0;
$scope.showHideDropDownMenu=function(){

    if(!$scope.toShowDropdownMenuForResrevationRetrieval){
    if(localStorage.getItem('recordlocatorcode')){

        $scope.recordlocator=JSON.parse(localStorage.getItem('recordlocatorcode')).confirmationCode;
        currentConfirmationCodeLength=$scope.recordlocator.length;
        $scope.bookingretrievalemail=JSON.parse(localStorage.getItem('recordlocatorcode')).emailaddress;
        $scope.toRememberSelection.checked=true;
    }
        else{
        $scope.toRememberSelection.checked=false;
    }
    }

    $scope.toShowDropdownMenuForResrevationRetrieval=!$scope.toShowDropdownMenuForResrevationRetrieval;
}


    $scope.keyPressed=function(keyEvent){
//console.log((keyEvent.keyCode)+" **** ");
        //User Pressed Delete or backspace
        if(keyEvent.keyCode==8){
            if(currentConfirmationCodeLength!=0){
currentConfirmationCodeLength-=1;
            }
        }
        else if(keyEvent.keyCode==46){
            currentConfirmationCodeLength=0;
        }
        else if(String.fromCharCode(keyEvent.keyCode) &&!(keyEvent.keyCode>36 && keyEvent.keyCode<41)){
            currentConfirmationCodeLength+=1;
        }
            $scope.confirmationCodeLengthErrorDisplay=(currentConfirmationCodeLength>7);
    }



    $scope.submitForm = function(isValid) {

        // check to make sure the form is completely valid
        if (isValid) {

            console.log($scope.recordlocator);
            console.log($scope.bookingretrievalemail);
            $scope.toShowDropdownMenuForResrevationRetrieval=false;
            $window.location.href = "#/retrievebooking/"+$scope.recordlocator+"/"+$scope.bookingretrievalemail;
        }

    };

$scope.toRememberSelection=false;

    $scope.toremember=function (){

        console.log($scope.toRememberSelection);
        if(!$scope.recordlocator|| !$scope.bookingretrievalemail ){
            $scope.toRememberSelection=false;
        }
        else{
            if($scope.toRememberSelection){
                localStorage.setItem('recordlocatorcode',JSON.stringify({confirmationCode:$scope.recordlocator,emailaddress:$scope.bookingretrievalemail}));


            }
            else{
                localStorage.removeItem('recordlocatorcode');
            }
        }
    }


    if(!localStorage.getItem('authTokenInfo')){
        $scope.loginlogouttext="Login";
    }
    else{
        $scope.loginlogouttext="Logout";
    }

    //Controller for login view for user to log into the account
    var loginModalInstanceController = function ($scope, $modalInstance, items) {

        $scope.savecredentials=false;
        var storedUserAuthInfo=JSON.parse(localStorage.getItem('userauthinfo'));
        if(storedUserAuthInfo){
        $scope.loginemail=storedUserAuthInfo.emailid;
        $scope.loginpassword=storedUserAuthInfo.password;
            $scope.savecredentials=true;
        }

        $scope.closeLoginDialogue=function(){
            $modalInstance.dismiss('cancel');
        }

        $scope.forgotPassword=function(){
            //$modalInstance.close("");
            $modalInstance.dismiss('cancel');
            $scope.showForgotPasswordView();
        }

        $scope.hideloginshowregistration=function(){
            //$modalInstance.close("");
            $modalInstance.dismiss('cancel');
            openRegistrationDialogue(true);
            //$("#registerview").modal('show');
        }



        $scope.loguserin=function(form,loginemail,loginpassword,toSaveCredentialsOnDevice){
              console.log("user clicked login button"+ loginemail+ " "+loginpassword);
            console.log("To save o not "+toSaveCredentialsOnDevice);
            $scope.userloggedin=true;
            if(form.$invalid){
                return;
            }

            var userLoginInfo={'emailid':loginemail,'password':loginpassword};
            console.log(angular.toJson(userLoginInfo,true)+ " &&&&*** ");
            var success=false;

            var authTokenInfoFromLocalStorage={};
            if(localStorage.getItem('authTokenInfo')){
                authTokenInfoFromLocalStorage=JSON.parse(localStorage.getItem('authTokenInfo'));
            }
            $scope.usernametodisplay=authTokenInfoFromLocalStorage.firstname;
            $http({
                url: 'http://jayeshkawli.com/airlinetravel/userlogin.php',
                method: "GET",
                cache:true,
                params: userLoginInfo,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data, status, headers, config) {
                    $scope.loginemail=userLoginInfo.emailid;
                    $scope.loginpassword=userLoginInfo.password;
                    //User's email addres and password for local stoarge
                    if(localStorage.getItem('userauthinfo')){
                        localStorage.removeItem('userauthinfo');
                    }

                    success=true;


                    console.log("To save credential on local machine "+toSaveCredentialsOnDevice);

                    if(toSaveCredentialsOnDevice===true){
                        localStorage.setItem('userauthinfo',JSON.stringify(userLoginInfo));
                    }
                    var serverResponseData = JSON.stringify(data);
                    if(data.success===true){
                        if(localStorage.getItem('serverloginauthenticationsuccess')){

                            localStorage.removeItem('serverloginauthenticationsuccess');
                            localStorage.removeItem('authTokenInfo');

                        }
                        //Emit the message that user is successfully logged in this is useful on details controller where user
                        // is ready to finalize his selection

                        flightsGlobalParameters.setIsLoggedInParameter(true);// isLoggedInOnConfirmationScreen=true;
                        localStorage.setItem( 'serverloginauthenticationsuccess', serverResponseData);
                        localStorage.setItem('authTokenInfo',JSON.stringify({authtoken:data.authorization,emailaddress:data.emailaddress,firstname:data.firstname,tokenexpirytime:addMinutes(new Date(),30)}));


                        setUserFirstNameOnDisplay();

                        //Now if user is on main flight details page, just update button status in order to allow
                        //change in login status
                        $rootScope.$broadcast("userLoginStatusChanged", { loggedIn:true});

                        //$scope.messages = 'Your login information has been successfully sent! Congratulations...';
                        //$modalInstance.dismiss('cancel'); - Not using it because user actually logged into the system
                        //Not actually necessary - User is refreshing the page anyways
                        $modalInstance.close(data);

                        //To do warning
                        //Send notification through rootscope to set flight details page with changed button attributes if
                        //Login is successful
                        //to be Continued
        //                $window.location.reload();
                    }
                    else if (data.success===false){
                        $scope.errorMessage=data.errorinfo
                        $scope.errorResolutionMessage = "Please select forgot password option if you have forgotten your email address";



                        setUserFirstNameOnDisplay();


                        localStorage.setItem( 'serverloginauthenticationerror', serverResponseData);
                    }
                })
                .error(function (data, status, headers, config) {
                    //$modalInstance.close(data);
                    //$('#loginview').modal('hide');
                    $scope.errorMessage="Login Failed with an error. Please try again "+angular.toJson(data);
                    localStorage.setItem( 'serverloginerror', JSON.stringify(data));
                    $scope.messages = 'Your registration information has been unsuccessfully sent! No try again later...';

                });
        }


        //$scope.ok = function () {
           // $modalInstance.close($scope.selected.item);
        //};

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };


    var loguserinwithmodalview=function(){
        var modalInstance = $modal.open({
            templateUrl: 'loginview',
            controller: loginModalInstanceController,
            size: 'sm',
            resolve: {
                items: function () {
                    return "";
                }
            }
        });


        //loginUserFunction.setLoginFunction(loginModalInstanceController);


        modalInstance.result.then(function (selectedItem) {
//User logged in succesfully, now change main name from guest to valid username and change login text to logout


            setUserFirstNameOnDisplay();

        }, function () {
            console.log(' Login view Modal dismissed at: ' + new Date());
        });
        //$('#loginview').modal('show');
    }

    var showLoginViewToUser=function(){
        //User is not logged in currently - Show login box to allow him to get into the account
        if(!localStorage.getItem('authTokenInfo')){
            //Show login view to user
            //This is bad - Breaking the MVC pattern in Ang JS

            loguserinwithmodalview();

        }
        else{
            loguserout();
            console.log("You were already signed in and now forcibly logged out by our system");
        }
    }

    $scope.showLoginViewOnClick=function(){

showLoginViewToUser();
    }





    //swatiiiii

    loginUserFunction.setLoginFunction(showLoginViewToUser);
    //We will be using ajax request using jQuery because Angular request mechanism is a piece of shit and gives access control allow origin error
    //even though allow all headers are present in destination - Not sure what's wrong but you may say it a hack. I am gonna
    //abide by it from now on


    //$scope.loginviewtarget='#loginview';
    //Not working - Don't know why
    //NVM - No longer necessary - We have adopted completely different approach to achieve the same thing
    //$scope.showSuccessfullRegistration();

    //We will use this view once user registration is complete to show success
//$('#registrationsuccessfull').modal('show');


    //Set country names in related select-options structure




    /*$scope.$on("UPDATE_PARENT", function(event, formData){
     // $scope.foo = message;
     console.log("Parent received message");

     /*console.log("successful"+ message);
     //Broadcast to Child example part 1
     $scope.$broadcast("DO_BIDDING", {
     buttonTitle : message,
     onButtonClick : function(){
     $scope.foo = "HAHA this button no longer works!";
     }
     });*/
    //});

    function setUserFirstNameOnDisplay(){



       var isAuthTokenExistsInLocalStorage= getStoredAuthTokenService.getStoredAuthToken();
        /*if(typeof isAuthTokenExistsInLocalStorage === "string"){
            isAuthTokenExistsInLocalStorage=JSON.parse(isAuthTokenExistsInLocalStorage);
        }*/



        if(isAuthTokenExistsInLocalStorage){

            $scope.loginlogouttext="Logout";
            $scope.userfirstnamedisplay=isAuthTokenExistsInLocalStorage.firstname;

        }
        else{

            $scope.loginlogouttext="Login";
            $scope.userfirstnamedisplay="Guest";

        }
    }







    $scope.$on("UPDATE_PARENT", function(event, message){
        //$scope.foo = message+ "hahah";


        //Broadcast to Child example part 1
        /*$scope.$broadcast("DO_BIDDING", {
         buttonTitle : message,
         onButtonClick : function(){
         $scope.foo = "HAHA this button no longer works!";
         }
         });*/
    });











    $scope.gotobackpage=function(){

        $scope.dismissForgotPasswordView();
        $scope.showLoginViewOnClick();
    }


$scope.toShowErrorOnForgotPassword=false;
    $scope.sendpasswordtouser=function(form,emailorusername){

        $scope.toShowErrorOnForgotPassword=true;
console.log(form.$invalid + "Is valid or not");
        if(form.$invalid){
            return;
        }
//Now make call to remote script to send an email to user with forgotten password information

        $http.post('http://www.jayeshkawli.com/airlinetravel/sendforgotpasswordtoemail.php', { emailorusernametosend: emailorusername })
            .success(function(response) {

            console.log(response);
            $scope.messageFromServer=response.message;

        }).error(function(errorMessage){
              console.log("Error Occurred "+ errorMessage);

            });





    }

    //Special Controler for modal view that we will use to notify user that he is already logged in
    //And needs to logout first to create a new profile
    var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

        $scope.items = items;
       $scope.selected = {
            item: $scope.items[0]
        };
var selectedIndex=0;
$scope.setSelectedItem=function(index,item){
    $scope.selected.item = item;
    selectedIndex=index;
}
        $scope.ok = function () {
            $modalInstance.close(selectedIndex);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };

    $scope.viewingProfileInfoForEditing=function(isEditing){



//User is logged in and we will make sure to change text to update and instread of creating account, we will redirect him to this screen
        //where he'll be able to edit profile information



        flightsGlobalParameters.setIsEditingUserRegistrationInfoParameter(isEditing);// isEditingUserRegistrationInfo=isEditing;

        if(isEditing===true){
console.log("Came here with variable is editing value is "+isEditing);


            openRegistrationDialogue(!isEditing);

        }
        else{
            console.log("Creating a new profile");
            if(localStorage.getItem('authTokenInfo')){
                $scope.items = [{name:'Undecided'}, {name:'Remain Logged In wihtout creating an additional account'},{name:'Logout and create new account'}];

                var modalInstance = $modal.open({
                    templateUrl: 'alreadyRegisteredNotificationModal',
                    controller: ModalInstanceCtrl,
                    size: 'sm',
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });

                modalInstance.result.then(function (selectedIndex) {
                    console.log("Selected Index "+selectedIndex );
                    //If selected option is index = 2 then user wish to logout of current account and create additional one
                    //Use this carefully, we are logigng current user out
                    if(selectedIndex==2){
                    loguserout();
                    }

                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });


            }else{


               openRegistrationDialogue(!isEditing);

            }
        }
    }



    //$route.location.reload();
var openRegistrationDialogue=function(isCreatingNewUser)
{
    var userRegistrationController = function ($scope, $modalInstance, items) {

        console.log("Registration opened");

        $scope.salutations=listOfSalutations;
        $scope.travelreasons=travelReasons;
        $scope.languages=availableLanguages;

        $scope.closeRegistrationModalView=function(){
            $modalInstance.dismiss('cancel');
        }



       $scope.countrynameslist = countryNames;




       if(isCreatingNewUser){
        $scope.fieldnames={
            salutation:$scope.salutations[0],
            firstname:$scope.firstname,
            middlename:$scope.middlename,
            lastname:$scope.lastname,
            birthdate:$scope.birthdate,
            selcountry:$scope.countrynameslist[0],
            streetname:$scope.streetname,
            streetsubname:$scope.streetsubname,
            zipcode:$scope.zipcode,
            city:$scope.city,
            state:$scope.state,
            issubscribed:$scope.subscribingforpromotionaloffers,
            emailaddress:$scope.email,
            userid:$scope.userid,
            password:$scope.password,
            telephonenumber:$scope.telephonenumber,
            languagechoice:$scope.languages[0],
            travelpurpose:$scope.travelreasons[0],
            comments:$scope.comments,
            passwordsnotmatch:false,
            didConditionsAccepted:false,
            isZipcodeInvalid:false
        }
       }else{
           var prestoredUserData=JSON.parse(localStorage.getItem('serverloginauthenticationsuccess'));

           if(prestoredUserData){








$scope.toHideTCSection=true;
//We have two parts in the address - Street info and street sub info
               var dividedStreetinfo=prestoredUserData.streetinfo.split(':');

$scope.fieldnames={
    selcountry:prestoredUserData.country,
    salutation:prestoredUserData.salutation,
        firstname:prestoredUserData.firstname,
        middlename:prestoredUserData.middlename,
        lastname:prestoredUserData.lastname,
    birthdate:prestoredUserData.dateofbirth.substring(0,10),
        streetname:dividedStreetinfo[0],
        streetsubname:dividedStreetinfo[1],
        zipcode:prestoredUserData.zipcode,
        city:prestoredUserData.city,
        state:prestoredUserData.state,
        subscribingforpromotionaloffers:prestoredUserData.issubscribed,
        email: prestoredUserData.emailaddress,
        reemail:prestoredUserData.emailaddress,
        userid:prestoredUserData.userid,
        password:prestoredUserData.password,
        repassword:prestoredUserData.password,
        telephonenumber:prestoredUserData.phonenumber,
        languagechoice:prestoredUserData.languagechoice,
        travelpurpose:prestoredUserData.travelpurpose,
        comments:prestoredUserData.comments,
        didConditionsAccepted:true
           }
           }
       }





        $scope.$watch('fieldnames.telephonenumber',function(n,o){

            if(n && o){
                var lengthOfInput= n.length;
                var oldLength= o.length;

                if(lengthOfInput>12){

                    $scope.fieldnames.telephonenumber=o;

                }
                else if((lengthOfInput==3 || lengthOfInput==7) && oldLength<lengthOfInput){
                    $scope.fieldnames.telephonenumber=n+"-";

                }
            }
        },true);




        $scope.disabled = function(date, mode) {
            //  return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };
        $scope.dateOptions = {
            'year-format': "'yy'",
            'starting-day': 1,
            'show-weeks':true
        };

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.fieldnames.opened = true;
        };

        //Set maximum birthdate as 0 years earlier from current date
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        //This is where we set maximum birthday date for the user
        var yyyy = today.getFullYear()-10;

        if(dd<10) {
            dd='0'+dd
        }

        if(mm<10) {
            mm='0'+mm
        }

        today = mm+'/'+dd+'/'+yyyy;
        $scope.maxdate='\''+today+'\'';

        //$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];

        $scope.format = 'MM/dd/yyyy';//$scope.formats[2];
        $scope.fieldnames.subscribingforpromotionaloffers=false;
        $scope.fieldnames.didConditionsAccepted=false;

        $scope.conditionschanged=function(acceptFlag){

            $scope.fieldnames.didConditionsAccepted=!acceptFlag;

        }








        $scope.closeRegistrationView = function () {
            $modalInstance.dismiss('cancel');
        };


        $scope.submit=function(form){


            $scope.passwordError=false;
            $scope.telephoneError=false;
            $scope.isEmailsMatchError=false;
            $scope.passwordsnotmatch=false;
            $scope.submitted = true;





            $scope.telephoneError=!isTelephoneNumberValid($scope.fieldnames.telephonenumber);


            //Zip code must be all digit and with minimum 5 and maximum 8 digits - that's all



            $scope.fieldnames.isZipcodeInvalid=!isZipcodeValid($scope.fieldnames.zipcode);

            $scope.passwordError = $scope.passwordsnotmatch=($scope.fieldnames.password!==$scope.fieldnames.repassword);

            if(!isCreatingNewUser){
            $scope.fieldnames.didConditionsAccepted=true;
            }

            $scope.isEmailsMatchError=($scope.fieldnames.email!==$scope.fieldnames.reemail);




            // If form is invalid, return and let AngularJS show validation errors.


            if (form.$invalid || !$scope.fieldnames.didConditionsAccepted ||$scope.fieldnames.isZipcodeInvalid ||$scope.passwordsnotmatch || $scope.telephoneError||$scope.isEmailsMatchError) {
                return;
            }



            var authTokenInfoFromLocalStorage=JSON.parse(localStorage.getItem('authTokenInfo'));
            var authToken='';
            if(authTokenInfoFromLocalStorage){
                authToken=authTokenInfoFromLocalStorage.authtoken;
            }

            var fullStreetInfo=$scope.fieldnames.streetname+":"+$scope.fieldnames.streetsubname;
            //Get timestamp of ours it is then converted to the actual date object
            //This data is in milliseconds, convert it into seconds

            var birthDateFormatterValue;

            if($scope.fieldnames.birthdate.indexOf('-')!=-1){
                birthDateFormatterValue=$scope.fieldnames.birthdate;
            }

            else{
            birthDateFormatterValue=+($scope.fieldnames.birthdate.valueOf())/1000;
            }

            var formData={
                'salutation':$scope.fieldnames.salutation,
                'firstname':$scope.fieldnames.firstname,
                'middlename':$scope.fieldnames.middlename,
                'lastname':$scope.fieldnames.lastname,
                'dateofbirth':birthDateFormatterValue,
                'country':$scope.fieldnames.selcountry,
                'streetinfo':fullStreetInfo,
                'zipcode':$scope.fieldnames.zipcode,
                'city':$scope.fieldnames.city,
                'state':$scope.fieldnames.state,
                'issubscribed':$scope.fieldnames.subscribingforpromotionaloffers,
                'emailaddress':$scope.fieldnames.email,
                'userid':$scope.fieldnames.userid,
                'password':$scope.fieldnames.password,
                'phonenumber':$scope.fieldnames.telephonenumber,
                'languagechoice':$scope.fieldnames.languagechoice,
                'travelpurpose':$scope.fieldnames.travelpurpose,
                'comments':$scope.fieldnames.comments,
                'Authorization': authToken
            }

console.log("User form data to send "+JSON.stringify(formData));
            var callbackFunctionafterUserCreateupdateOperation=function(responseData){
console.log("Send info to server and close dialogue");
                $modalInstance.close(isCreatingNewUser);
            }

            sendUserDataToServer(formData,$scope,isCreatingNewUser,$http,callbackFunctionafterUserCreateupdateOperation);
            //Close dialogue box once process is completed

        }
    };


    var modalInstance = $modal.open({

        templateUrl: 'userRegistrationContent.html',
        controller: userRegistrationController,
        size: 'sm',
        resolve: {
            items: function () {
                return "";
            }
        }
    });


    modalInstance.result.then(function (isCreatingNewUser) {
        //console.log("Response data after user operation ->"+ responseDataAfterUserCreateUpdateOperation);
        //Now we submitted data succesfull - Show user second page confirmaing ongoing registration
//Warning - To work on this part - Upon successful regsitration update all fileds on screen to show relevant texts
        //jayesh Kawli - To Work on this piece

        if(isCreatingNewUser){


          //Don't know why this ain't working
            //User successfuly created now set it's name and logout text on the top
            setUserFirstNameOnDisplay();

            //This is applicable for page where user views current flights details
            //Ready to book and send an email confirmation

            $rootScope.$broadcast("userLoginStatusChanged", { loggedIn:true});
        }

        gotoSuccessfullRegistrationPage(isCreatingNewUser);
        //$scope.showSecondPage();
        //                  $scope.selected = selectedItem;
    }, function () {
        $log.info('Registration Modal dismissed at: ' + new Date());
    });

}

    //Controller for completed registration view
    var registrationCompletedViewController = function ($scope, $modalInstance, items) {

//cancel and close this view
   $scope.closeRegistrationModalView=function(){
        $modalInstance.dismiss('cancel');
   }
        $scope.completedView={};

        //Items - true mean we are creating new user
        //If false means we are updating existing user

        $scope.completedView.mainMessage=items?"Congratulations You have created new profile":"congrats your profile updates are now completed";
        $scope.completedView.subMessage=items?"You can always create newp profile":"You can always update exisitng profiule by selecting update proile option from home page";


//Get result and then close the current view
       $scope.saveAndCloseModalView=function(){
        console.log("is creatin user"+items);

            ///swati
           //Send notification is user is being update
           if(!items){
               $scope.$emit('someEvent', {message:-1});
           }

           $modalInstance.close();
       }


    }
//End of controller for completed registration process

    var gotoSuccessfullRegistrationPage=function(isCreatingNewUser){
        var modalInstance = $modal.open({

            templateUrl: 'registrationUpdateCompleteModalView',
            controller: registrationCompletedViewController,
            size: 'sm',
            resolve: {
                items: function () {
                    return isCreatingNewUser;
                }
            }
        });


        modalInstance.result.then(function (responseDataAfterUpdate) {
            console.log("Response data after user operation ->"+ responseDataAfterUpdate);
            //Now we submitted data successful - Show user second page confirming ongoing registration




        }, function () {
            $log.info('Registration completion Modal dismissed at: ' + new Date());
        });


    }
    openRegistrationDialogueService.setProperty(openRegistrationDialogue);

    $scope.regionName="Select Region";
    $scope.setRegion=function(regionname){
        $scope.regionName=regionname;

    }



    var loguserout=function(){

        //It happens only if user is pre logged in

        if(localStorage.getItem('authTokenInfo')){
            console.log("User logging out...flush all local storage and empty personal data");

            var storedAuthData=JSON.parse(localStorage.getItem('authTokenInfo'));

//jjj
//To add code to send Auth token along with user email address for extra verification

            $http.post("http://www.jayeshkawli.com/airlinetravel/userlogout.php",  { emailaddressofuser: storedAuthData.emailaddress,'Authorization':storedAuthData.authtoken} )
                .success(function(data) {

                    //Remove all temporary local storage from database and change name to Hello Guest on top nav bar

                    console.log(data + " Message from the server while logging user out ");
                    localStorage.removeItem('authTokenInfo');
                    localStorage.removeItem('serverloginauthenticationsuccess');

                    if(localStorage.getItem('serverloginauthenticationerror')){
                        localStorage.removeItem('serverloginauthenticationerror');
                    }
                    $rootScope.$broadcast("userLoginStatusChanged", { loggedIn:false});
                   // $scope.$apply(function () {

                        $scope.userfirstnamedisplay="Guest"
                        $scope.loginlogouttext="Login";


                   // });


                }).error(function(errorMessage){


                console.log("Error "+ errorMessage+ " Occurred while logging user out of the account");

                });


           /* $.ajax({
                type: "POST",
                url: "http://www.jayeshkawli.com/airlinetravel/userlogout.php",
                cache:true,
                data: { emailaddressofuser: storedAuthData.emailaddress,'Authorization':storedAuthData.authtoken}
            })
                .done(function( msg ) {
                    //Remove all temporary local storage from database and change name to Hello Guest on top nav bar

                    console.log(msg + " Message from the server ");
                    localStorage.removeItem('authTokenInfo');
                    localStorage.removeItem('serverloginauthenticationsuccess');

                    if(localStorage.getItem('serverloginauthenticationerror')){
                        localStorage.removeItem('serverloginauthenticationerror');
                    }
                    $rootScope.$broadcast("userLoginStatusChanged", { loggedIn:false});
                    $scope.$apply(function () {

                        $scope.userfirstnamedisplay="Guest"
                        $scope.loginlogouttext="Login";


                    });
                })*/
        }
        else{
            console.log("you are not signed in anyways");
        }
    }












})



function sendUserDataToServer(formData,$scope,isCreatingUser,$http,callBackFunctionToExecute){




    var updateUrl='http://jayeshkawli.com/airlinetravel/customerdetailsinsert.php';
    if(!isCreatingUser){
        updateUrl='http://jayeshkawli.com/airlinetravel/customerdetailsupdate.php'
    }



    var authTokenInfoFromLocalStorage=JSON.parse(localStorage.getItem('authTokenInfo'));

    $http.post(updateUrl, formData )
        .success(function(data) {

            var serverResponseData=JSON.stringify(data);

            console.log("Server respnded with data"+serverResponseData);

            if(data.success===true){

                if(localStorage.getItem('serverloginauthenticationsuccess')){

                    localStorage.removeItem('serverloginauthenticationsuccess');
                    localStorage.removeItem('authTokenInfo');
                }



                localStorage.setItem( 'serverloginauthenticationsuccess', serverResponseData);
                localStorage.setItem('authTokenInfo',JSON.stringify({'authtoken':data.authorization,'emailaddress':data.emailaddress,firstname:data.firstname,tokenexpirytime:addMinutes(new Date(),30)}));



                callBackFunctionToExecute(data);

            }
            else if (data.success===false){

                alert("User Creation failed with an error -> "+data.errorinfo);
                localStorage.setItem( 'serverregistrationerror', serverResponseData);
                console.log("failture with error "+data.errorinfo);

            }
        }).error(function(errorMessage){
            console.log(errorMessage+ "this error occurred in the process");
            if(!isCreatingUser){
                $scope.$broadcast("SET_MESSAGE_HEADER_FAILURE","Failed to update");
            }
            else{
                $scope.messages = 'Your registration information has been unsuccessfully sent! No try again later...';
            }


        });



    /*
    $http({
        url: updateUrl,
        method: "GET",
        cache:true,
        params: formData,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {


        }).error(function (data, status, headers, config) {



        });
}*/
}


//curl -v  -X GET "https://api.flightstats.com/flex/airports/rest/v1/json/active?appId=9738bcd8&appKey=6c713890a9bf2822f783ab8870332617"
airlinetravelmodule.config(function($httpProvider){
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});



airlinetravelmodule.controller('MyCtrl1', function($scope){

});

/* real global variable */

/*
--var isLoggedInOnConfirmationScreen=false;
--var tripDirection="OneWay";
--var bookbuttontitletext='Book Now';
--var numberOfResultsPerPage=10;

//In progess ->
var getParameteresDictionary={};
 var allFlightsDetail=Array();
 var appendixDictionary={};
 var filteredArrayAfterAirlineSelection=[];
 var tempHolderForAllFlights=[];
var departureDetailsGlobal=[];
var arrivalDetailsglobal=[];

*/



airlinetravelmodule.controller('DetailController',function($scope,$routeParams,$modal,$http,$window,$rootScope,sharedService,getStoredAuthTokenService,openRegistrationDialogueService,loginUserFunction,flightsGlobalParameters,flightsGlobalContainers){

    //This function is to check if we have active internet connection

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

        console.log(isLoggedInAlready + " should say true or false");
        $scope.bookingbuttontitle=isLoggedInAlready?"Update Booking Info and Book":"Login";
        $scope.toshowsecond=!isLoggedInAlready;
    }

    //Call this method on new user registration or upon login new user
    //var updateButtonOnLoginLogoutActions=function(isLoggedIn){

      //  setupButtons(isLoggedIn);

    //}

    $rootScope.$on("userLoginStatusChanged", function (event,loginStatusValue) {
console.log("Login status value is final "+angular.toJson(loginStatusValue));
        //$scope.bookingbuttontitle="asdasdasdasd";
       // setupButtons(loginStatusValue.loggedIn);
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
        $http({
            url: 'http://jayeshkawli.com/airlinetravel/getdelayindexbyparameter.php',
            method: "GET",
            cache:true,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            params: {"airportFSCode":airportFSCodeValue[0]}
        }).success(function (data, status, headers, config) {

            $scope.delayIndexParameters = data['delayIndexes'][0];

            }).error(function (data, status, headers, config) {



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
        $http({
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




                console.log(data+ "returned by the server");


            }).error(function (data, status, headers, config) {



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

            $http.post('http://www.jayeshkawli.com/airlinetravel/finalbookingconfirmation.php', { bookinginformation: dataToSendForBookingConfirmation })
                .success(function(response) {

                console.log(response+ " Successful Response ");

            }).error(function(errorMessage){

                    console.log("Error Occurred "+ errorMessage);

                });
        }
                else{

//console.log("Code "+urlConfirmationCode+"And email address "+data1[0]);
    $http.post('http://www.jayeshkawli.com/airlinetravel/sendpdffiletoemail.php', { emailaddresses: data1[0],confirmationcode:urlConfirmationCode })
        .success(function(response) {

        console.log(response+ " Successful Sent the pdf file on email addresses ");

    }).error(function(errorMessage){

           console.log("Error Occurred "+ errorMessage);

        });
}


            }, function (cancelResult) {

            console.log("dismissed at "+ new Date()+cancelResult);

        }

        );

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





    $scope.checkoutguest=function(){

        //Not sure if it will wotk or now - But will see it
        openRegistrationDialogue(true);

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

            if(Object.keys(preStoredDepartureDetails).length>0 || Object.keys(arrivalDetailsglobal).length>0){
                localStorage.setItem( 'goingoutdetails', JSON.stringify(preStoredDepartureDetails) );
                localStorage.setItem( 'comingindetails', JSON.stringify(arrivalDetailsglobal) );
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
        $http({method: 'GET', url: 'http://www.jayeshkawli.com/airlinetravel/retrievepreviousbookings.php',params:{emailaddress:urlEmailAddress,confirmationcodetoquerywith:urlConfirmationCode}}).
        success(function(data, status, headers, config) {

               console.log("previous reservation data from server ****  "+JSON.stringify(data));
               if(data.success===false){
                   $window.location.href = "#/";
                   sharedService.setProperty(data.message);
                   $rootScope.$broadcast("errorInReservationRetrieval", { });
                   return;
               }
                console.log(urlEmailAddress+ " email address ");
                console.log(urlConfirmationCode+ " confirmation code ");

//Make sure we set airport deep details before any iata code could query on them to get full airport name

                //console.log(JSON.stringify(data.code_names_with_fullform)+ " Airport data with codes and full name");
                flightsGlobalContainers.setAirportsDeepDetailsGlobalParameter(data.code_names_with_fullform);
                //console.log("Now verifying previously stored information "+JSON.stringify(flightsGlobalContainers.getFlightsGlobalContainersParameters()().airportsDeepDetailsGlobal));//.);
                //console.log("Now verifying previously stored information sample "+sharedService.setProperty("Jayesh Kawli"));//.airportsDeepDetailsGlobal);
                //console.log("Now verifying previously stored information sample 2 "+sharedService.getProperty());
                $scope.toshowsendpdfdocbutton=true;


                var passengerbookingdetails=data.booking_details;

                console.log("Passenger booking details in normal form "+JSON.stringify(passengerbookingdetails));

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


                console.log("updated departure  "+passengerbookingdetails.dateofgoingout);
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
            console.log("Error Occurred as following "+ data+ "With status "+status);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }


    if(isBookingNewFlight){
   setupTripDetailsForOneWayFlight();
    }
    else{

        //Retrieve backend booking details from database using confirmation code and user's email address
        retrieveTripDetailsFromBackEnd();
    }

$scope.masa="surmai";
    console.log("One way -->        "+JSON.stringify($scope.fullTravelDetails.departure));
    console.log("Two way -->   "+ JSON.stringify($scope.fullTravelDetails.arrival));
})

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

        console.log(allFlightsDetail.length+ "this was the orifginal length");
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
            console.log(airportCode);
            $scope.airportsDeepDetails[airportCode]=airportsArray[i];

            console.log($scope.airportsDeepDetails[airportCode]);
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
        console.log("Another Web Request with URL "+"http://jayeshkawli.com/airlinetravel/flightsearchapi.php?source="+source+"&destination="+destination+"&leavingdate="+leavingdate+"&comingindate="+comingindate+"&numberofdays="+numberofdays+"&connectiontype="+contype+"&airlinepreferred="+flightsGlobalParameters.getFlightSearchParameters().preferredAirlinesName);
        var start = new Date().getTime();
        $http({method: 'GET', url: 'http://jayeshkawli.com/airlinetravel/flightsearchapi.php?source='+source+"&destination="+destination+"&leavingdate="+leavingdate+"&comingindate="+comingindate+"&numberofdays="+numberofdays+"&connectiontype="+contype+"&airlinepreferred="+flightsGlobalParameters.getFlightSearchParameters().preferredAirlinesName,
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

airlinetravelmodule.controller('upperleftbarcontroller',function($scope){

})

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
    $http({
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
    console.log("date  "+to);

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

        console.log(userHistorydata +" this is previously stored user data");
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
            console.log("naaahhhh");
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


    function sendIPAddressAndGeographicalInformationToServer(geographicalInformationData){
        $http.post('http://www.jayeshkawli.com/airlinetravel/iptogeographicalmappings.php', { ipAddressInformation: geographicalInformationData }
        )
            .success(function(response) {
                console.log("User Geographical Infromation successfully stored in the database with Response "+ response);

            }).error(function(errorMessage){
                console.log("Error Occurred "+ errorMessage);
            });
    }



    var saveIpAddressGeoLocationInformationInDatabase=function(){


        //This is website to get mappings from ipAddress to approximate location
        $http({
            url: "https://freegeoip.net/json/",
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
        console.log("Expected travel direction"+flightsGlobalParameters.getFlightSearchParameters().tripDirection);
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
        $http({
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

            $scope.destinationvisible=true;
            searchStringToPass=$scope.searchStringDestination;
            countryCode=document.getElementById('autocomplete').value;
        }
        if(typeof countryCode ==="undefined"){
            countryCode="";
        }
        var baseUrl='http://jayeshkawli.com/airlinetravel/airportsapi.php?';



        baseUrl=baseUrl+'searchString='+searchStringToPass;

        var start = new Date().getTime();
        $http({method: 'GET', url: 'http://jayeshkawli.com/airlinetravel/airportsapi.php?searchstring='+searchStringToPass+"&countryCode="+countryCode,
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
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    }});
