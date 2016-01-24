/**
 * Created by lizwestberg on 1/22/16.
 */
var app = angular.module('clientApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/address', {
            templateUrl: 'views/address.html',
            controller: 'AddressController'
        })
        .when('/order', {
            templateUrl: 'views/order.html',
            controller: 'OrderController'
        });
    //$locationProvider.html5Mode(true);
}]);

app.controller('AddressController', ['$scope', '$http', function($scope, $http){
    $scope.users = [];

    function getUsers() {
        $http.get('/api/getUsers').success(function (response) {
            $scope.users = response;
        })
    }

    $scope.getAddresses = function() {
        var clientID = {params: {id: $scope.currentUser}};

        $http.get('/api/getAddress', clientID).then(function(response){
            $scope.addresses = response.data;
        });
    };

    getUsers();
}]);

app.controller('OrderController', ['$scope', '$http', function($scope, $http){
    $scope.message = "This is an orderly message.";
    $scope.users = [];

    function getUsers() {
        $http.get('/api/getUsers').success(function (response) {
            $scope.users = response;
        })
    }

    $scope.getOrders = function(){
        var clientID = {params: {id: $scope.currentUser,
                                earlyDate: $scope.earlyDate.toISOString(),
                                lateDate: $scope.lateDate.toISOString()}
        };

        $http.get('/api/getOrders', clientID).then(function(response){
            $scope.orders = response.data;
        });
    };


    getUsers();
}]);