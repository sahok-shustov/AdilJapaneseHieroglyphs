adil.controller('DossierEndCtrl', function($scope, $ionicModal, $timeout, $stateParams, $http, $rootScope, $location) {
    $timeout(function() {
        $rootScope.checkToInet();
    });

    $http.get($rootScope.hostAdress + "/learnedieroglif/" + $rootScope.userData.user_id)
        .success(function(respons) {
            $scope.learnedieroglif = respons.count;
            $scope.id_level = $stateParams.id_level;
        })
        .error(function(respons) {});

    $scope.checkTest = function() {
        $http.get($rootScope.hostAdress + "/ieroglifpagination/" + $stateParams.id_level + '/' + $rootScope.userData.user_id)
            .success(function(respons) {
                console.log("$scope.checkTest", respons);
                var goToTest = true;
                angular.forEach(respons, function(value, key) {
                    if (value.learned == "false") {
                        console.log("УПС!!! НАШЛОСЯЯЯЯЯЯ FALSE!!!! НА ТЕСТЫ НЕ ИДЁМ!!!", key);
                        goToTest = false;
                    };
                });

                if (goToTest) {
                    $location.path('app/test/' + $stateParams.id_level);
                    console.log("УРА!!! НАШЛОСЯЯЯЯЯЯ TRUE!!!!", key);
                } else {
                    $location.path('app/hieroglyphslevel/' + $stateParams.id_level);

                };
            })
            .error(function(respons) {});
    }
});
