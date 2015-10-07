angular.module('euroku.result', [])

.controller('ResultCtrl', function($scope, $stateParams, $ionicHistory, $state, $http, $ionicPopup, $timeout) {
  console.log($stateParams.response);

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

  //$scope.showNewLevelChallenge("Euskaltzalea", "Maila berri bat");

  //Erantzuna zuzena den ala ez jakiteko
  /*$scope.response = $stateParams.response;
  $scope.questionid = $stateParams.id;

  if ($scope.response === "1")
  {
      $scope.response = 1;
  }
  else
  {
      $scope.response = 0;
  }

  //Eskaera egingo den helbidea
  /*$scope.localhost = "http://www.ahotsak.eus/euskalkitegia/api/v1/setquestion";


  var url = $scope.localhost;

  $scope.params = 'device_hash='+ window.localStorage.getItem('device_id')
                      +'&galdera_id='+$scope.questionid
                      +'&response='+$scope.response;

  console.log('Params: '+ $scope.params);

  $http.post(url, $scope.params).
                  success(function(data) {
          $scope.play = data;



  }).error(function(data, status) {
    console.log('Error:' + status);
    window.localStorage.setItem ('error', 'Emaitzak jasotzean ezusteko errore bat eman da. Barkatu eragozpenak. Saiatu berriro');
    $state.go('app.main');

  }).then(function() {
      console.log($scope.play);

      $scope.correct = $stateParams.correct;
      $scope.winpoints = $stateParams.points;

      var myEl = angular.element( document.querySelector( '.erantzuna' ) );
      if ($scope.response === 0)
      {
        $scope.result = {title: "Oh, oh...", text: "Huts egin duzu!!"};
        $scope.image= "fail";
        $scope.winpoints = 0;

        myEl.addClass('ko_response');
      }
      else
      {
        $scope.result = {title: "Zorionak!!", text: "Asmatu duzu!!"};
        $scope.image= "correct";
        myEl.addClass('ok_response');
      }

      console.log("Zure maila: " + $scope.play.zure_maila);

      //Show level image depending your play level
      $scope.showNivelImage($scope.play.zure_maila);

      console.log("Puntuak: " + $scope.play.puntuak);
      console.log("Lortutako erronka: " + $scope.play.lortutako_erronka);
      console.log("Erronka puntuak behar direnak: " + $scope.play.hurrengo_erronkarako_puntuak);
      console.log("Splash: " + $scope.play.splash);

      //$scope.play.splash = true;

      if ($scope.play.splash === "1")
      {
          $scope.showNewLevelChallenge($scope.play.zure_maila, $scope.play.lortutako_erronka);
      }

  });*/

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
    var url = 'http://ahotsak.eus';
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
