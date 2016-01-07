angular.module('euroku.profile', [])
.controller('SettingsCtrl', function($scope, $ionicHistory, $state, profileServices) {
  $scope.answer_correct = getRandomInt(1,16); //get a number in range 1-16
  $scope.total_answer = 16;

  $scope.progress = ($scope.answer_correct * 100) / $scope.total_answer;

  profileServices.getDetails ()
        .then(function(resp)
        {
          console.log(resp);

          $scope.profile = resp.data;

          console.log(resp.data);

          $scope.startTimer($scope.question);
          //console.log($scope.question);
        },
        function(error)
        {
          console.error("Errorea");

          $scope.profile =  {
                              language: "eu",
                              device_id: "1"
                            };
          console.log($scope.question);
        });



});
