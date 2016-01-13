adil.controller('TestCtrl', function($scope, $ionicModal, $timeout, $stateParams, $ionicScrollDelegate, $http, $rootScope, $location) {

    var currentAnswer = {};
    var otvetu = [];
    var kolVoprosov = [];
    var id_Otvetov = [];
    var test_id = 1;
    // var test = 1;

    $http.get($rootScope.hostAdress + 'endtest/' + $rootScope.userData.user_id).success(function(endTest) {
        console.log("TestCtrl endTest", endTest);
        if (endTest.end_test == null) {
            test_id = 1;
            console.log("TestCtrl endTest.end_test == null", test_id);
            $http.get($rootScope.hostAdress + 'apitest/' + test_id).success(function(data) {
                console.log($rootScope.hostAdress + 'apitest/' + test_id);

                console.log("TestCtrl --- data", data);
                $scope.test_id_level = data.test[0].test_id_level;

                $scope.test = data.vopros;
                $scope.id_hieroglyph = data.test[0].test_id_ieroglif;
                $scope.count_ieroglif = data.test[0].count_ieroglif;
                test_id = data.test[0].test_id;
                /*$scope.id_hieroglyphNext = parseInt($scope.id_hieroglyph) + 1;
                test = parseInt($scope.id_hieroglyph) + 1;*/


                angular.forEach(data.vopros, function(value, key) {
                    if (!angular.isObject(value)) {
                        kolVoprosov[key] = (value);
                    } else {
                        id_Otvetov[value.vopros_id] = value.vopros_id;
                        console.log("id_Otvetov", id_Otvetov);
                    }
                });
                console.log("kolVoprosov", kolVoprosov);

                $http.get($rootScope.hostAdress + 'ieroglif/' + test_id)
                    .success(function(respons) {
                        console.log("respons", respons);
                        $scope.ieroglif = respons;
                        console.log("respons $scope.ieroglif", $scope.ieroglif);

                    }).error(function(respons) {
                        console.log("respons ERROR", respons);
                    });

            }).error(function(data) {
                //error
            });

        } else {
            test_id = parseInt(endTest.end_test) + 1;
            console.log("TestCtrl ELSE --- test_id", test_id);
            $http.get($rootScope.hostAdress + 'apitest/' + test_id).success(function(data) {
                console.log("$rootScope.hostAdress + 'apitest/' + test_id", $rootScope.hostAdress + 'apitest/' + test_id);

                console.log("TestCtrl --- data", data);
                $scope.test_id_level = data.test[0].test_id_level;

                $scope.test = data.vopros;
                $scope.id_hieroglyph = data.test[0].test_id_ieroglif;
                $scope.count_ieroglif = data.test[0].count_ieroglif;
                test_id = data.test[0].test_id;
                /*$scope.id_hieroglyphNext = parseInt($scope.id_hieroglyph) + 1;
                test = parseInt($scope.id_hieroglyph) + 1;*/
                if (test_id > endTest.end_test) {
                        $location.path('app/testresults/' + $scope.test_id_level);

                } else {
                    angular.forEach(data.vopros, function(value, key) {
                    if (!angular.isObject(value)) {
                        kolVoprosov[key] = (value);
                    } else {
                        id_Otvetov[value.vopros_id] = value.vopros_id;
                        console.log("id_Otvetov", id_Otvetov);
                    }
                });
                console.log("kolVoprosov", kolVoprosov);

                $http.get($rootScope.hostAdress + 'ieroglif/' + test_id)
                    .success(function(respons) {
                        console.log("respons", respons);
                        $scope.ieroglif = respons;
                        console.log("respons $scope.ieroglif", $scope.ieroglif);

                    }).error(function(respons) {
                        console.log("respons ERROR", respons);
                    });
                };




            }).error(function(data) {
                //error
            });

        };
    }).error(function(endTest) {
        //error
    });



    $scope.isString = function(value) {
        var is;
        if (typeof value == 'string') {
            is = true;
        } else {
            is = false;
        }
        return is;
    };

    $scope.isObject = function(value) {
        var is;
        if (typeof value == 'object') {
            is = true;
        } else {
            is = false;
        }
        return is;
    };
    var varOtveta = [];
    var rezTest = {};


    $scope.addToCurrentAnswer = function(vopros_id, otvet_id, cheked) {
        if (cheked) {
            rezTest[otvet_id] = {
                vopros_id: vopros_id,
                otvet_id: otvet_id
            };
            console.log("cheked=TRUE rezTest[vopros_id]", rezTest);

        } else {
            delete rezTest[otvet_id];
            console.log("cheked=FALSE rezTest[otvet_id]", rezTest);

        };
    };

    $scope.forChecking = function() {
        var i;
        // angular.forEach(kolVoprosov, function(value, key) {
        angular.forEach(id_Otvetov, function(value, key) {
            i = value;
            var varOtveta = [];
            console.log("forChecking --- i", i);
            console.log("forChecking --- for", varOtveta);
            console.log("key - " + key + "   value - " + value);

            angular.forEach(rezTest, function(value, key) {
                if (value.vopros_id == i) {
                    console.log("rezTest value.otvet_id", value.otvet_id);
                    varOtveta.push(value.otvet_id);
                };

            });
            var textVopros = "vopros" + "-" + i;
            currentAnswer[textVopros] = varOtveta;
            console.log("currentAnswer[textVopros]", currentAnswer);

        });

        // });
        console.log("forChecking currentAnswer", currentAnswer);

        $http.post($rootScope.hostAdress + "testotvet/" + test_id + "/" + $rootScope.userData.user_id, currentAnswer)
            .success(function(respons) {
                console.log("respons", respons);
            })
            .error(function(respons) {
                console.log("respons ERROR", respons);
            });
    };


    $scope.nextTest = function(id_hieroglyph) {
        console.log("nextTest", id_hieroglyph);
        currentAnswer = null;
        currentAnswer = {};
        otvetu = [];
        kolVoprosov = [];
        id_Otvetov = [];
        test_id = parseInt(id_hieroglyph) + 1;
        // var test = 1;
        varOtveta = [];
        rezTest = null;
        rezTest = {};

        $http.get($rootScope.hostAdress + 'apitest/' + test_id).success(function(data) {
            console.log("TestCtrl --- data", data);
            $scope.test_id_level = data.test[0].test_id_level;

            $scope.test = data.vopros;
            $scope.id_hieroglyph = data.test[0].test_id_ieroglif;
            $scope.count_ieroglif = data.test[0].count_ieroglif;
            test_id = data.test[0].test_id;
            // $scope.id_hieroglyphNext = parseInt($scope.id_hieroglyph) + 1;
            // test = parseInt($scope.id_hieroglyph) + 1;


            angular.forEach(data.vopros, function(value, key) {
                if (!angular.isObject(value)) {
                    kolVoprosov[key] = (value);
                } else {
                    id_Otvetov[value.vopros_id] = value.vopros_id;
                    console.log("id_Otvetov", id_Otvetov);
                }
            });
            console.log("kolVoprosov", kolVoprosov);

            $http.get($rootScope.hostAdress + "ieroglif/" + test_id)
                .success(function(respons) {
                    console.log("respons", respons);
                    $scope.ieroglif = respons;
                    console.log("respons $scope.ieroglif", $scope.ieroglif);

                })
                .error(function(respons) {
                    console.log("respons ERROR", respons);
                });

        }).error(function(data) {
            //error
        });
    };

    $scope.scrollSmallToTop = function() {
        $ionicScrollDelegate.$getByHandle('small').scrollTop();
    };

    $scope.checkAllTests = function() {
        var allTests = [];
        $http.get($rootScope.hostAdress + 'testall/' + $stateParams.id_level + '/' + $rootScope.userData.user_id)
            .success(function(data) {
                allTests = data;
                console.log("checkAllTests --- allTests", allTests);

                angular.forEach(allTests, function(value, key) {
                    // console.log("angular.forEach --- key, value", key, value);

                    if (value.is_test == "false") {
                        // console.log("УРА!!! НАШЛОСЯЯЯЯЯЯ FALSE!!!!", key);
                        $location.path('app/testresults/' + $scope.test_id_level);
                        // $scope.pathToResults = "#/app/testresults/";
                    } else {
                        $location.path('app/congratulations');
                        // $scope.pathToResults = "#/app/congratulations/";
                    };
                });

            }).error(function(data) {});
    };

});
