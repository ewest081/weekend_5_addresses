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

app.controller('SimpleController', ['$scope', '$http', '$window', function($scope, $http, $window){
    $scope.users = [];

    $scope.message = "This is a simple message.";

    function getUsers() {
        $http.get('/api/getUsers').success(function (response) {
            $scope.users = response;
        })
    }

    $scope.getAddresses = function() {
        var clientID = {params: {id: $scope.currentUser}};

        $http.get('/api/getAddress', clientID).then(function(response){
            $scope.addresses = response.data;
            console.log(response)
        });
    };

    getUsers();
}]);

app.controller('OrderController', ['$scope', function($scope){
    $scope.message = "This is an orderly message."
}]);