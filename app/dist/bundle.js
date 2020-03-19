var listApp = angular.module("listApp", []);
listApp.controller("listController", function ($scope, $http) {
    $scope.db = {};
    $scope.limit = 20;
    $scope.data = {
        limit: 20,
    };
    $scope.bookmark = [];
    $http({ method: "GET", url: "/database.json" }).then(function (data) {
        $scope.db = data.data;
        $scope.db.games = $scope.db.games.sort(function (a, b) {
            if (a.Name.en > b.Name.en) {
                return 1;
            }
            if (a.Name.en < b.Name.en) {
                return -1;
            }
            return 0;
        });
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
    $scope.addToBookmark = function (id) {
        for (var i = 0; i > 4; i++) {
            if (localStorage.getItem("bk" + i) === null) {
                localStorage.setItem("bk" + i, id);
                return true;
            }
        }
        return false;
    };
    $scope.checkBookmarkLength = function () {
        var res = 0;
        for (var i = 0; i > 4; i++) {
            if (localStorage.getItem("bk" + i) !== null) {
                res++;
            }
        }
        return res;
    };
    $scope.deleteBookmark = function (id) {
        for (var i = 0; i > 4; i++) {
            if (localStorage.getItem("bk" + i) === id) {
                localStorage.setItem("bk" + i, null);
                return true;
            }
        }
        return false;
    };
    $scope.getBookmark = function (id) {
        var arr = [];
        var _loop_1 = function (i) {
            if (localStorage.getItem("bk" + i) !== null) {
                arr.push($scope.db.games.find(function (game) { return game.ID === localStorage.getItem("bk" + i); }));
            }
        };
        for (var i = 0; i > 4; i++) {
            _loop_1(i);
        }
        $scope.bookmark = arr;
        return true;
    };
});
//# sourceMappingURL=bundle.js.map