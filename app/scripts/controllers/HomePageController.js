/**
 * Created by jayeshkawli on 7/26/14.
 */

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

            /*  $http({
             url: "http://jayeshkawli.com/airlinetravel/generatenewtoken.php",
             method: "GET",
             cache:true,
             params: prevAuthData,
             headers: {'Content-Type': 'application/x-www-form-urlencoded'}
             }).success(function (data, status, headers, config) {

             if(data.success==true){

             data.tokenexpirytime=addMinutes(new Date(),30);
             data.firstname=previousFirstName;
             localStorage.setItem('authTokenInfo',JSON.stringify(data));
             setUserFirstNameOnDisplay();
             }
             else if(data.success==false){
             loguserinwithmodalview();

             }
             }).error(function (data, status, headers, config) {
             console.log("Token regenration failer with response: "+ data+ "And status code "+status);

             });

             */
            sendDataToServer("GET",BASE_URL+'generatenewtoken.php',prevAuthData,$http,function(serverResponseData){
                if(serverResponseData.success==true){

                    serverResponseData.tokenexpirytime=addMinutes(new Date(),30);
                    serverResponseData.firstname=previousFirstName;
                    localStorage.setItem('authTokenInfo',JSON.stringify(serverResponseData));
                    setUserFirstNameOnDisplay();
                }
                else if(serverResponseData.success==false){
                    loguserinwithmodalview();

                }

            },function(failureMessage,status,headers,config){
                console.log("Token regenration failer with response: "+ failureMessage+ " And status code "+status);


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

        showHideRetrieveReservationBox();

    }



    var showHideRetrieveReservationBox=function(){
        $scope.toRememberSelection=false;


        if(!$scope.toShowDropdownMenuForResrevationRetrieval){
            if(localStorage.getItem('recordlocatorcode')){

                $scope.recordlocator=JSON.parse(localStorage.getItem('recordlocatorcode')).confirmationCode;
                currentConfirmationCodeLength=$scope.recordlocator.length;
                $scope.bookingretrievalemail=JSON.parse(localStorage.getItem('recordlocatorcode')).emailaddress;
                console.log("To save reservation details");

                $scope.toRememberSelection=true;
            }



        }
        $scope.toShowDropdownMenuForResrevationRetrieval=!$scope.toShowDropdownMenuForResrevationRetrieval;
        $scope.toDisableSubmitButton=!(currentConfirmationCodeLength==7);
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
        else if(String.fromCharCode(keyEvent.keyCode) &&(keyEvent.keyCode>=48 && keyEvent.keyCode<=90)){
            currentConfirmationCodeLength+=1;
        }
        $scope.confirmationCodeLengthErrorDisplay=(currentConfirmationCodeLength>7);

        $scope.toDisableSubmitButton=!(currentConfirmationCodeLength==7);
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
            /*   $http({
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
             flightsGlobalParameters.setIsLoggedInParameter(true);// isLoggedInOnConfirmationScreen=true;
             localStorage.setItem( 'serverloginauthenticationsuccess', serverResponseData);
             localStorage.setItem('authTokenInfo',JSON.stringify({authtoken:data.authorization,emailaddress:data.emailaddress,firstname:data.firstname,tokenexpirytime:addMinutes(new Date(),30)}));
             setUserFirstNameOnDisplay();

             //Now if user is on main flight details page, just update button status in order to allow
             //change in login status
             $rootScope.$broadcast("userLoginStatusChanged", { loggedIn:true});
             $modalInstance.close(data);
             }
             else if (data.success===false){
             $scope.errorMessage=data.errorinfo
             $scope.errorResolutionMessage = "Please select forgot password option if you have forgotten your email address";
             setUserFirstNameOnDisplay();
             localStorage.setItem( 'serverloginauthenticationerror', serverResponseData);
             }
             })
             .error(function (data, status, headers, config) {

             $scope.errorMessage="Login Failed with an error. Please try again "+angular.toJson(data);
             localStorage.setItem( 'serverloginerror', JSON.stringify(data));
             $scope.messages = 'Your registration information has been unsuccessfully sent! No try again later...';

             });*/


            sendDataToServer("GET",BASE_URL+'userlogin.php',userLoginInfo,$http,function(serverResponseDataForLogin){

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
                var serverResponseData = JSON.stringify(serverResponseDataForLogin);
                if(serverResponseDataForLogin.success===true){
                    if(localStorage.getItem('serverloginauthenticationsuccess')){

                        localStorage.removeItem('serverloginauthenticationsuccess');
                        localStorage.removeItem('authTokenInfo');

                    }
                    flightsGlobalParameters.setIsLoggedInParameter(true);// isLoggedInOnConfirmationScreen=true;
                    localStorage.setItem( 'serverloginauthenticationsuccess', serverResponseData);
                    localStorage.setItem('authTokenInfo',JSON.stringify({authtoken:serverResponseDataForLogin.authorization,emailaddress:serverResponseDataForLogin.emailaddress,firstname:serverResponseDataForLogin.firstname,tokenexpirytime:addMinutes(new Date(),30)}));
                    setUserFirstNameOnDisplay();

                    //Now if user is on main flight details page, just update button status in order to allow
                    //change in login status
                    $rootScope.$broadcast("userLoginStatusChanged", { loggedIn:true});
                    $modalInstance.close(serverResponseDataForLogin);
                }

                else if (serverResponseDataForLogin.success===false){
                    $scope.errorMessage=serverResponseDataForLogin.errorinfo
                    $scope.errorResolutionMessage = "Please select forgot password option if you have forgotten your email address";
                    setUserFirstNameOnDisplay();
                    localStorage.setItem( 'serverloginauthenticationerror', serverResponseData);
                }

            },function(failureMessage,status,headers,config){
                $scope.errorMessage="Login Failed with an error. Please try again "+angular.toJson(failureMessage);
                localStorage.setItem( 'serverloginerror', JSON.stringify(failureMessage));
                $scope.messages = 'Your registration information has been unsuccessfully sent! No try again later...';


            });



        }




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
        console.log(form.$invalid + " Form Validation status ");
        if(form.$invalid){
            return;
        }
//Now make call to remote script to send an email to user with forgotten password information
        /*
         $http.post('http://www.jayeshkawli.com/airlinetravel/sendforgotpasswordtoemail.php', { emailorusernametosend: emailorusername })
         .success(function(response) {

         console.log(response);
         $scope.messageFromServer=response.message;

         }).error(function(errorMessage){
         console.log("Error Occurred "+ errorMessage);

         });*/

        sendDataToServer("POST",BASE_URL+'sendforgotpasswordtoemail.php',
            { emailorusernametosend: emailorusername }
            ,$http,function(successfulResponse){
                console.log(" Successful Response "+successfulResponse);
                $scope.messageFromServer=successfulResponse.message;
            },function(failureMessage){
                console.log("Error Occurred "+ failureMessage);
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

//To add code to send Auth token along with user email address for extra verification

            /* $http.post("http://www.jayeshkawli.com/airlinetravel/userlogout.php",  { emailaddressofuser: storedAuthData.emailaddress,'Authorization':storedAuthData.authtoken} )
             .success(function(data) {

             //Remove all temporary local storage from database and change name to Hello Guest on top nav bar

             console.log(data + " Message from the server while logging user out ");
             localStorage.removeItem('authTokenInfo');
             localStorage.removeItem('serverloginauthenticationsuccess');

             if(localStorage.getItem('serverloginauthenticationerror')){
             localStorage.removeItem('serverloginauthenticationerror');
             }
             $rootScope.$broadcast("userLoginStatusChanged", { loggedIn:false});


             $scope.userfirstnamedisplay="Guest"
             $scope.loginlogouttext="Login";





             }).error(function(errorMessage){


             console.log("Error "+ errorMessage+ " Occurred while logging user out of the account");

             });*/

            sendDataToServer("POST",BASE_URL+'userlogout.php',
                { emailaddressofuser: storedAuthData.emailaddress,'Authorization':storedAuthData.authtoken},$http
                ,function(successfulResponse){
                    //Remove all temporary local storage from database and change name to Hello Guest on top nav bar

                    console.log(successfulResponse + " Message from the server while logging user out ");
                    localStorage.removeItem('authTokenInfo');
                    localStorage.removeItem('serverloginauthenticationsuccess');

                    if(localStorage.getItem('serverloginauthenticationerror')){
                        localStorage.removeItem('serverloginauthenticationerror');
                    }
                    $rootScope.$broadcast("userLoginStatusChanged", { loggedIn:false});


                    $scope.userfirstnamedisplay="Guest"
                    $scope.loginlogouttext="Login";


                },function(failureMessage){
                    console.log("Error "+ failureMessage+ " Occurred while logging user out of the account");
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

});