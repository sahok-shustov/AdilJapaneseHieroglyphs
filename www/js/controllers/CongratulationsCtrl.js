adil.controller('CongratulationsCtrl', function($scope, $rootScope, $ionicModal, $stateParams, $http, $timeout) {
    $timeout(function() {
        $rootScope.checkToInet();
    });

    $scope.id_level = $stateParams.id_level;
})
