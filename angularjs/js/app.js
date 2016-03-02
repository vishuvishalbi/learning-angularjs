var myapp = angular.module('angularapp', ['ngResource' , 'ngRoute', 'firebase'])
    .constant('FIREBASE_URL','https://vishaltest.firebaseio.com/')
    .run(function($rootScope, $location){
        $rootScope.$on('$routeChangeError', function(event, next , previous , error){
            if(error == 'AUTH_REQUIRED'){
                $rootScope.message = 'Sorry, You Must Be log in to access this page';
                $location.path('/login')
            }// if auth required
        }); //event info
    }) //run
    .config(function($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'loginCtrl'
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'registerCtrl'
            })
            .when('/home', {
                templateUrl: 'views/main.html',
                controller: 'mainCtrl'
            }).when('/success', {
                templateUrl: 'views/success.html',
                controller : 'successCtrl',
                resolve : {
                    currentAuth : function(Authentication){
                        return Authentication.requireAuth();
                    }
                }
            })
            .otherwise({
                redirectTo: '/login'
            });
    });

myapp.controller('navCtrl', function($scope, $location , Authentication) {

    console.log($location.path().split("/")[1]);
    if (typeof $location.path().split("/")[1] !== 'undefined') {
        $scope[$location.path().split("/")[1] + "Active"] = 'active';
    }
    else {
        $scope.homeActive = 'active';
    }
    $scope.navClick = function(evt) {
        angular.element('.nav > li').removeClass();
        angular.element(evt.target.parentElement).addClass('active');
        console.log(evt);
    }
    
    $scope.logout =function(){
        Authentication.logout();
    }
});