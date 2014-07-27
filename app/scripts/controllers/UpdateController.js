/**
 * Created by jayeshkawli on 7/26/14.
 */

airlinetravelmodule.controller('userupdatecontroller',function($scope){


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