/*****************************************************
* Euroku - Partida
* GET motako API eskaera bat harturik:
* Sartu URL
* Pasatu beharko zaio erabiltzaile token-a
* @ngdoc function
* @name Tribual.Quiz.controller:QuizCtrl
* @description
* # QuizCtrl
* Controller of the Euroku Game
*******************************************************/

angular.module('euroku.quiz', [])

.controller('QuizCtrl', function($scope, $http, $ionicLoading, $ionicHistory,
									$state, $ionicScrollDelegate, $translate, $ionicSideMenuDelegate, URL_LOCALHOST, $timeout, $rootScope) {

  $scope.loading = true;


  $rootScope.menu_show= false;
  $scope.orders = randomAnswersOrders (1);
  console.log($scope.orders);

  console.log(URL_LOCALHOST);
  $ionicSideMenuDelegate.canDragContent(false);



  var random_question = getRandomInt(1,2);

  if (random_question === 1)
  {
    var irudia = "";
    $scope.show_image = false;
  }
  else
  {
    var irudia = "http://dss2016.eu/media/com_ohanah/attachments/931941142-Donostia2016_Cosmopotica_.jpg";
    $scope.show_image = true;
  }

  $scope.datua = '{"zuzena": "Legutio (Araba)", "bideo_helbidea": "http://bideoak.ahotsak.com/LEG030/leg030_009.flv", "img": "' + irudia + '", ' +
              '"jatorria": "http://ahotsak.eus/legutio/pasarteak/leg-030-009/", "title": "Zein herritakoa da pasarte hau?", '+
              '"okerra2": "Itzaltzu (Nafarroa)", "okerra1": "Elgorriaga (Nafarroa)", "zailtasuna": 1070, "id": 18959, "puntuak": 1070}';

  $scope.datua = JSON.parse($scope.datua);

  console.log($scope.datua);
  $scope.answers = [$scope.datua.zuzena, $scope.datua.okerra1, $scope.datua.okerra2];
  $scope.question = { id: $scope.datua.id,
                      title: $scope.datua.title,
                      answer1: $scope.answers [0],
                      answer2: $scope.answers [1],
                      answer3: $scope.answers [2],
                      difficult: $scope.datua.zailtasuna,
                      img: $scope.datua.img,
                      source: $scope.datua.jatorria};

  console.log($scope.question.difficult);

  $scope.playvideo = false;

  //$scope.loading = false;


  $ionicLoading.show();





  $ionicLoading.hide();
        //$scope.loading = true;
    /*var req = {
       method: 'GET',
       url: $scope.localhost+'/euskalkitegia/api/v1/getquestion?device_hash='+$scope.deviceid,
       headers: {
         'Content-Type': 'application/json'
       }
    };
    $http(req).success (function(data){
      $scope.datua = data;
      console.log(data);

    }).error(function(){

            $ionicLoading.hide();
            $scope.loading = false;

            //If error---> show 'main' layout
            $state.go('app.main');
            window.localStorage.setItem ('error', 'Partidaren galderaren informazioa jasotzean '+
              'ezusteko errorea eman da. Barkatu eragozpenak. Saiatu berriro mesedez ;)');

    })
    .then(function() {
      $ionicLoading.hide();
        console.log($scope.datua);
        //window.location.reload(true);
        $scope.answers = [$scope.datua.zuzena, $scope.datua.okerra1, $scope.datua.okerra2];

        console.log($scope.datua.bideo_helbidea.replace("flv", "mp4"));

        $scope.question = { id: $scope.datua.id,
                                              title: $scope.datua.title,
                                              answer1: $scope.answers [0],
                                              answer2: $scope.answers [1],
                                              answer3: $scope.answers [2],
                                              difficult: $scope.datua.zailtasuna,
                                              video: $scope.datua.bideo_helbidea.replace("flv", "mp4"),
                                              source: $scope.datua.jatorria};


        console.log($scope.question);

        $ionicLoading.hide();
        $scope.loading = true;

    });*/


    $scope.showVideo = function ()
    {
      window.open($scope.question.video, '_blank', 'location=yes');
      $scope.video = $scope.question.video;
      console.log('$scope.playvideo: '+$scope.playvideo );
    };
    $scope.checkAnswer = function (value)
    {
      console.log(value);

      $scope.disabled = true;

      console.log("Response: " + $scope.answers[value-1]);
      console.log("Correct: " + $scope.question.answer1);

      if ($scope.datua.zuzena === $scope.answers[value-1])
      {
        console.log("Zuzena");
        console.log($scope.answers[value-1]);
      }
      $timeout(function() {
        /*var params = {
            response: value,
            id: $scope.question.id,
            correct: $scope.question.answer1,
            points: $scope.question.difficult
        };*/

        //params
        $state.go('app.result');
        $ionicHistory.nextViewOptions({
                  disableBack: true
        });

      }, 1000);
    };

});




