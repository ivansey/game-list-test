let model: object = {};

let listApp = angular.module("listApp", []);
    listApp.controller("listController", ($scope, $http) => {
        $scope.db = {};
        $http({method: "GET", url: "/database.json"}).then((data) => {
            $scope.db = data.data;
        })
    });