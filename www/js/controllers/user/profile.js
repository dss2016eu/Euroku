angular.module('euroku.profile', [])
.controller('SettingsCtrl', function($scope, $ionicHistory, $state, profileServices, $ionicLoading) {
  $scope.answer_correct = getRandomInt(1,16); //get a number in range 1-16
  $scope.total_answer = 16;

  $scope.progress = ($scope.answer_correct * 100) / $scope.total_answer;
  $ionicLoading.show();

  profileServices.getDetails ()
        .then(function(resp)
  {
    console.log(resp);

    $scope.profile = resp.data;

    console.log(resp.data);

    $ionicLoading.hide();
  },
  function(error)
  {
    console.error("Errorea");

    $scope.profile =  {
                        language: "eu",
                        device_id: "1"
                      };
    console.log($scope.question);
    $ionicLoading.hide();
  });

  $scope.savePreferences = function()
  {
    var language = window.localStorage.getItem('lang');
    console.log(language);

    profileServices.setDetails(language)
          .then(function(resp)
    {
      console.log("Profile Controller (38): " + resp);
    },
    function(error)
    {
      console.error(error);
    });

  };



});
