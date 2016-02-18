angular.module('euroku.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, URL_LOCALHOST, $ionicHistory, $rootScope, $timeout,
                            $ionicActionSheet, $rootScope, $translate, $ionicPopup, $state, $cordovaSocialSharing, profileServices, $ionicPlatform) {

  $scope.url = "";

  //Hardware Back button manage
  $ionicPlatform.registerBackButtonAction(function(event){
    //window.alert("BACK: " + $ionicHistory.currentStateName());
    console.log("Back: " + $ionicHistory.currentStateName());
    var url = $ionicHistory.currentStateName();
    if (url === "app.details_price")
    {
      console.log("CONTROLLER 14: " + window.localStorage.getItem('save_from_location'));
      var dir = window.localStorage.getItem('save_from_location');

      if (dir === "app.iritzia" || dir === "app.komunitatetik")
      {
        console.log('url: ' + dir);
        $state.go(dir, { 'id': dir.substring(4)});
      }
      else
      {
        $state.go(dir);
      }

      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
    }
    else
    {
      navigator.app.exitApp();
    }
    event.preventDefault();

  }, 100);

  $scope.getRandomBoolean = function()
  {
    return parseInt(Math.random() * 2) ?  true : false;
  };


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

  $scope.morePlay = function ()
  {
    $state.go('app.quiz');
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });

  };

  $rootScope.shareApp = function()
  {
    console.log("SHARE!!!");
    $cordovaSocialSharing.share("#Donostia2016 " + $scope.share_text, "Donostia2016", "img/erokulogoa02.png", "http://dss2016.eu/eu/");
  }

  $scope.shareEmail = function ()
  {
    $cordovaSocialSharing
     .shareViaEmail("Kontaktua", "", "")
     .then(function(result) {

     }, function(err) {
       // An error occurred. Show a message to the user
     });
  };

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

    //ion-android-checkbox
    // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
        { text: '<i class="icon ion-android-checkbox positive"></i> English' },
        { text: '<i class="icon ion-android-checkbox positive"></i> Español' },
        { text: '<i class="icon ion-android-checkbox positive"></i> Euskara' }
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
              disableBack: true,
              disableAnimate: true
    });
    if (window.localStorage.getItem('device_id') === null || window.localStorage.getItem('device_id') === "")
    {
      profileServices.getDevideID(key)
            .then(function(resp)
      {
        console.log(resp);
        window.localStorage.setItem ('device_id', resp.data.device_id);
        window.localStorage.setItem ('game_id', "");

      //console.log($scope.question);
      },
      function(error)
      {
        window.localStorage.setItem ('device_id', '');
        window.localStorage.setItem('select_language', '');
        window.alert(error);
      });
    }
    else
    {
      $scope.updatePreferences (key);
    }

  };

  $scope.updatePreferences = function(key)
  {
    var language = key;
    console.log(language);

    profileServices.setDetails(language)
          .then(function(resp)
    {
      console.log("Controller (141): " + resp.data.language);
    },
    function(error)
    {
      console.error(error);
    });

  };

  $rootScope.menu_show = false;

  $scope.goToSourceCustom = function ()
  {
    console.log($scope.url);

    $scope.openBrowser($scope.url);
  };

  $scope.storeUrls = function (elements)
  {
    console.log(elements);

    if (elements.error === true)
    {
      window.localStorage.setItem("game_id", "");
    }

    $scope.url = elements.url;
    console.log($scope.url);

  };

  $scope.storePriceDetailsUrls = function(prices)
  {
    var urls = [];
    for (var i = 0; i < prices.length; i++)
    {
      console.log(prices[i].url);
      urls.push(prices[i].url);
    }
    return urls;
  }

  $scope.openBrowser = function (url)
  {
    window.open(url, '_system');
  };

})

.controller('MainCtrl', function($scope, $ionicSideMenuDelegate, $state, $translate, $rootScope, $ionicHistory, $ionicSideMenuDelegate, profileServices)
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
    if (window.localStorage.getItem('device_id') === null || window.localStorage.getItem('device_id') === "")
    {

      console.log("Update to: " + key);
      $scope.updateLanguage (key);

    }
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

.controller('WhatIsCtrl', function($scope, $ionicHistory, $state) {
  $scope.morePlay = function ()
  {
    window.localStorage.setItem ('result', 'true');
    //$state.go('app.play', {}, {reload: true});
    $state.go('app.quiz');
    $ionicHistory.nextViewOptions({
              disableBack: true,
              disableAnimate: true
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

    //Open browser with select url
    $scope.openBrowser (url);

  };


});
