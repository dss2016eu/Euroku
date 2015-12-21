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
									$state, $ionicScrollDelegate, $translate, $ionicSideMenuDelegate, questionsServices, $timeout, $rootScope) {

  $scope.loading = true;


  $rootScope.menu_show= false;
  $scope.orders = randomAnswersOrders (1);
  console.log($scope.orders);
  $ionicSideMenuDelegate.canDragContent(false);

  $scope.tribualtime = '00:10:00';



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

  $scope.startTime = function ()
  {
    console.log("Chrono Start");
    chronoStart();
  };



    $scope.showVideo = function ()
    {
      window.open($scope.question.video, '_blank', 'location=yes');
      $scope.video = $scope.question.video;
      console.log('$scope.playvideo: '+$scope.playvideo );
    };
    $scope.sendSelection = function (answer)
    {

      var params = {device_id: 1, question_id: $scope.question.id, answer: 1 };

      console.log(params);

      $scope.disabled = true;

       questionsServices.setQuestionRequest(params)
        .then(function(resp)
        {
          console.log(resp);
        },
        function(error)
        {
          console.error(error);
        });


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

    questionsServices.getQuestion()
        .then(function(resp)
        {
          console.log(resp);

          $scope.question = resp.data;
          console.log($scope.question);
          //console.log($scope.question);
        },
        function(error)
        {
          console.error(error);
        });

});




