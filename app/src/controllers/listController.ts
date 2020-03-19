listApp.controller("listController", ($scope, $http) => {
    $scope.db = {};
    $scope.limit = 20;
    $scope.data = {
        limit: 20,
    }
    $scope.bookmark = [];

    $http({method: "GET", url: "/database.json"}).then((data) => {
        $scope.db = data.data;
        $scope.db.games = $scope.db.games.sort((a, b) => {
            if (a.Name.en > b.Name.en) {
                return 1;
            } 
            if (a.Name.en < b.Name.en) {
                return -1;
            }
            return 0;
        })
    })

    $scope.changeLimit = (val) => {
        $scope.limit = parseInt(val);
    }

    $scope.sortGames = (field, type) => {
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
    }

    $scope.addToBookmark = (id) => {
        for (let i = 0; i > 4; i++) {
            if (localStorage.getItem(`bk${i}`) === null) {
                localStorage.setItem(`bk${i}`, id);
                return true;
            }
        }
        return false;
    }

    $scope.checkBookmarkLength = () => {
        let res = 0;
        for (let i = 0; i > 4; i++) {
            if (localStorage.getItem(`bk${i}`) !== null) {
                res++;
            }
        }
        return res;
    }

    $scope.deleteBookmark = (id) => {
        for (let i = 0; i > 4; i++) {
            if (localStorage.getItem(`bk${i}`) === id) {
                localStorage.setItem(`bk${i}`, null);
                return true;
            }
        }
        return false;
    }

    $scope.getBookmark = (id) => {
        let arr = [];
        for (let i = 0; i > 4; i++) {
            if (localStorage.getItem(`bk${i}`) !== null) {
                arr.push($scope.db.games.find(game => game.ID === localStorage.getItem(`bk${i}`)))
            }
        }
        $scope.bookmark = arr;
        return true;
    }
});