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
        console.log($scope.db.categories[0].Trans.ru)
        let arr = [];
        for (let i = 0; i <= 4; i++) {
            if (localStorage.getItem(`bk${i}`) !== null) {
                arr.push($scope.db.games.find(game => game.ID === localStorage.getItem(`bk${i}`)))
                console.log(localStorage.getItem(`bk${i}`))
            }
        }
        $scope.bookmark = arr;
        console.log(arr)
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
        console.log(id)
        for (let i = 0; i <= 4; i++) {
            console.log(`bk${i}`)
            if (localStorage.getItem(`bk${i}`) === null) {
                localStorage.setItem(`bk${i}`, id);
                console.log("ok")
                let arr = [];
                for (let i = 0; i <= 4; i++) {
                    if (localStorage.getItem(`bk${i}`) !== null) {
                        arr.push($scope.db.games.find(game => game.ID === localStorage.getItem(`bk${i}`)))
                        console.log(localStorage.getItem(`bk${i}`))
                    }
                }
                $scope.bookmark = arr;
                console.log(arr)
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
                        console.log(localStorage.getItem(`bk${i}`))
                    }
                }
                $scope.bookmark = arr;
                console.log(arr)
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
                console.log(localStorage.getItem(`bk${i}`))
            }
        }
        $scope.bookmark = arr;
        console.log(arr)
        return true;
    }
});