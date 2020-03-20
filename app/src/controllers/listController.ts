listApp.controller("listController", ($scope, $http) => {
    $scope.db = [];
    $scope.backup = [];
    $scope.limit = 20;
    $scope.data = {
        limit: 20,
        searchText: "",
    }
    $scope.bookmark = [];
    $scope.category = "";
    $scope.merchant = "";
    $scope.response = "loading";
    $scope.searchText = "";

    $http({method: "GET", url: "/database.json"}).then((data) => {
        $scope.db = Object.assign({}, data.data);
        $scope.backup = Object.assign({}, data.data);
        let arr = [];
        if ($scope.category !== "") {
            $scope.db.games.map((item) => {
                if (item.CategoryID.indexOf($scope) !== -1) {
                    arr.push(item);
                }
            })
            $scope.db.games = arr.slice(0);
        }
        $scope.db.games = $scope.db.games.sort((a, b) => {
            if (a.Name.en > b.Name.en) {
                return 1;
            } 
            if (a.Name.en < b.Name.en) {
                return -1;
            }
            return 0;
        })
        arr = [];
        for (let i = 0; i <= 4; i++) {
            if (localStorage.getItem(`bk${i}`) !== null) {
                arr.push($scope.db.games.find(game => game.ID === localStorage.getItem(`bk${i}`)))
            }
        }
        $scope.bookmark = arr.slice(0);
        $scope.response = "done";
    })

    $scope.changeLimit = (val) => {
        $scope.limit = parseInt(val);
    }

    $scope.incrementLimit = () => {
        $scope.limit = $scope.limit + $scope.limit;
    }

    $scope.changeSearchText = (val) => {
        $scope.searchText = val;
    }

    $scope.sortGames = (field, type) => {
        $scope.response = "loading";
        if (field === "Name") {
            $scope.db.games = $scope.db.games.sort((a, b) => {
                if (type === "+") {
                    if (a.Name.en > b.Name.en) {
                        return 1;
                    } 
                    if (a.Name.en < b.Name.en) {
                        return -1;
                    }
                    return 0;
                } else if (type === "-") {
                    if (a.Name.en < b.Name.en) {
                        return 1;
                    } 
                    if (a.Name.en > b.Name.en) {
                        return -1;
                    }
                    return 0;
                }
            })
        }
        $scope.changeLimit($scope.data.limit);
        $scope.response = "done";
    }

    $scope.addToBookmark = (id) => {
        for (let i = 0; i <= 4; i++) {
            if (localStorage.getItem(`bk${i}`) === null) {
                localStorage.setItem(`bk${i}`, id);
                let arr = [];
                for (let i = 0; i <= 4; i++) {
                    if (localStorage.getItem(`bk${i}`) !== null) {
                        arr.push($scope.db.games.find(game => game.ID === localStorage.getItem(`bk${i}`)))
                    }
                }
                $scope.bookmark = arr;
                return true;
            }
        }
        return false;
    }

    $scope.checkBookmarkLength = () => {
        let res = 0;
        for (let i = 0; i <= 4; i++) {
            if (localStorage.getItem(`bk${i}`) !== null) {
                res++;
            }
        }
        return res;
    }

    $scope.checkBookmark = (id) => {
        for (let i = 0; i <= 4; i++) {
            if (localStorage.getItem(`bk${i}`) === id) {
                return true;
            }
        }
        return false;
    }

    $scope.deleteBookmark = (id) => {
        for (let i = 0; i <= 4; i++) {
            if (localStorage.getItem(`bk${i}`) === id) {
                localStorage.removeItem(`bk${i}`);
                let arr = [];
                for (let i = 0; i <= 4; i++) {
                    if (localStorage.getItem(`bk${i}`) !== null) {
                        arr.push($scope.db.games.find(game => game.ID === localStorage.getItem(`bk${i}`)))
                    }
                }
                $scope.bookmark = arr;
                return true;
            }
        }
        return false;
    }

    $scope.getBookmark = (id) => {
        let arr = [];
        for (let i = 0; i <= 4; i++) {
            if (localStorage.getItem(`bk${i}`) !== null) {
                arr.push($scope.db.games.find(game => game.ID === localStorage.getItem(`bk${i}`)))
            }
        }
        $scope.bookmark = arr;
        return true;
    }

    $scope.changeCategory = (id) => {
        $scope.response = "loading";
        $scope.category = id;
        let arr = [];
        if ($scope.category !== "") {
            $scope.backup.games.map((item) => {
                if (item.CategoryID.indexOf($scope.category) !== -1) {
                    arr.push(item);
                }
            })
            $scope.db.games = arr.slice(0);
        }
        $scope.changeLimit($scope.data.limit);
        $scope.response = "done";
    }

    $scope.changeMerchant = (id) => {
        $scope.response = "loading";
        $scope.merchant = id;
        let arr = [];
        if ($scope.merchant !== "") {
            $scope.backup.games.map((item) => {
                if (item.MerchantID === $scope.merchant) {
                    arr.push(item);
                }
            })
            $scope.db.games = arr.slice(0);
        }
        $scope.changeLimit($scope.data.limit);
        $scope.response = "done";
    }

    $scope.findGame = (text, arr) => {
        let res = [];
        arr.map(game => {
            if (game.Name.en.test(`/${text}/i`) === true) {
                res.push(game);
            }
        })
        if (res.length === 0) {
            return false;
        }
        $scope.changeLimit($scope.data.limit);
        return res;
    }

    $scope.checkIfGameCard = (game, index) => {
        if (game.Name.en.toUpperCase().indexOf($scope.searchText.toUpperCase()) !== -1 || $scope.searchText === "") {
            if (index < $scope.limit) {
                if ($scope.category === "") {
                    if ($scope.merchant === "") {
                        return true;
                    } else if (game.MerchantID === $scope.merchant) {
                        return true;
                    }
                } else if (game.CategoryID.indexOf($scope.category) !== -1) {
                    if ($scope.merchant === "") {
                        return true;
                    } else if (game.MerchantID === $scope.merchant) {
                        return true;
                    }
                }
            }
        }      
        return false;
    }
});