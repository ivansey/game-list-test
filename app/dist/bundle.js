var listApp = angular.module("listApp", []);
Array.prototype.remove = function (value) {
    var idx = this.indexOf(value);
    if (idx != -1) {
        // Второй параметр - число элементов, которые необходимо удалить
        return this.splice(idx, 1);
    }
    return false;
};
listApp.controller("listController", function ($scope, $http) {
    $scope.db = [];
    $scope.backup = [];
    $scope.limit = 20;
    $scope.data = {
        limit: 20,
    };
    $scope.bookmark = [];
    $scope.category = "";
    $scope.merchant = "";
    $http({ method: "GET", url: "/database.json" }).then(function (data) {
        console.log(data);
        $scope.db = Object.assign({}, data.data);
        $scope.backup = Object.assign({}, data.data);
        var arr = [];
        if ($scope.category !== "") {
            $scope.db.games.map(function (item) {
                if (item.CategoryID.indexOf($scope) !== -1) {
                    arr.push(item);
                }
            });
            console.log(arr);
            $scope.db.games = arr.slice(0);
        }
        $scope.db.games = $scope.db.games.sort(function (a, b) {
            if (a.Name.en > b.Name.en) {
                return 1;
            }
            if (a.Name.en < b.Name.en) {
                return -1;
            }
            return 0;
        });
        arr = [];
        var _loop_1 = function (i) {
            if (localStorage.getItem("bk" + i) !== null) {
                arr.push($scope.db.games.find(function (game) { return game.ID === localStorage.getItem("bk" + i); }));
                console.log(localStorage.getItem("bk" + i));
            }
        };
        for (var i = 0; i <= 4; i++) {
            _loop_1(i);
        }
        $scope.bookmark = arr.slice(0);
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
    $scope.changeCategory = function (id) {
        $scope.category = id;
        var arr = [];
        if ($scope.category !== "") {
            $scope.backup.games.map(function (item) {
                // console.log(`${$scope.category} = ${item.CategoryID[0]} && ${item.CategoryID[1]} && ${item.CategoryID[2]}`)
                // console.log(item.CategoryID.indexOf($scope.category));
                if (item.CategoryID.indexOf($scope.category) !== -1) {
                    arr.push(item);
                    console.log("item");
                }
            });
            // console.log(arr);
            $scope.db.games = arr.slice(0);
            console.log($scope.db.games);
            console.log($scope.backup.games);
        }
    };
    $scope.checkIfGameCard = function (category) {
        console.log(category);
        if ($scope.category === "") {
            return true;
        }
        else if (category.indexOf($scope.category) !== -1) {
            return true;
        }
        return false;
    };
});
//# sourceMappingURL=bundle.js.map