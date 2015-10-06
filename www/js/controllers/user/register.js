angular.module('euroku.register', [])

.controller('RegisterCtrl', function($scope, $ionicHistory, $state) {
 $scope.returnToHome = function ()
  {
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
    $state.go('app.playlists');
  };

});
