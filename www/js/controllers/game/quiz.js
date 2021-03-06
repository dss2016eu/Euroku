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
									$state, $ionicScrollDelegate, $translate, $ionicSideMenuDelegate, questionsServices, $timeout, $rootScope, URL_LOCALHOST) {

  $scope.$on('$ionicView.beforeEnter', function()
  {

    $scope.loading = false;

    $rootScope.counter = 10;
    $rootScope.menu_show= false;

    $ionicSideMenuDelegate.canDragContent(false);

  });
  
  $scope.localhost = URL_LOCALHOST;

  $scope.localhost = $scope.localhost.substring(0, $scope.localhost.length-1);


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

  $scope.startTime = function ()
  {
    console.log("OK!!!!");
  }

  $scope.startTimer = function() {

    console.log("Start counter!!!");
    //$scope.question_game = question;
    console.log($scope.question_game);
    $rootScope.counter = 10;

    $scope.loading = true;
    $ionicLoading.hide();

    $timeout(function () {
       

    }, 750);

    /**********************************************************************
    DISABLE CHRONOMETER!
    ***********************************************************************/
    mytimeout = $timeout($scope.onTimeout, 1000);
    console.log("138 line: " + $scope.question_game);

    window.localStorage.setItem("game_id", "");

    console.log("GAME_ID: " + window.localStorage.getItem("game_id"));

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
          //Send -1 if time end...
          $scope.sendOption(-1);
      }
  });

  $scope.sendOption = function (option)
  {
    $scope.stopTimer();
    console.log(option);
    $state.go('app.result', {
                              choose: option,
                              game_id: $scope.question_game.game_id,
                              question_id: $scope.question_game.id,
                              round: $scope.question_game.round,
                              rounds: $scope.question_game.rounds
                            });
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });

  };

  $scope.showVideo = function ()
  {
    window.open($scope.question.video, '_blank', 'location=yes');
    $scope.video = $scope.question.video;
    console.log('$scope.playvideo: '+$scope.playvideo );
  };
  $ionicLoading.show();


  questionsServices.getQuestion()
          .then(function(resp)
  {
    console.log(resp);

    $scope.question = resp.data;
    console.log($scope.question);

    //Provisional to show always image!!!
    /*if ($scope.question.photo === "")
    {
      $scope.question.photo = "/media/photologue/photos/cache/YU9JTL6FSY_display.jpg";
    }*/

    //$scope.startTimer($scope.question);

    $scope.question_game = $scope.question;
    console.log(JSON.stringify($scope.question_game));
    $rootScope.counter = 10;

    if ($scope.question_game.photo === "")
    {
      console.log("Not image question");
      $scope.startTimer();
    }

    
    
  //console.log($scope.question);
  },
  function(error)
  {
    console.error("Errorea");

    window.localStorage.setItem("game_id", "");
  });

});




