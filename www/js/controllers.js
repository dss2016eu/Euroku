angular.module('euroku.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, URL_LOCALHOST, $rootScope) {

  // Form data for the login modal
  $scope.loginData = {};

  $rootScope.menu_show = false;

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/user/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, $translate, $ionicPlatform, $window, $rootScope) {
  $rootScope.menu_show = true;
  $scope.$on('$ionicView.afterEnter', function(){
    console.log(window.localStorage.getItem('lang'));
    $translate.use(window.localStorage.getItem('lang'));
    console.log("49 Playlist");
  });

  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('MainCtrl', function($scope, $ionicSideMenuDelegate, $state, $translate)
{
  $ionicSideMenuDelegate.canDragContent(false);

  $scope.goToMainMenuLayout = function(key)
  {
    $translate.use(key);
    window.localStorage.setItem('lang', key);
    console.log(window.localStorage.getItem('lang'));
    $state.go('app.mainmenu');
  };
})

.controller('PlaylistCtrl', function($scope, $stateParams, $translate, $state) {

  $translate.use(window.localStorage.getItem('lang'));
  $scope.changeLanguage = function (key) {
    $translate.use(key);
    window.localStorage.setItem('lang', key);
    console.log(window.localStorage.getItem('lang'));
    window.localStorage.setItem('change_language', "yes");
  };

  $scope.returnToMain = function ()
  {
    $state.go('app.playlists');
  };


});
