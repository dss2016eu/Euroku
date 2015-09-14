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
									$state, $ionicScrollDelegate, $translate, $ionicSideMenuDelegate) {

  //Not show left side menu with drag action
  $ionicSideMenuDelegate.canDragContent(false);

  if (window.localStorage.getItem('lang') === null)
  {
        console.log('Not specify language...');
        $scope.selectlang = 'eu';
  }
  else
  {
        $scope.selectlang = window.localStorage.getItem('lang');
  }

  $scope.class_name = "chrono_back";

  //Load select tribe id from preferences file

  //$scope.selectlang = 'eu';

  $translate.use($scope.selectlang);

  $scope.select_tribe_id = window.localStorage.getItem ('select_tribe_id');

  if ($scope.select_tribe_id === null || $scope.select_tribe_id === '')
  {
    $scope.select_tribe_id = 1;
    window.localStorage.setItem('select_tribe_id', 1);
  }

	//Response variables to use in quiz...

	$scope.correctanswer = false;
	$scope.incorrectanswer = false;
	$scope.choice = '-----';
	$scope.disabled = false;
	$scope.orders = [];
	$scope.currentanswer = 0;
	$scope.questionshow = [true, false, false, false, false];
	$scope.containimage = [false, false, false, false, false];
  $scope.images = [];
	$scope.next = false;
	$scope.finish = false;

  $scope.tribualtime = '00:00:00';

  $scope.userresponseresults = [0, 0, 0, 0, 0];

	$scope.orders = randomAnswersOrders ();

	$ionicHistory.nextViewOptions({
	            disableBack: true
	});
  	$scope.title = 'Partida';

  	$scope.token = window.localStorage.getItem ('token');
  	$scope.username = window.localStorage.getItem ('username');

  	$ionicLoading.show();

  	//Game Quiz data...

  	$scope.quizid = 0;

    //chronoStop();

	var req = {
		 method: 'GET',
		 url: 'https://tribual.codesyntax.com/api/v1/get?tribe_id='+ $scope.select_tribe_id,
		 headers: {
		   'Content-Type': 'application/json',
		   'Authorization': 'Token '+ $scope.token
		 }
	};

  var data = '{"q1":{"attribution":"","qtype":{"desc":"","id":93,"title":"Nork margotu zuen?"},"id":206348,"desc":""' +
',"photo_url_xxhdpi":"/media/photologue/photos/cache/1435837131_xxhdpi.jpg","title":"Margolaria","url"'+
':"http://anitalaydonmillersmiddlegradeblog.blogspot.com/2010/07/oil-pastel-klee-portrait.html","incorrect_answer_two"' +
':"Edvard Munch","incorrect_answer_one":"Mark Rothko","provider":"anitalaydonmillersmiddlegradeblog.blogspot ' +
'.com","correct_answer":"Paul Klee"},"q3":{"attribution":"EpMartín ☼","qtype":{"desc":"","id":8,"title"' +
':"Zer herri da argazkikoa?"},"id":13299,"desc":null,"photo_url_xxhdpi":"/media/photologue/photos/cache'+
'/1405409010870_xxhdpi.jpg","title":"Zer herritakoa da argazki hau?","url":"http://www.panoramio.com/photo' +
'/29516313","incorrect_answer_two":"Mugerre","incorrect_answer_one":"Iurreta","provider":"Panoramio","correct_answer"'+
':"Senpere"},"q2":{"attribution":"AritzIbañezLusarreta @aritzibanez","qtype":{"desc":"","id":3,"title"'+
':"Hitzokei"},"id":10447,"desc":"","photo_url_xxhdpi":"","title":"Greziar musikari zorrotzegia","url"'+
':"http://twitter.com/aritzibanez/status/484944044007886848","incorrect_answer_two":"BELAUKNEEKATU","incorrect_answer_one"'+
':"MUGIRO","provider":"Twitter","correct_answer":"TIKIS MIKIS THEODORAKIS"},"q5":{"attribution":"Wikipedia"'+
',"qtype":{"desc":"","id":22,"title":"Nazioak"},"id":33559,"desc":null,"photo_url_xxhdpi":"/media/photologue'+
'/photos/cache/1410366424_xxhdpi.jpg","title":"Munduko banderak","url":"http://eu.wikipedia.org/wiki/Azawad"'+
',"incorrect_answer_two":"Akrotiri eta Dhekelia","incorrect_answer_one":"Argentina","provider":"Wikipedia"'+
',"correct_answer":"Azawad"},"q4":{"attribution":"","qtype":{"desc":"","id":9,"title":"Non jaio zen?"'+
'},"id":9650,"desc":"","photo_url_xxhdpi":"","title":"Mari Abrego Santesteban mendigoizalea eta Euskal'+
 'Herriko himalaismoaren aitzindaria izan da. Non jaio zen?","url":"http://eu.wikipedia.org/wiki/Mari_Abrego"'+
',"incorrect_answer_two":"Miranda Arga","incorrect_answer_one":"Tutera","provider":"Wikipedia","correct_answer"'+
':"Iruñea"},"id":220969}';

  console.log(data);

  data = JSON.parse(data);
  console.log(data);
  $scope.quizid = data.id;
  $scope.questions = [data.q1, data.q2, data.q3, data.q4, data.q5];

  $scope.answervarnames = ['answer_one', 'answer_two', 'answer_three', 'answer_four', 'answer_five'];
  $scope.startgame = true;

  $scope.answer_questions = [];

  for (var q = 0; q < $scope.questions.length; q++)
  {
      if ($scope.questions [q].photo_url_xxhdpi === '')
      {
        $scope.containimage [q] = false;
        console.log('Irudia ez du');
        $scope.images.push('img/ic_blank.png');
      }
      else
      {
        $scope.containimage [q] = true;
        console.log('Irudia DU');
        $scope.images.push('https://tribual.codesyntax.com'+$scope.questions[q].photo_url_xxhdpi);
      }

      var question_answer = [];
      for (var a = 0; a < 3; a++)
      {
          if ($scope.orders [q] [a] === 1)
          {
              question_answer.push($scope.questions[q].correct_answer);
          }
          else if ($scope.orders [q] [a] === 2)
          {
              question_answer.push($scope.questions[q].incorrect_answer_one);
          }
          else if ($scope.orders [q] [a] === 3)
          {
              question_answer.push($scope.questions[q].incorrect_answer_two);
          }

      }

      $scope.answer_questions.push(question_answer);
  }

  console.log($scope.answer_questions);

  console.log('******************************************');
  console.log($scope.images [0]);
  console.log($scope.images [1]);
  console.log($scope.images [2]);
  console.log($scope.images [3]);
  console.log($scope.images [4]);
  console.log('******************************************');
  $ionicLoading.hide();

	/*$http(req).success(function(data){
			console.log(data);
			$scope.quizid = data.id;
			$scope.questions = [data.q1, data.q2, data.q3, data.q4, data.q5];

			$scope.answervarnames = ['answer_one', 'answer_two', 'answer_three', 'answer_four', 'answer_five'];
            $scope.startgame = true;

            $scope.answer_questions = [];

            for (var q = 0; q < $scope.questions.length; q++)
            {
                if ($scope.questions [q].photo_url_xxhdpi === '')
                {
                  $scope.containimage [q] = false;
                  console.log('Irudia ez du');
                  $scope.images.push('img/ic_blank.png');
                }
                else
                {
                  $scope.containimage [q] = true;
                  console.log('Irudia DU');
                  $scope.images.push('https://tribual.codesyntax.com'+$scope.questions[q].photo_url_xxhdpi);
                }

                var question_answer = [];
                for (var a = 0; a < 3; a++)
                {
                    if ($scope.orders [q] [a] === 1)
                    {
                        question_answer.push($scope.questions[q].correct_answer);
                    }
                    else if ($scope.orders [q] [a] === 2)
                    {
                        question_answer.push($scope.questions[q].incorrect_answer_one);
                    }
                    else if ($scope.orders [q] [a] === 3)
                    {
                        question_answer.push($scope.questions[q].incorrect_answer_two);
                    }

                }

                $scope.answer_questions.push(question_answer);
            }

            console.log($scope.answer_questions);

            console.log('******************************************');
      			console.log($scope.images [0]);
            console.log($scope.images [1]);
            console.log($scope.images [2]);
            console.log($scope.images [3]);
            console.log($scope.images [4]);
            console.log('******************************************');

            //chronoStart();
		}).error(function(){
			console.log('Error');
			 $ionicLoading.hide();
		})
		.then(function() {
            $ionicLoading.hide();
            window.localStorage.setItem('quiz_play', true);
            console.log('[QUIZ PLAY] (quiz.js--> 144): ' + window.localStorage.getItem('quiz_play'));
        });*/

	$scope.endGame = function ()
	{
		/*$http.defaults.headers.post['Authorization'] = 'Token '+ $scope.token;

    $scope.gametime = time ();
    console.log('Time to finish: ' + $scope.gametime);
        //$http.defaults.headers.post= {'Authorization': 'Token '+ $scope.loginstatus.token};
	 	var url = 'https://tribual.codesyntax.com/api/v1/get';

        $scope.params = 'answer_one='+$scope.userresponseresults [0]+
                        '&answer_two='+$scope.userresponseresults [1]+
                        '&answer_three='+$scope.userresponseresults [2]+
                        '&answer_four='+$scope.userresponseresults [3]+
                        '&answer_five='+$scope.userresponseresults [4]+
                        '&response_time=' + $scope.gametime+
                        '&quiz_id='+$scope.quizid;

        $http.post(url, $scope.params).
                success(function(data, status, headers, config) {
                    console.log(data);
                }).
                error(function(data, status, headers, config) {
                  console.log('Error:' + status);
                }).
                then(function()
                  {
                    window.localStorage.setItem('quiz_play', false);
                    console.log('[QUIZ PLAY] (quiz.js--> 173): ' + window.localStorage.getItem('quiz_play'));
                    $state.go('app.results',{'gameId':$scope.quizid});

                    /*$ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                });*/


        //$state

        $state.go('app.main');
	};



  	$scope.checkAnswer = function (value, index)
  	{
  		//chronoStop();

      $ionicScrollDelegate.scrollBottom();

  		$scope.currentanswer = index+1;
  		$scope.correctanswer = false;
  		$scope.incorrectanswer = false;
  		$scope.disabled = true;

  		console.log(value + ' '+ index+ 'Question nº: '+ $scope.currentanswer);
  		//$scope.disabled = true;
    	if (value === 1)
    	{
      		$scope.correctanswer = true;
    	}
    	else
    	{
    		$scope.incorrectanswer = true;
    	}
    	console.log('Check Answer: ' + value);
    	console.log('Asmatua: ' + $scope.correctanswer);
    	console.log('Hutsa: ' + $scope.incorrectanswer);

      if ($scope.correctanswer === true) //asmatua
      {
        $scope.userresponseresults [index] = 1;
      }

    	if ($scope.currentanswer === 5)
    	{
    		console.log('Game Finish');
    		$scope.next = false;
			  $scope.finish = true;
    	}
    	else
    	{
    		$scope.next = true;
    	}
  	};

  	$scope.nextQuestion = function ()
  	{
  		$scope.correctanswer = false;
  		$scope.incorrectanswer = false;
		  $scope.next = false;
  		$scope.disabled = false;

  		//Hurrengo galdera erakutsi
  		$scope.questionshow [$scope.currentanswer] = true;

  		//Erantzun den galdera ezkutatzeko
  		$scope.questionshow [$scope.currentanswer -1 ] = false;

  		//$scope.containimage [$scope.currentanswer] = true;

  		$scope.containimage [$scope.currentanswer - 1] = false;

      //chronoContinue();

      $ionicScrollDelegate.scrollTop();
  	};

});


function randomAnswersOrders ()
{
    //'1' value is correct answer
    var random = [];
    for (var j = 0; j < 5; j++)
    {
        var i, arr = [];
        for (i = 1; i < 4; i++)
        {
            arr.push(i);
        }
        arr.sort(function ()
        {
            return Math.random() - 0.5;
        });

        //console.log(arr);
        random.push(arr);
    }
    console.log(random);
    return random;
}




