adil.controller('PersonalAreaCtrl', function($scope, $ionicModal, $timeout, $stateParams, $http, $rootScope) {

    $http.get($rootScope.hostAdress + 'learnedieroglif/' + $rootScope.userData.user_id)
        .success(function(data){
            $scope.learnedieroglif = data.count;
            console.log($scope.learnedieroglif);
        }).error(function(data){
        });

    $http.get($rootScope.hostAdress + 'endtest/' + $rootScope.userData.user_id)
        .success(function(respons) {
            $scope.endTest = respons.end_test;
            console.log($scope.endTest);
        }).error(function(data){
        });


});
