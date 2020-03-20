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
        searchText: "",
    };
    $scope.bookmark = [];
    $scope.category = "";
    $scope.merchant = "";
    $scope.response = "loading";
    $scope.searchText = "";
    $http({ method: "GET", url: "/database.json" }).then(function (data) {
        $scope.db = Object.assign({}, data.data);
        $scope.backup = Object.assign({}, data.data);
        var arr = [];
        if ($scope.category !== "") {
            $scope.db.games.map(function (item) {
                if (item.CategoryID.indexOf($scope) !== -1) {
                    arr.push(item);
                }
            });
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
            }
        };
        for (var i = 0; i <= 4; i++) {
            _loop_1(i);
        }
        $scope.bookmark = arr.slice(0);
        $scope.response = "done";
    });
    $scope.changeLimit = function (val) {
        $scope.limit = parseInt(val);
    };
    $scope.incrementLimit = function () {
        $scope.limit = $scope.limit + $scope.limit;
    };
    $scope.changeSearchText = function (val) {
        $scope.searchText = val;
    };
    $scope.sortGames = function (field, type) {
        $scope.response = "loading";
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
        $scope.changeLimit($scope.data.limit);
        $scope.response = "done";
    };
    $scope.addToBookmark = function (id) {
        for (var i = 0; i <= 4; i++) {
            if (localStorage.getItem("bk" + i) === null) {
                localStorage.setItem("bk" + i, id);
                var arr = [];
                var _loop_2 = function (i_1) {
                    if (localStorage.getItem("bk" + i_1) !== null) {
                        arr.push($scope.db.games.find(function (game) { return game.ID === localStorage.getItem("bk" + i_1); }));
                    }
                };
                for (var i_1 = 0; i_1 <= 4; i_1++) {
                    _loop_2(i_1);
                }
                $scope.bookmark = arr;
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
                    }
                };
                for (var i_2 = 0; i_2 <= 4; i_2++) {
                    _loop_3(i_2);
                }
                $scope.bookmark = arr;
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
            }
        };
        for (var i = 0; i <= 4; i++) {
            _loop_4(i);
        }
        $scope.bookmark = arr;
        return true;
    };
    $scope.changeCategory = function (id) {
        $scope.response = "loading";
        $scope.category = id;
        var arr = [];
        if ($scope.category !== "") {
            $scope.backup.games.map(function (item) {
                if (item.CategoryID.indexOf($scope.category) !== -1) {
                    arr.push(item);
                }
            });
            $scope.db.games = arr.slice(0);
        }
        $scope.changeLimit($scope.data.limit);
        $scope.response = "done";
    };
    $scope.changeMerchant = function (id) {
        $scope.response = "loading";
        $scope.merchant = id;
        var arr = [];
        if ($scope.merchant !== "") {
            $scope.backup.games.map(function (item) {
                if (item.MerchantID === $scope.merchant) {
                    arr.push(item);
                }
            });
            $scope.db.games = arr.slice(0);
        }
        $scope.changeLimit($scope.data.limit);
        $scope.response = "done";
    };
    $scope.findGame = function (text, arr) {
        var res = [];
        arr.map(function (game) {
            if (game.Name.en.test("/" + text + "/i") === true) {
                res.push(game);
            }
        });
        if (res.length === 0) {
            return false;
        }
        $scope.changeLimit($scope.data.limit);
        return res;
    };
    $scope.checkIfGameCard = function (game, index) {
        if (game.Name.en.toUpperCase().indexOf($scope.searchText.toUpperCase()) !== -1 || $scope.searchText === "") {
            if (index < $scope.limit) {
                if ($scope.category === "") {
                    if ($scope.merchant === "") {
                        return true;
                    }
                    else if (game.MerchantID === $scope.merchant) {
                        return true;
                    }
                }
                else if (game.CategoryID.indexOf($scope.category) !== -1) {
                    if ($scope.merchant === "") {
                        return true;
                    }
                    else if (game.MerchantID === $scope.merchant) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
});
//# sourceMappingURL=bundle.js.map