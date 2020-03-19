let model: object = {};

let listApp = angular.module("listApp", []);
    listApp.controller("listController", ($scope, $http) => {
        $scope.db = {};
        $scope.limit = 20;
        $scope.data = {
            limit: 20,
        }

        $http({method: "GET", url: "/database.json"}).then((data) => {
            $scope.db = data.data;
        })

        $scope.changeLimit = (val) => {
            $scope.limit = parseInt(val);
        }
    });