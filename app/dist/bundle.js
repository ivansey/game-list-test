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
        console.log($scope.db.categories[0].Trans.ru);
        var arr = [];
        var _loop_1 = function (i) {
            if (localStorage.getItem("bk" + i) !== null) {
                arr.push($scope.db.games.find(function (game) { return game.ID === localStorage.getItem("bk" + i); }));
                console.log(localStorage.getItem("bk" + i));
            }
        };
        for (var i = 0; i <= 4; i++) {
            _loop_1(i);
        }
        $scope.bookmark = arr;
        console.log(arr);
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
        console.log(id);
        for (var i = 0; i <= 4; i++) {
            console.log("bk" + i);
            if (localStorage.getItem("bk" + i) === null) {
                localStorage.setItem("bk" + i, id);
                console.log("ok");
                var arr = [];
                var _loop_2 = function (i_1) {
                    if (localStorage.getItem("bk" + i_1) !== null) {
                        arr.push($scope.db.games.find(function (game) { return game.ID === localStorage.getItem("bk" + i_1); }));
                        console.log(localStorage.getItem("bk" + i_1));
                    }
                };
                for (var i_1 = 0; i_1 <= 4; i_1++) {
                    _loop_2(i_1);
                }
                $scope.bookmark = arr;
                console.log(arr);
                return true;
            }
        }
        return false;
    };
    $scope.checkBookmarkLength = function () {
        var res = 0;
        for (var i = 0; i <= 4; i++) {
            if (localStorage.getItem("bk" + i) !== null) {
                res++;
            }
        }
        return res;
    };
    $scope.checkBookmark = function (id) {
        for (var i = 0; i <= 4; i++) {
            if (localStorage.getItem("bk" + i) === id) {
                return true;
            }
        }
        return false;
    };
    $scope.deleteBookmark = function (id) {
        for (var i = 0; i <= 4; i++) {
            if (localStorage.getItem("bk" + i) === id) {
                localStorage.removeItem("bk" + i);
                var arr = [];
                var _loop_3 = function (i_2) {
                    if (localStorage.getItem("bk" + i_2) !== null) {
                        arr.push($scope.db.games.find(function (game) { return game.ID === localStorage.getItem("bk" + i_2); }));
                        console.log(localStorage.getItem("bk" + i_2));
                    }
                };
                for (var i_2 = 0; i_2 <= 4; i_2++) {
                    _loop_3(i_2);
                }
                $scope.bookmark = arr;
                console.log(arr);
                return true;
            }
        }
        return false;
    };
    $scope.getBookmark = function (id) {
        var arr = [];
        var _loop_4 = function (i) {
            if (localStorage.getItem("bk" + i) !== null) {
                arr.push($scope.db.games.find(function (game) { return game.ID === localStorage.getItem("bk" + i); }));
                console.log(localStorage.getItem("bk" + i));
            }
        };
        for (var i = 0; i <= 4; i++) {
            _loop_4(i);
        }
        $scope.bookmark = arr;
        console.log(arr);
        return true;
    };
});
//# sourceMappingURL=bundle.js.map