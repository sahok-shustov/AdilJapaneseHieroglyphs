adil.controller('AcquaintanceCtrl', function($scope, $ionicModal, $timeout, $stateParams, $ionicSlideBoxDelegate) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    console.log("AcquaintanceCtrl");

    $scope.buttons = [{
        name: '1'
    }, {
        name: '2'
    }, {
        name: '3'
    }, {
        name: '4'
    }];


    $scope.slide = function(to) {
        $scope.current = to;
        $ionicSlideBoxDelegate.slide(to);
    };

    $scope.slideChanged = function(slide) {
        $scope.currentSlide = $ionicSlideBoxDelegate.currentIndex();
        console.log('Active Slide=' + $scope.currentSlide);
        $scope.slide(slide);
    };

    $scope.nextSlide = function() {
        $scope.currentSlide = $ionicSlideBoxDelegate.currentIndex() +1;
    	$scope.slide($scope.currentSlide);
    };

    $scope.previousSlide = function() {
        $scope.currentSlide = $ionicSlideBoxDelegate.currentIndex() -1;
    	$scope.slide($scope.currentSlide);
    };

});
