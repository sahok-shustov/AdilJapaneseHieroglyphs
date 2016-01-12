// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var adil = angular.module('adil', ['ionic', 'ngCordova']);

adil.run(function($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function() {
        $rootScope.device = ionic.Platform.device();
        console.log("adil.run --- device", device);
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

adil.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.navBar.alignTitle('center');
    $stateProvider

        .state('app', {
            cache: true,
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'MainCtrl'
        })
        .state('app.helloscreen', {
            cache: true,
            url: '/helloscreen',
            views: {
                'menuContent': {
                    templateUrl: 'templates/helloScreen.html',
                    // controller: 'MainCtrl'
                }
            }
        })
        .state('app.acquaintance', {
            cache: true,
            url: '/acquaintance',
            views: {
                'menuContent': {
                    templateUrl: 'templates/acquaintance.html',
                    controller: 'AcquaintanceCtrl'
                }
            }
        })
        .state('app.levelsoftraining', {
            cache: true,
            url: '/levelsoftraining',
            views: {
                'menuContent': {
                    templateUrl: 'templates/levelsOfTraining.html',
                    controller: 'LevelsOfTrainingCtrl'
                }
            }
        })
        .state('app.hieroglyphslevel', {
            cache: false,
            url: '/hieroglyphslevel/:id_level',
            views: {
                'menuContent': {
                    templateUrl: 'templates/hieroglyphsLevel.html',
                    controller: 'HieroglyphsLevelCtrl'
                }
            }
        })
        .state('app.bighieroglyphholms', {
            cache: true,
            url: '/bighieroglyphholms/:id_level/:id_hieroglyph',
            views: {
                'menuContent': {
                    templateUrl: 'templates/bigHieroglyphHolms.html',
                    controller: 'BigHieroglyphHolmsCtrl'
                }
            }
        })
        .state('app.dossierhieroglyph', {
            cache: true,
            url: '/dossierhieroglyph/:id_level/:id_hieroglyph',
            views: {
                'menuContent': {
                    templateUrl: 'templates/dossierHieroglyph.html',
                    controller: 'DossierHieroglyphCtrl'
                }
            }
        })
        .state('app.dossierend', {
            cache: false,
            url: '/dossierend/:id_level/:id_hieroglyph',
            views: {
                'menuContent': {
                    templateUrl: 'templates/dossierEnd.html',
                    controller: 'DossierEndCtrl'
                }
            }
        })
        .state('app.starttest', {
            cache: true,
            url: '/starttest',
            views: {
                'menuContent': {
                    templateUrl: 'templates/startTest.html',
                    //controller: 'DossierEndCtrl'
                }
            }
        })
        .state('app.test', {
            cache: false,
            url: '/test/:id_level',
            views: {
                'menuContent': {
                    templateUrl: 'templates/test.html',
                    controller: 'TestCtrl'
                }
            }
        })
        .state('app.testresults', {
            cache: false,
            url: '/testresults/:id_level',
            views: {
                'menuContent': {
                    templateUrl: 'templates/testResults.html',
                    controller: 'TestResultsCtrl'
                }
            }
        })
        .state('app.personalarea', {
            cache: false,
            url: '/personalarea',
            views: {
                'menuContent': {
                    templateUrl: 'templates/personalArea.html',
                    controller: 'PersonalAreaCtrl'
                }
            }
        })
        .state('app.congratulations', {
            cache: true,
            url: '/congratulations/:id_level',
            views: {
                'menuContent': {
                    templateUrl: 'templates/congratulations.html',
                    controller: 'CongratulationsCtrl'
                }
            }
        })

    // if none of the above states are matched, use this as the fallback
     $urlRouterProvider.otherwise('/app/helloscreen');
});
