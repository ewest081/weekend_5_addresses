/**
 * Created by lizwestberg on 1/22/16.
 */
var app = angular.module('clientApp', []);

app.controller('MainController', ['$scope', function($scope){
    $scope.message = "Hey There!";
}]);