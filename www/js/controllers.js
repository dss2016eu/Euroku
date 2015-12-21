angular.module('euroku.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, URL_LOCALHOST, $rootScope, $timeout, $ionicActionSheet, $rootScope, $translate, $ionicPopup, $state, $cordovaSocialSharing) {

  if (window.localStorage.getItem('lang') === null)
  {
    $translate.use('es');
    window.localStorage.setItem('lang', 'es');
  }

  $scope.selectlang = window.localStorage.getItem('lang');
  if ($scope.selectlang === 'eu')
  {
    $scope.popup_title = translations_eu.popup_title;
    $scope.popup_description = translations_eu.popup_description;
    $scope.share_text = translations_eu.share_social_text;
  }
  else if ($scope.selectlang === 'es')
  {
    $scope.popup_title = translations_es.popup_title;
    $scope.popup_description = translations_es.popup_description;
    $scope.share_text = translations_es.share_social_text;
  }
  else if ($scope.selectlang === 'en')
  {
    $scope.popup_title = translations_en.popup_title;
    $scope.popup_description = translations_en.popup_description;
    $scope.share_text = translations_en.share_social_text;
  }

  $rootScope.shareApp = function()
  {

    $cordovaSocialSharing.share("#Donostia2016 " + $scope.share_text, "Donostia2016", "img/erokulogoa02.png", "http://dss2016.eu/eu/");
  }

  $rootScope.goToPlay = function()
  {
    if (window.localStorage.getItem('select_language') !== '1')
    {
      var alertPopup = $ionicPopup.show({
             title: $scope.popup_title,
             buttons: [
                          {
                          text: '<b>OK</b>',
                          type: 'button-dark',
                              onTap: function(e) {
                                $rootScope.optionsLanguage();
                              }
                          }
                      ],
             template: '<h3 class="center">' + $scope.popup_description + '</h3>'
      });
    }
    else
    {
      $state.go('app.quiz');
    }

  };
  $rootScope.optionsLanguage = function()
  {
    // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<b>English</b>' },
       { text: '<b>Español</b>' },
       { text: '<b>Euskara</b>' }
     ],
     //titleText: 'Modify your album',
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
        console.log(index);

        switch(index) {
            case 0:
                $scope.updateLanguage('en');
                break;
            case 1:
                $scope.updateLanguage('es');
                break;
            case 2:
                $scope.updateLanguage('eu');
                break;
        }
       return true;
     }
   });
  };

  $scope.updateLanguage = function(key)
  {
    $translate.use(key);
    window.localStorage.setItem('lang', key);
    console.log(window.localStorage.getItem('lang'));
    window.localStorage.setItem('select_language', '1');
    $state.go('app.main');
    $ionicHistory.nextViewOptions({
              disableBack: true
    });

  };

  $rootScope.menu_show = false;



  /****************************************************************************
    CHRONOMETER
  *****************************************************************************/

  $scope.counter = 10;

    var mytimeout = null; // the current timeoutID

    // actual timer method, counts down every second, stops on zero
    $scope.onTimeout = function() {
        if($scope.counter ===  0) {
            $scope.$broadcast('timer-stopped', 0);
            $timeout.cancel(mytimeout);
            return;
        }
        $scope.counter--;
        console.log($scope.counter);
        mytimeout = $timeout($scope.onTimeout, 1000);
    };

    $scope.startTimer = function() {
        mytimeout = $timeout($scope.onTimeout, 1000);
    };

    // stops and resets the current timer
    $scope.stopTimer = function() {
        $scope.$broadcast('timer-stopped', $scope.counter);
        $scope.counter = 10;
        $timeout.cancel(mytimeout);
    };

    // triggered, when the timer stops, you can do something here, maybe show a visual indicator or vibrate the device
    $scope.$on('timer-stopped', function(event, remaining) {
        if(remaining === 0) {
            console.log('your time ran out!');
        }
    });
})

.controller('MainCtrl', function($scope, $ionicSideMenuDelegate, $state, $translate, $rootScope, $ionicHistory, $ionicSideMenuDelegate)
{
  //$ionicSideMenuDelegate.canDragContent(false);
  $rootScope.menu_show = true;

  if (window.localStorage.getItem('select_language') === '1')
  {
    $scope.show_play_button = true;
    $rootScope.menu_show = true;
    $ionicSideMenuDelegate.canDragContent(true);
  }
  else
  {
    $scope.show_play_button = false;
    $rootScope.menu_show = false;
    $ionicSideMenuDelegate.canDragContent(false);
  }

  $scope.selectLanguageToStart = function(key)
  {
    $translate.use(key);
    window.localStorage.setItem('lang', key);
    console.log(window.localStorage.getItem('lang'));
    window.localStorage.setItem('select_language', '1');
    $scope.show_play_button = true;
    $rootScope.menu_show = true;
    $ionicSideMenuDelegate.canDragContent(true);
    //$state.go('app.mainmenu');
  };

  $scope.goPlay = function()
  {
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
    $state.go('app.quiz');
  };
})

.controller('SettingsCtrl', function($scope, $ionicHistory, $state) {
  $scope.answer_correct = getRandomInt(1,16); //get a number in range 1-16
  $scope.total_answer = 16;

  $scope.progress = ($scope.answer_correct * 100) / $scope.total_answer;
})
.controller('WhatIsCtrl', function($scope, $ionicHistory, $state) {
  $scope.morePlay = function ()
  {
    window.localStorage.setItem ('result', 'true');
    //$state.go('app.play', {}, {reload: true});
    $state.go('app.quiz');
    $ionicHistory.nextViewOptions({
              disableBack: true
    });

  };
  $scope.goToSource = function (index)
    {
        var url = 'http://www.codesyntax.com';
      console.log(index+"index...");
      if (index === 1)
      {
        url = 'http://www.codesyntax.com';
      }
      else if (index === 2)
      {
        url = 'http://www.ahotsak.eus';
      }
      else
      {
        url = 'http://www.euskara.euskadi.eus/';
      }

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
