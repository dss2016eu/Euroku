angular.module('euroku.mainmenu', [])

.controller('MainMenuCtrl', function($scope, $ionicModal, $timeout, $translate, $state, $ionicSideMenuDelegate, $ionicHistory) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  //Use local storage save language code
  $translate.use(window.localStorage.getItem('lang'));

  $ionicSideMenuDelegate.canDragContent(false);

  // Form data for the login modal
  $scope.loginData = {};

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

  $ionicHistory.nextViewOptions({
                  disableBack: true
  });

  $scope.goToRegisterForm = function ()
  {
    $state.go('app.register');
  };
  $scope.goToLoginForm = function ()
  {
    $state.go('app.login');
  };
  $scope.returnToSelectLanguage = function ()
  {
    $state.go('app.main');
  };
  $scope.startPlay = function ()
  {
    $state.go('app.quiz');
  }
});
