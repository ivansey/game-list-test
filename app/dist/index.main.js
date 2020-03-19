var model = {};
var listApp = angular.module("listApp", []);
listApp.controller("listController", function ($scope, $http) {
    $scope.db = {};
    $scope.limit = 20;
    $scope.data = {
        limit: 20,
    };
    $http({ method: "GET", url: "/database.json" }).then(function (data) {
        $scope.db = data.data;
    });
    $scope.changeLimit = function (val) {
        $scope.limit = parseInt(val);
    };
});
//# sourceMappingURL=index.main.js.map