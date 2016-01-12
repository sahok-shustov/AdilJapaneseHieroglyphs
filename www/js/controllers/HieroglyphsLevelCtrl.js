adil.controller('HieroglyphsLevelCtrl', function($scope, $ionicModal, $timeout, $stateParams, $http, $rootScope) {
$scope.circleDayOnes = [];

if ($rootScope.userData) {
   $http.get($rootScope.hostAdress + 'ieroglifpagination/' + $stateParams.id_level + '/' + $rootScope.userData.user_id + '/1')
        .success(function(data){
            $scope.circleDayOnes = data;
            console.log($scope.circleDayOnes);
            console.log($scope.circleDayOnes[0].learned);
            $scope.id_level = $stateParams.id_level;
        }).error(function(data){
        });

  $scope.circleDayTwo = [];
$http.get($rootScope.hostAdress + 'ieroglifpagination/' + $stateParams.id_level + '/' + $rootScope.userData.user_id + '/2')
        .success(function(data){
            $scope.circleDayTwo = data;
        }).error(function(data){
        });

        $scope.circleDayThree = [];
$http.get($rootScope.hostAdress + 'ieroglifpagination/' + $stateParams.id_level + '/' + $rootScope.userData.user_id + '/3')
        .success(function(data){
            $scope.circleDayThree = data;
        }).error(function(data){
        });

        $scope.circleDayFour = [];
$http.get($rootScope.hostAdress + 'ieroglifpagination/' + $stateParams.id_level + '/' + $rootScope.userData.user_id + '/4')
        .success(function(data){
            $scope.circleDayFour = data;
        }).error(function(data){
        }); 
    }else{
        $http.get($rootScope.hostAdress + 'ieroglifpaginationnouser/' + $stateParams.id_level + '/1')
        .success(function(data){
            $scope.circleDayOnes = data;
            console.log($scope.circleDayOnes);
            console.log($scope.circleDayOnes[0].learned);
            $scope.id_level = $stateParams.id_level;
        }).error(function(data){
        });

  $scope.circleDayTwo = [];
$http.get($rootScope.hostAdress + 'ieroglifpaginationnouser/' + $stateParams.id_level + '/2')
        .success(function(data){
            $scope.circleDayTwo = data;
        }).error(function(data){
        });

        $scope.circleDayThree = [];
$http.get($rootScope.hostAdress + 'ieroglifpaginationnouser/' + $stateParams.id_level + '/3')
        .success(function(data){
            $scope.circleDayThree = data;
        }).error(function(data){
        });

        $scope.circleDayFour = [];
$http.get($rootScope.hostAdress + 'ieroglifpaginationnouser/' + $stateParams.id_level + '/4')
        .success(function(data){
            $scope.circleDayFour = data;
        }).error(function(data){
        });
    };
    
});
