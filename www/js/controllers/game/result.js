angular.module('euroku.result', [])

.controller('ResultCtrl', function($scope, $stateParams, $ionicHistory, $state, $http, $ionicPopup, $timeout, questionsServices) {
  console.log($stateParams.choose);

  $scope.play = '';
  $scope.loading = false;

  $scope.showNewLevelChallenge = function (maila, title)
  {
    console.log("irudi maila: " + $scope.img_maila);
    var alertPopup = $ionicPopup.alert({
           title: "Zorionak! Maila berria!",
           buttons: [{ text: 'ADOS', type: 'button-dark'}],
           template: '<img class="center" width="100%" src="' + $scope.img_maila + '"/>'
          });
         alertPopup.then(function(res) {
           console.log('Erronka aktibatua...');
         });
  };



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



      $scope.result = {
                        game_id: "",
                        price: false,
                        price_desc: "Sariaren deskribapena",
                        price_key: "DSS2016BOLI_1",
                        correct: $scope.getRandomBoolean(),
                        provider: "",
                        url: "http://codesyntax.com",
                        atribution: "Wikipedia"
                      };
      console.log($scope.result);

      //Send data to get new data to next game or finish game (Disable temporaly)
      /*questionsServices.setQuestionRequest(params)
        .then(function(resp)
        {
          console.log("52: " + resp);
        },
        function(error)
        {
          console.error(error);
      });*/

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
