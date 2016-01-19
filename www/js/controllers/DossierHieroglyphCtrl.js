adil.controller('DossierHieroglyphCtrl', function($scope, $ionicModal, $timeout, $stateParams, $http, $rootScope) {
    $timeout(function() {
        $rootScope.checkToInet();
    });

    $scope.gifImage = [];
    $scope.learned = [];

    $http.get($rootScope.hostAdress + 'ieroglif/' + $stateParams.id_hieroglyph)
        .success(function(data) {
            $scope.gifImage = data;
            console.log("qew", $scope.gifImage);
        }).error(function(data) {});

    $scope.learned = function() {
        console.log("return learned --- $rootScope.userData.user_id", $rootScope.userData.user_id);
        console.log("return learned --- $stateParams.id_hieroglyph", $stateParams.id_hieroglyph);
        $http.get($rootScope.hostAdress + 'learned/' + $rootScope.userData.user_id + '/' + $stateParams.id_hieroglyph, {}).success(function(data) {
            $scope.learned = data;
            console.log("return learned", $scope.learned);
            // $scope.learned = 'true';
            // console.log($scope.learned);
        }).error(function(data) {});
    };
});
