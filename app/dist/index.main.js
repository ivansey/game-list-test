var model = {};
var listApp = angular.module("listApp", []);
listApp.controller("listController", function ($scope, $http) {
    $scope.db = {};
    $http({ method: "GET", url: "/database.json" }).then(function (data) {
        $scope.db = data.data;
    });
});
//# sourceMappingURL=index.main.js.map