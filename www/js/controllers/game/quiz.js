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

  $rootScope.counter = 10;
  $rootScope.menu_show= false;

  $ionicSideMenuDelegate.canDragContent(false);


  /****************************************************************************
    CHRONOMETER
  *****************************************************************************/

  $scope.question_game = {};

  $rootScope.show_time = "00:10";



  var mytimeout = null; // the current timeoutID

  // actual timer method, counts down every second, stops on zero
  $scope.onTimeout = function() {
      if($rootScope.counter ===  0) {
          $scope.$broadcast('timer-stopped', 0);
          $rootScope.counter = 10;
          $timeout.cancel(mytimeout);
          return;
      }
      $rootScope.counter --;
      console.log($rootScope.counter);

      $scope.show_time = "00:0" + $rootScope.counter;
      mytimeout = $timeout($scope.onTimeout, 1000);
  };

    $scope.startTimer = function(question) {
      $scope.question_game = question;
      console.log($scope.question_game);
      $rootScope.counter = 10;
      mytimeout = $timeout($scope.onTimeout, 1000);
      console.log("138 line: " + $scope.question_game.game_id);

    };

    // stops and resets the current timer
    $scope.stopTimer = function() {
        $scope.$broadcast('timer-stopped', $scope.counter);
        $rootScope.counter = 10;
        console.log($scope.counter);
        $timeout.cancel(mytimeout);
    };

    // triggered, when the timer stops, you can do something here, maybe show a visual indicator or vibrate the device
    $scope.$on('timer-stopped', function(event, remaining) {
        if(remaining === 0) {
            console.log('your time ran out!');
            $rootScope.show_time = "00:10";
            $rootScope.counter = 10;
            $state.go('app.result', { choose: -1, game_id: $scope.question_game.game_id, question_id: $scope.question_game.id});
            $ionicHistory.nextViewOptions({
              disableBack: true
            });
        }
    });

  $scope.sendOption = function (option)
  {
    $scope.stopTimer();
    console.log(option);
    $state.go('app.result', { choose: option, game_id: $scope.question_game.game_id, question_id: $scope.question_game.id});
    $ionicHistory.nextViewOptions({
      disableBack: true
    });

  };

  $scope.showVideo = function ()
  {
    window.open($scope.question.video, '_blank', 'location=yes');
    $scope.video = $scope.question.video;
    console.log('$scope.playvideo: '+$scope.playvideo );
  };
    /*$scope.sendSelection = function (answer)
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
        };

        //params
        $state.go('app.result');
        $ionicHistory.nextViewOptions({
                  disableBack: true
        });

      }, 1000);
    };*/

    questionsServices.getQuestion()
        .then(function(resp)
        {
          console.log(resp);

          $scope.question = resp.data;
          console.log($scope.question);

          $scope.startTimer($scope.question);
          //console.log($scope.question);
        },
        function(error)
        {
          console.error("Errorea");

          $scope.question = {
                              answers: ["A erantzuna", "B erantzuna", "C erantzuna"],
                              title: "Euroku (Question)",
                              photo: "",
                              game_id: 25,
                              id: 10
                            };
                            console.log($scope.question);
                            $scope.startTimer($scope.question);
        });

});




