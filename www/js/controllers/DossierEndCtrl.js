adil.controller('DossierEndCtrl', function($scope, $ionicModal, $timeout, $stateParams, $http, $rootScope) {
  $http.get($rootScope.hostAdress + "/learnedieroglif/" + $rootScope.userData.user_id)
   .success(function(respons) {
            $scope.learnedieroglif = respons.count;
            $scope.id_level = $stateParams.id_level;
        })
        .error(function(respons) {});

    $scope.CheckTest = function() {
        $http.get($rootScope.hostAdress + "/ieroglifpagination/" + $stateParams.id_level + '/' + $rootScope.userData.user_id)
            .success(function(respons) {
                console.log("$scope.CheckTest", respons);
                angular.forEach(respons, function(value, key) {
                    if (value.learned == "false") {
                        // console.log("УРА!!! НАШЛОСЯЯЯЯЯЯ FALSE!!!!", key);
                        $location.path('app/hieroglyphslevel/' + $stateParams.id_level);
                        // $scope.pathToResults = "#/app/testresults/";
                    } else {
                        $location.path('app/test/' + $stateParams.id_level);
                    }
                });
                console.log("kolVoprosov");

            })
            .error(function(respons) {});
    }
});