adil.controller('TestResultsCtrl', function($scope, $ionicModal, $timeout, $stateParams, $http, $rootScope) {
    $scope.id_level = $stateParams.id_level;

    $scope.circleDayOnes = [];
    $http.get($rootScope.hostAdress + 'testall/' + $stateParams.id_level + '/' + $rootScope.userData.user_id + '/1')
        .success(function(data) {
            $scope.circleDayOnes = data;
            console.log($scope.circleDayOnes);
        }).error(function(data) {});

    $scope.circleDayTwo = [];
    $http.get($rootScope.hostAdress + 'testall/' + $stateParams.id_level + '/' + $rootScope.userData.user_id + '/2')
        .success(function(data) {
            $scope.circleDayTwo = data;
        }).error(function(data) {});

    $scope.circleDayThree = [];
    $http.get($rootScope.hostAdress + 'testall/' + $stateParams.id_level + '/' + $rootScope.userData.user_id + '/3')
        .success(function(data) {
            $scope.circleDayThree = data;
        }).error(function(data) {});

    $scope.circleDayFour = [];
    $http.get($rootScope.hostAdress + 'testall/' + $stateParams.id_level + '/' + $rootScope.userData.user_id + '/4')
        .success(function(data) {
            $scope.circleDayFour = data;
        }).error(function(data) {});
});
