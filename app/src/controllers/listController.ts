listApp.controller("listController", ($scope, $http) => {
    $scope.db = {};
    $scope.limit = 20;
    $scope.data = {
        limit: 20,
    }

    $http({method: "GET", url: "/database.json"}).then((data) => {
        $scope.db = data.data;
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
});