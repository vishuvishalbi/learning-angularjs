myapp.controller('registerCtrl', function($scope , $firebase, Authentication) {
    $scope.page = "This is main page";
    $scope.register = function(){
        Authentication.register($scope.user);
    }
});