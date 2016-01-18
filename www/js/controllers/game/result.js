angular.module('euroku.result', [])

.controller('ResultCtrl', function($scope, $stateParams, $ionicHistory, $state, $http, $ionicPopup, $timeout, questionsServices) {
  console.log($stateParams.choose);

  $scope.play = '';
  $scope.loading = false;

  //load translate text to make popup layout with price data
  var language = window.localStorage.getItem('lang');

  $scope.showNewPrice = function (desc, key)
  {


    if (language === "eu")
    {
      $scope.popup_title = translations_eu.template_title;
      $scope.template_msg_1 = translations_eu.template_msg_1;
      $scope.template_msg_2 = translations_eu.template_msg_2;
      $scope.ok_text_popup = translations_eu.ok_text_popup;
    }
    else if (language === "es")
    {
      $scope.popup_title = translations_es.template_title;
      $scope.template_msg_1 = translations_es.template_msg_1;
      $scope.template_msg_2 = translations_es.template_msg_2;
      $scope.ok_text_popup = translations_es.ok_text_popup;
    }
    else
    {
      $scope.popup_title = translations_en.template_title;
      $scope.template_msg_1 = translations_en.template_msg_1;
      $scope.template_msg_2 = translations_en.template_msg_2;
      $scope.ok_text_popup = translations_en.ok_text_popup;
    }

    if (desc === "")
    {
      desc = "Price text to show in popup modal";
    }
    //console.log("irudi maila: " + $scope.img_maila);
    var alertPopup = $ionicPopup.alert({
           title: $scope.popup_title,
           buttons: [{ text: $scope.ok_text_popup, type: 'button-dark'}],
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

          //Store source url to use to go
          $scope.storeUrls($scope.result);

          //RESULT STATE TEXT:

          if ($scope.result.correct === true)
          {
            if (language === "eu")
            {
              $scope.correct_text = translations_eu.correct_answer;
            }
            else if (language === "es")
            {
              $scope.correct_text = translations_es.correct_answer;
            }
            else
            {
              $scope.correct_text = translations_en.correct_answer;
            }
          }
          else
          {
            if (language === "eu")
            {
              $scope.correct_text = translations_eu.incorrect_answer;
            }
            else if (language === "es")
            {
              $scope.correct_text = translations_es.incorrect_answer;
            }
            else
            {
              $scope.correct_text = translations_en.incorrect_answer;
            }
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
  $scope.round = $stateParams.round;
  $scope.rounds = $stateParams.rounds;

  $scope.progress = (($scope.round * 100) / $scope.rounds).toFixed(2);
  console.log("Progress: " + $scope.progress);

  console.log($scope.user_select_option + "      " + $stateParams.game_id + "      " + $stateParams.question_id);

  $scope.sendSelection();

  $scope.morePlay = function ()
  {
    $state.go('app.quiz');
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });

  };

});
