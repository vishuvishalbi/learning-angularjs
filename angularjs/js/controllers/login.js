myapp.controller('loginCtrl', function($scope, $firebaseAuth, Authentication) {

    $scope.page = "login";

    $scope.login = function(){ 
        Authentication.login($scope.user);
    };
    
    $scope.logout = function(){
        Authentication.logout();
    }
});