angular.module('euroku.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, URL_LOCALHOST, $rootScope, $ionicActionSheet, $rootScope, $translate, $ionicPopup) {

  if (window.localStorage.getItem('lang') === null)
  {
    $translate.use('es');
    window.localStorage.setItem('lang', 'es');
  }

  $rootScope.goToPlay = function()
  {
    $scope.selectlang = window.localStorage.getItem('lang');
    if ($scope.selectlang === 'eu')
    {
      $scope.popup_title = translations_eu.popup_title;
      $scope.popup_description = translations_eu.popup_description;
    }
    else if ($scope.selectlang === 'es')
    {
       $scope.popup_title = translations_es.popup_title;
      $scope.popup_description = translations_es.popup_description;
    }
    else if ($scope.selectlang === 'en')
    {
       $scope.popup_title = translations_en.popup_title;
      $scope.popup_description = translations_en.popup_description;
    }
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
  };

  // Form data for the login modal
  $scope.loginData = {};

  $rootScope.menu_show = false;

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/user/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, $translate, $ionicPlatform, $window, $rootScope) {
 // $rootScope.menu_show = true;
  $scope.$on('$ionicView.afterEnter', function(){

    $rootScope.menu_show = true;

    if (window.localStorage.getItem('lang') === null)
    {
      window.localStorage.setItem('lang', 'es');
    }
    console.log(window.localStorage.getItem('lang'));
    $translate.use(window.localStorage.getItem('lang'));
    console.log("49 Playlist");
  });

  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('MainCtrl', function($scope, $ionicSideMenuDelegate, $state, $translate, $rootScope, $ionicHistory)
{
  //$ionicSideMenuDelegate.canDragContent(false);
  $rootScope.menu_show = true;

  if (window.localStorage.getItem('select_language') === '1')
  {
    $scope.show_play_button = true;
  }
  else
  {
    $scope.show_play_button = false;
  }

  $scope.goToMainMenuLayout = function(key)
  {
    $translate.use(key);
    window.localStorage.setItem('lang', key);
    console.log(window.localStorage.getItem('lang'));
    window.localStorage.setItem('select_language', '1');
    $scope.show_play_button = true;
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

.controller('PlaylistCtrl', function($scope, $stateParams, $translate, $state, $ionicHistory, $ionicSideMenuDelegate) {

$ionicSideMenuDelegate.canDragContent(false);
  $translate.use(window.localStorage.getItem('lang'));
  $scope.changeLanguage = function (key) {
    $translate.use(key);
    window.localStorage.setItem('lang', key);
    console.log(window.localStorage.getItem('lang'));
    window.localStorage.setItem('change_language', "yes");
  };

  $scope.returnToMain = function ()
  {
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
    $state.go('app.playlists');
  };


})

.controller('SettingsCtrl', function($scope, $ionicHistory, $state) {
  $scope.answer_correct = 6;
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
