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
    $scope.sortGames = function (field, type) {
        if (field === "Name") {
            $scope.db.games = $scope.db.games.sort(function (a, b) {
                if (type === "+") {
                    if (a.Name.en > b.Name.en) {
                        return 1;
                    }
                    if (a.Name.en < b.Name.en) {
                        return -1;
                    }
                    return 0;
                }
                else if (type === "-") {
                    if (a.Name.en < b.Name.en) {
                        return 1;
                    }
                    if (a.Name.en > b.Name.en) {
                        return -1;
                    }
                    return 0;
                }
            });
        }
    };
});
//# sourceMappingURL=bundle.js.map