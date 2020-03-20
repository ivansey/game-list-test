listApp.controller("listController", ($scope, $http) => {
    $scope.db = [];
    $scope.backup = [];
    $scope.limit = 20;
    $scope.data = {
        limit: 20,
    }
    $scope.bookmark = [];
    $scope.category = "";
    $scope.merchant = "";

    $http({method: "GET", url: "/database.json"}).then((data) => {
        console.log(data)
        $scope.db = Object.assign({}, data.data);
        $scope.backup = Object.assign({}, data.data);
        let arr = [];
        if ($scope.category !== "") {
            $scope.db.games.map((item) => {
                if (item.CategoryID.indexOf($scope) !== -1) {
                    arr.push(item);
                }
            })
            console.log(arr)
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
                console.log(localStorage.getItem(`bk${i}`))
            }
        }
        $scope.bookmark = arr.slice(0);
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

    $scope.changeCategory = (id) => {
        $scope.category = id;
        let arr = [];
        if ($scope.category !== "") {
            $scope.backup.games.map((item) => {
                // console.log(`${$scope.category} = ${item.CategoryID[0]} && ${item.CategoryID[1]} && ${item.CategoryID[2]}`)
                // console.log(item.CategoryID.indexOf($scope.category));
                if (item.CategoryID.indexOf($scope.category) !== -1) {
                    arr.push(item);
                    console.log("item");
                }
            })
            // console.log(arr);
            $scope.db.games = arr.slice(0);
            console.log($scope.db.games);
            console.log($scope.backup.games);
        }
    }

    $scope.checkIfGameCard = (category) => {
        console.log(category);
        if ($scope.category === "") {
            return true;
        } else if (category.indexOf($scope.category) !== -1) {
            return true;
        }        
        return false;
    }
});