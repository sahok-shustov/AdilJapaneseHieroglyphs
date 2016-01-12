adil.controller('LevelsOfTrainingCtrl', function($scope, $http, $ionicModal, $timeout, $stateParams, $rootScope, $ionicPopup) {
    $scope.circles = [];
    if ($rootScope.userData) {
        $http.get($rootScope.hostAdress + 'level/' + $rootScope.userData.user_id)
        .success(function(data) {
            $scope.circles = data;
            $scope.circles[0].level_user_id_level = "1";
            console.log($scope.circles, "return array");
        }).error(function(data) {});
    }else{
       $http.get($rootScope.hostAdress + 'circles')
        .success(function(data) {
            $scope.circles = data;
            $scope.circles[0].level_user_id_level = "1";
            console.log($scope.circles, "return array");
        }).error(function(data) {}); 
    };

    $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Ошибка входа',
            template: 'Уровень не проплачен'
        });
    };
});
