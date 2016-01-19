adil.controller('PersonalAreaCtrl', function($scope, $ionicModal, $timeout, $stateParams, $http, $rootScope) {
    $timeout(function() {
        $rootScope.checkToInet();
    });

    $http.get($rootScope.hostAdress + 'learnedieroglif/' + $rootScope.userData.user_id)
        .success(function(data) {
            $scope.learnedieroglif = data.count;
            console.log("$scope.learnedieroglif", $scope.learnedieroglif);
        }).error(function(data) {});

    $http.get($rootScope.hostAdress + 'endtest/' + $rootScope.userData.user_id)
        .success(function(respons) {
            if (respons.end_test) {
                $scope.endTest = respons.end_test;
                console.log("$scope.endTest", $scope.endTest);
            } else {
                $scope.endTest = 0;
                console.log("$scope.endTest", $scope.endTest);
            };

        }).error(function(data) {});


});
