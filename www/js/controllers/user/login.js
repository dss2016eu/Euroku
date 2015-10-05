angular.module('euroku.login', [])

.controller('LoginCtrl', function($scope, $state, $ionicHistory, $ionicSideMenuDelegate) {

  $ionicSideMenuDelegate.canDragContent(false);

  $scope.logIn = {
      username: '',
      password : ''
    };

  $scope.setLoginData = function (form)
  {
      if(form.$valid) {
        console.log("Data correct!!");
        console.log("Username: " + $scope.logIn.username);
        console.log("Password: " + $scope.logIn.password);
      }
      else
      {
        console.log("DATA INCORRECTt!! SEE LOG messages");
        console.log("Username: " + $scope.logIn.username);
        console.log("Password: " + $scope.logIn.password);
      }
  };

  $scope.returnToHome = function ()
  {
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
    $state.go('app.playlists');
  };
});
