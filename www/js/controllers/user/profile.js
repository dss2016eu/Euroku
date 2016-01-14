angular.module('euroku.profile', [])
.controller('SettingsCtrl', function($scope, $ionicHistory, $state, profileServices, $ionicLoading) {
  $scope.answer_correct = getRandomInt(1,16); //get a number in range 1-16
  $scope.total_answer = 16;

  $scope.progress = ($scope.answer_correct * 100) / $scope.total_answer;
  $ionicLoading.show();

  $scope.select_value = [false, false, false];

  $scope.selectLanguage = function(language_code)
  {
    console.log("Aurretik aukeratutako hizkuntza: " + $scope.language_code + "   Aukera: " + language_code);

    if (language_code === 'en')
    {
      $scope.select_value = [true, false, false];
    }
    else if (language_code === 'es')
    {
      $scope.select_value = [false, true, false];
    }
    else if (language_code === 'eu')
    {
      $scope.select_value = [false, false, true];
    }

    if ($scope.language_code !== language_code)
    {
      $scope.language_code = language_code;
    }

  };

  profileServices.getDetails ()
        .then(function(resp)
  {
    console.log(resp);

    $scope.profile = resp.data;

    console.log(resp.data);

    $scope.language_code = $scope.profile.language;

    $scope.selectLanguage($scope.language_code);

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
    var language = $scope.language_code;
    console.log(language);

    profileServices.setDetails(language)
          .then(function(resp)
    {
      console.log("Profile Controller (38): " + resp);
      $scope.updateLanguage($scope.language_code);
    },
    function(error)
    {
      console.error(error);
    });

  };



});
