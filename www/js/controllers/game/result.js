angular.module('euroku.result', [])

.controller('ResultCtrl', function($scope, $stateParams, $ionicHistory, $state, $http, $ionicPopup, $timeout, questionsServices) {
  console.log($stateParams.choose);

  $scope.play = '';
  $scope.loading = false;

  $scope.showNewPrice = function (desc, key)
  {

    //load translate text to make popup layout with price data
    var language = window.localStorage.getItem('lang');
    if (language === "eu")
    {
      $scope.popup_title = translations_eu.template_title;
      $scope.template_msg_1 = translations_eu.template_msg_1;
      $scope.template_msg_2 = translations_eu.template_msg_2;
    }
    else if (language === "es")
    {
      $scope.popup_title = translations_es.template_title;
      $scope.template_msg_1 = translations_es.template_msg_1;
      $scope.template_msg_2 = translations_es.template_msg_2;
    }
    else
    {
      $scope.popup_title = translations_en.template_title;
      $scope.template_msg_1 = translations_en.template_msg_1;
      $scope.template_msg_2 = translations_en.template_msg_2;
    }

    if (desc === "")
    {
      desc = "Price text to show in popup modal";
    }
    //console.log("irudi maila: " + $scope.img_maila);
    var alertPopup = $ionicPopup.alert({
           title: $scope.popup_title,
           buttons: [{ text: 'ADOS', type: 'button-dark'}],
           template: '<p><b>' + desc.toUpperCase() + ':</b><br/>' + $scope.template_msg_1 + key + '</b></p>' +
                      $scope.template_msg_2
          });
         alertPopup.then(function(res) {
           console.log('Erronka aktibatua...');
         });
  };

  //Inside template popup '<img class="center" width="100%" src="' + $scope.img_maila + '"/>'



  $scope.sendSelection = function ()
  {

      var params = {
                      device_id: 1,
                      question_id: $scope.question_id,
                      game_id: $scope.game_id,
                      answer: $scope.user_select_option
                    };

      console.log(params);

      $scope.disabled = true;

      //Send data to get new data to next game or finish game (Disable temporaly)
      questionsServices.setQuestionRequest(params)
        .then(function(resp)
        {
          $scope.result = resp.data;
          console.log("52: " + resp.data.correct);

          if ($scope.result.correct === true)
          {
            console.log($scope.result.game_id);
            window.localStorage.setItem("game_id", $scope.result.game_id);
          }
          else
          {
            window.localStorage.setItem("game_id", "");
          }
          console.log("Saria? " + $scope.result.price);
          if ($scope.result.price === true)
          {
            $scope.showNewPrice($scope.result.price_desc, $scope.result.price_key);
            window.localStorage.setItem("game_id", "");
          }
        },
        function(error)
        {
          console.error(error);
      });

  };


  $scope.user_select_option = $stateParams.choose;
  $scope.question_id = $stateParams.question_id;
  $scope.game_id = $stateParams.game_id;

  console.log($scope.user_select_option + "      " + $stateParams.game_id + "      " + $stateParams.question_id);

  $scope.sendSelection();



  $scope.showNivelImage = function (maila)
  {
    var levels = ['Poliki, mesedez', 'Ikaslea', 'EGA',
                  'Irakaslea', 'Euskaltzaina', 'Mitxelena XVI'];

    var images = ['01PolikiMesdez.png', '02Ikaslea.png', '03Ega.png',
                  '04Irakaslea.png', '05Euskaltzaina.png', '06Mitxelena.png'];


    //if (maila == levels [])


    console.log("Zure maila: " + maila);

    var found = false;

    for (var i = 0; i < images.length && found == false; i++)
    {
      if (maila == levels [i])
      {
        $scope.img_maila = 'img/mailak/'+images[i];
        console.log($scope.img_maila);
        found = true;
        var myEl = angular.element( document.querySelector( '.zure_maila_text' ) );
        myEl.addClass(maila.toLowerCase().replace(" ", "_"));
      }
    }
  };

  $scope.morePlay = function ()
  {
    $state.go('app.quiz');
    $ionicHistory.nextViewOptions({
              disableBack: true
    });

  };

  $scope.moreInfo = function ()
  {
    var url = $scope.result.url;
    if($scope.platform === "android")
    {
        window.open(url, '_system', 'location=no');
    }
    else
    {
        window.open(url, '_blank', 'location=yes');
    }
  };

});
