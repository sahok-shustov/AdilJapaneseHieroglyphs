adil.controller('MainCtrl', function($scope, $rootScope, $ionicModal, $timeout, $stateParams, $ionicPlatform, $window, $location, $cordovaNetwork, $http, $ionicPopup) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $rootScope.hostAdress = "http://japan.dev-topsu.ru/";

    // Autoran function
    $timeout(function() {
        $rootScope.userData = JSON.parse(window.localStorage['userData']);
        console.log("mainCtrl --- $timeout --- $rootScope.userData", $rootScope.userData);
        /*$rootScope.userData = JSON.parse(window.localStorage['userData']);
        console.log("mainCtrl --- doLogin --- $rootScope.userData", $rootScope.userData);*/

        $scope.userPassword = JSON.parse(window.localStorage['userPassword']);
        console.log("mainCtrl --- doRegister --- $scope.userPassword", $scope.userPassword);

        if ($rootScope.userData) {
            //$scope.userName = $rootScope.userData.user_name;
            $scope.menuEnterString = true;
        } else {
            $scope.userName = "Гость";
            $scope.menuEnterString = false;
        };
    }, 100);

    console.log("MainCtrl");

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/Modal/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalLogin = modal;
    });

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/Modal/forgot.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalForgot = modal;
    });

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/Modal/register.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalRegister = modal;
    });

    // Open the logIn modal
    $scope.login = function() {
        $scope.modalLogin.show();
    };

    $scope.openRegister = function() {
        $scope.modalRegister.show();
    };

    $scope.openForgot = function() {
        $scope.modalForgot.show();
    };

    // Triggered in the logIn modal to close it
    $scope.closeLogin = function() {
        $scope.modalLogin.hide();
    };

    $scope.closeRegister = function() {
        $scope.modalRegister.hide();
    };

    $scope.closeForgot = function() {
        $scope.modalForgot.hide();
    };

    // Form data for the login modal
    $scope.enter = {};
    $scope.register = {};
    $scope.reset = {};
    $scope.edit = {};

    //ComparingPasswords
    $scope.registerComparingPasswords = function() {
        console.log("$scope.register.password --- ", $scope.register.password);
        console.log("$scope.register.password.length --- ", $scope.register.password.length);
        console.log("$scope.register.confirmPassword --- ", $scope.register.confirmPassword);
        console.log("$scope.register.password.length --- ", $scope.register.confirmPassword.length);

        if ($scope.register.password.length == $scope.register.confirmPassword.length) {
            if ($scope.register.password == $scope.register.confirmPassword) {
                $scope.equal = true;
                $scope.notEqual = false;
                $scope.notEqualLength = false;
            } else {
                $scope.equal = false;
                $scope.notEqual = true;
                $scope.notEqualLength = false;
            }
        } else {
            $scope.equal = false;
            $scope.notEqual = true;
            $scope.notEqualLength = true;
        }
    };

    // Perform the logIn action when the user submits the logIn form
    $scope.doLogin = function() {
        if ($scope.enter.email && $scope.enter.password) {
            //URL send order,
            $http.post($rootScope.hostAdress + 'authjson', {
                submit: true,
                email: $scope.enter.email,
                password: $scope.enter.password
            }).success(function(data) {
                if (data[0] == "Пользователь не найден!") {
                    console.log("doLogin --- success --- Пользователь не найден!", data);
                    $scope.showAlertLogin();
                    //console.log("$scope.showAlertLoginEmail()");
                    return false;
                } else if (data[0] == null) {
                    console.log("doLogin --- success  == null", data);
                    $scope.showAlertLogin();
                    return false;
                } else {
                    $scope.successWindow = true;
                    console.log("doLogin --- success", data);
                    $scope.userData = data[0];
                    if ($scope.enter.check) {
                        window.localStorage['userData'] = angular.toJson($scope.userData);
                        $rootScope.userData = JSON.parse(window.localStorage['userData']);
                        console.log("mainCtrl --- doLogin --- $rootScope.userData", $rootScope.userData);

                        window.localStorage['userPassword'] = angular.toJson($scope.enter.password);
                        $scope.userPassword = JSON.parse(window.localStorage['userPassword']);
                        console.log("mainCtrl --- doRegister --- $scope.userPassword", $scope.userPassword);

                        $scope.showAlertLoginWelcom();
                        $scope.menuEnterString = true;
                        $scope.enter.email = null;
                        $scope.enter.password = null;
                        $scope.enter.check = false;

                        $location.path('app/acquaintance');
                        // $window.location.reload();
                    } else if (!$scope.enter.check) {
                        $rootScope.userData = $scope.userData;
                        $scope.userPassword = $scope.enter.password;
                        $scope.showAlertLoginWelcom();
                        $scope.menuEnterString = true;
                        $scope.enter.email = null;
                        $scope.enter.password = null;
                        $scope.enter.check = false;

                        $location.path('app/acquaintance');
                        // $window.location.reload();
                    };

                    // $timeout close attention window automatically within 3.500 second
                    /*$timeout(function() {
                        $scope.successWindow = false;
                    }, 3500);*/

                    $timeout(function() {
                        $scope.closeLogin();
                    }, 1000);
                }

                //success post request
            }).error(function(data) {
                //error
                $scope.showAlertLoginEmail();
            });
        } else {
            $scope.showAlertLogin();
        }
    };

    $scope.doRegister = function() {
        //URL send order,
        $http.post($rootScope.hostAdress + 'regang', {
            submit: true,
            name: $scope.register.name,
            email: $scope.register.email,
            password: $scope.register.password,
            passwordis: $scope.register.confirmPassword
        }).success(function(data) {
            if (data.email == "Введён не корректный email") {
                $scope.showAlertRegisterEmail();
            } else {
                $scope.successWindow = true;
                $scope.showAlertRegisterUserWelcom();
                $scope.register.name = null;
                $scope.register.email = null;
                $scope.register.password = null;
                $scope.register.confirmPassword = null;

                // $timeout close attention window automatically within 3.500 second
                /*$timeout(function() {
                    $scope.successWindow = false;
                }, 3500);*/

                $timeout(function() {
                    $scope.closeRegister();
                }, 1500);
            }

        }).error(function(data) {
            //error
            console.log("doRegister-error", data);
            $scope.showAlertRegisterEmail();
        });

    };

    $scope.doForgot = function() {
        console.log("$scope.reset.email", $scope.reset.email);
        if ($scope.reset.email) {
            console.log("$scope.reset.email", $scope.reset.email);
            //URL send order,
            $http.post($rootScope.hostAdress + 'reestablishpasswordang', {
                submit: true,
                email: $scope.reset.email,
            }).success(function(data) {
                $scope.successWindow = true;
                $scope.showAlertForgotPassword();
                    // $timeout close attention window automatically within 3.500 second
                $timeout(function() {
                    $scope.successWindow = false;
                    $scope.reset.email = null;
                }, 3500);
                //success post request
            }).error(function(data) {
                //error
            });

            $timeout(function() {
                $scope.closeForgot();
            }, 1000);
        };
    };

    $scope.logOut = function() {
        $http.get($rootScope.hostAdress + 'logoutang/' + $rootScope.userData.user_auth_token);
        window.localStorage['userData'] = null;
        window.localStorage['userPassword'] = null;

        $rootScope.userData = JSON.parse(window.localStorage['userData']);
        console.log("mainCtrl --- logOut --- $rootScope.userData", $rootScope.userData);
        $scope.userPassword = JSON.parse(window.localStorage['userPassword']);
        console.log("mainCtrl --- logOut --- $scope.userPassword", $scope.userPassword);
        $scope.userName = "Гость";
        $scope.menuEnterString = false;

        $location.path('app/helloscreen');
        // $window.location.reload();
    };

    $scope.goToPersonalArea = function() {
        $location.path('app/personalarea');
    };

    $scope.showAlertLogin = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Внимание!',
            template: 'Заполните пустые поля.'
        });
    };

    $scope.showAlertLoginWelcom = function() {
        var userName = $rootScope.userData.user_name;
        var alertPopup = $ionicPopup.alert({
            title: 'Привет, ' + userName + '!',
            template: 'Рады видеть Вас в нашем приложении!'
        });
    };

    $scope.showAlertForgotPassword = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Изменение пароля!',
            template: 'Перейдите по ссылке полученной на ваш email!'
        });
    };

    $scope.showAlertRegister = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Внимание!',
            template: 'Заполните все поля со звёздочкой.'
        });
    };

    $scope.showAlertLogin = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Ошибка!',
            template: 'Не верный Email или пароль.'
        });
    };

    $scope.showAlertRegisterUserWelcom = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Регистрация прошла успешно!',
            template: $scope.register.name + ', авторизируйтесь в приложении.'
        });
    };

    $scope.showAlertEditPassword = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Ошибка!',
            template: 'Новыу пароли не совпадают.'
        });
    };

    $scope.showAlertEditPasswordSaccess = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Поздравляем!',
            template: 'Ваш пароль изменён.'
        });
    };

    $scope.showAlertEditPasswordOld = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Ошибка!',
            template: 'Вы ввели неверный текущий пароль.'
        });
    };

    $scope.showAlertEditPasswords = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Ошибка!',
            template: 'Заполните корректно все поля с паролями.'
        });
    };

    $scope.showAlertIsOffline = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Нет подключения к сети!',
            template: 'Для корректной работы приложения включите Wifi или моб. интернет.'
        });
    };

    $scope.showConfirmExit = function() {
        var userName = $rootScope.userData.user_name;
        var confirmPopup = $ionicPopup.confirm({
            title: 'Выход из приложения',
            template: userName + ', Вы уверены, что хотите выйти?'
        });
        confirmPopup.then(function(res) {
            if (res) {
                console.log('You are sure');
                $scope.logOut();
            } else {
                console.log('You are not sure');
            }
        });
    };


})
