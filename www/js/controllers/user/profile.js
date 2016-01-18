angular.module('euroku.profile', [])
.controller('SettingsCtrl', function($scope, $ionicHistory, $state, profileServices, $ionicLoading, $state) {
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
      $scope.popup_title = translations_en.data_not_load_correct;
      $scope.message = translations_en.server_error_msg;
    }
    else if (language_code === 'es')
    {
      $scope.select_value = [false, true, false];
      $scope.popup_title = translations_es.data_not_load_correct;
      $scope.message = translations_es.server_error_msg;
    }
    else if (language_code === 'eu')
    {
      $scope.select_value = [false, false, true];
      $scope.popup_title = translations_eu.data_not_load_correct;
      $scope.message = translations_eu.server_error_msg;
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

    window.localStorage.setItem('lang', $scope.language_code);
    $ionicLoading.hide();
  },
  function(error)
  {
    console.error("Errorea");

    var alertPopup = $ionicPopup.alert({
      title: $scope.popup_title,
      buttons: [{ text: 'ADOS', type: 'button-dark'}],
      template: '<p>'+ $scope.message + '</p>'
    });
    alertPopup.then(function(res) {
      console.log('OK');
    });

    $state.go('app.main');
    $ionicLoading.hide();
  });

  $scope.savePreferences = function()
  {
    var language = $scope.language_code;
    console.log(language);

    profileServices.setDetails(language)
          .then(function(resp)
    {
      console.log("Profile Controller (38): " + resp.data.language);
      $scope.updateLanguage($scope.language_code);
    },
    function(error)
    {
      console.error(error);
    });

  };

});
