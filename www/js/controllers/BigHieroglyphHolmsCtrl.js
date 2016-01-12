adil.controller('BigHieroglyphHolmsCtrl', function($scope, $rootScope, $ionicModal, $stateParams, $http) {

        $ionicModal.fromTemplateUrl('templates/Modal/howToRememberHolms.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modalhowToRememberHolms = modal;
        });

        $scope.howToRememberHolms = function() {
            $scope.modalhowToRememberHolms.show();
        };

        $scope.closehowToRememberHolms = function() {
            $scope.modalhowToRememberHolms.hide();
        };

        $http.get($rootScope.hostAdress + "/ieroglif/" + $stateParams.id_hieroglyph)
            .success(function(respons) {
                $scope.ieroglif = respons;
                $scope.level_count_ieroglif = parseInt(respons[0].level_count_ieroglif);
            })
            .error(function(respons) {});

        $scope.nextIeroglif = parseInt($stateParams.id_hieroglyph) + 1;
    })
