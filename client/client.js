/**
 * Created by lizwestberg on 1/22/16.
 */
var app = angular.module('clientApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/simple', {
            templateUrl: 'views/simple.html',
            controller: 'SimpleController'
        })
        .when('/order', {
            templateUrl: 'views/order.html',
            controller: 'OrderController'
        });
    //$locationProvider.html5Mode(true);
}]);

app.controller('SimpleController', ['$scope', '$http', function($scope, $http){
    $scope.users = [];

    $scope.message = "This is a simple message.";

    function getUsers() {
        $http.get('/dbRoute/getUsers').success(function (response) {
            $scope.users = response;
        })
    }

    $scope.currentUser;

    $scope.getAddress = function() {
        console.log(currentUser);
    };

    getUsers();
}]);

app.controller('OrderController', ['$scope', function($scope){
    $scope.message = "This is an orderly message."
}]);