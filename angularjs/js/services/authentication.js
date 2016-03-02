myapp.factory('Authentication', function($rootScope, $firebaseAuth, FIREBASE_URL, $firebaseObject, $location){
   var ref = new Firebase(FIREBASE_URL);
   var auth = $firebaseAuth(ref);
   
   //event listening for login or authentication.
   auth.$onAuth(function(authUser){
       if(authUser){
           console.log('auth.$onAuth from authentication Service' , authUser);
           
           var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.id);
           var userObj = $firebaseObject(userRef);
           console.log("$firebaseObject using userRef returned" , userObj)
           $rootScope.currentUser = userObj;
       }else{
           $rootScope.currentUser = '';
       }
   });
   
   
   return {
       login: function(user){
           auth.$authWithPassword({
               email : user.email,
               password : user.password
           }).then(function(data){
               console.log('login service success' , data);
               $location.path('/success');
           }).catch(function(err){
               console.log('login service failed', err);
               $rootScope.message = err.message;
           });
       }, // login function
       
       logout : function(){
           return auth.$unauth();
       }, //logout function
       
       requireAuth: function(){
           console.log('requireAuth service returns', auth.$requireAuth());
           return auth.$requireAuth();
       }, //require Authentication
       
       register : function(user){
           auth.$createUser({
               email : user.email,
               password : user.password
           }).then(function(regUser){
               var ref = new Firebase("https://vishaltest.firebaseio.com/user");
               
               var usersRef = ref.child(regUser.uid);
                usersRef.set({
                   date : Firebase.ServerValue.TIMESTAMP,
                   regUser: regUser.uid,
                   firstName : user.firstName,
                   lastName : user.lastName,
                   email : user.email
               });
              /* var ref = regRef.child(regUser.uid)
               ref.set({
                   date : Firebase.ServerValue.TIMESTAMP,
                   regUser: regUser.uid,
                   firstname : user.firstname,
                   lastname : user.lastname,
                   email : user.email
               });*/
               
               $rootScope.message = 'Hi ' + user.firstName + ", Thanks for registering";
           }).catch(function(err){
               console.log("register service failed", err);
               $rootScope.message = "Failed to register " + err.message;
           }); //create user
       } //register user
   }; //return object
}); //factory