
angular.module('euroku', ['ionic',
                          'ngCordova' ,
                          'euroku.controllers',
                          'euroku.register',
                          'euroku.login',
                          'euroku.mainmenu',
                          'euroku.quiz',
                          'euroku.result',
                          'euroku.directives',
                          'euroku.constants',
                          'euroku.services.questions',
                          'pascalprecht.translate',
                          'ngMessages'])

.run(function($ionicPlatform, URL_LOCALHOST) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  console.log(window.localStorage.getItem('device_id'));

  if (window.localStorage.getItem('device_id') === null || window.localStorage.getItem('device_id') === "")
  {
      window.localStorage.setItem ('device_id', 1);
  }

  if (window.localStorage.getItem('lang') === null)
  {
    if(typeof navigator.globalization !== "undefined") {
              navigator.globalization.getPreferredLanguage(function(language) {
                  $translate.use((language.value).split("-")[0]).then(function(data) {
                      console.log("SUCCESS -> " + data);
                      //window.alert(language.value);
                  }, function(error) {
                      console.log("ERROR -> " + error);
                  });
              }, null);
              window.localStorage.setItem('lang', (language.value).split("-")[0]);
              console.log('Hizkuntza gordeta: '+ window.localStorage.getItem('lang'));
    }
  }
  else
  {
    console.log(window.localStorage.getItem('lang'));
  }

})


.config(function($translateProvider) {

  $translateProvider.translations('eu', translations_eu);
  $translateProvider.translations('en', translations_en);
  $translateProvider.translations('es', translations_es);
  $translateProvider.preferredLanguage(window.localStorage.getItem('lang'));
  // Enable escaping of HTML
  $translateProvider.useSanitizeValueStrategy('escaped');
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.main', {
    url: '/main',
    views: {
      'menuContent': {
        templateUrl: 'templates/general/main.html',
        controller: 'MainCtrl'
      }
    }
  })

  .state('app.mainmenu', {
    url: '/mainmenu',
    views: {
      'menuContent': {
        templateUrl: 'templates/general/main_with_select_language.html',
        controller: 'MainMenuCtrl'
      }
    }
  })

  .state('app.register', {
    url: '/register',
    views: {
      'menuContent': {
        templateUrl: 'templates/user/register.html',
        controller: 'RegisterCtrl'
      }
    }
  })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/user/login.html',
        controller: 'LoginCtrl'
      }
    }
  })

  .state('app.quiz', {
    url: '/quiz',
    views: {
      'menuContent': {
        templateUrl: 'templates/game/quiz.html',
        controller: 'QuizCtrl'
      }
    }
  })

  .state('app.result', {
    url: '/result',
    views: {
      'menuContent': {
        templateUrl: 'templates/game/result.html',
        controller: 'ResultCtrl'
      }
    }
  })

  .state('app.whatis', {
      url: '/whatis',
      views: {
        'menuContent': {
          templateUrl: 'templates/general/whatis.html',
          controller: 'WhatIsCtrl'
        }
      }
    })

  .state('app.settings', {
      url: '/settings',
      views: {
        'menuContent': {
          templateUrl: 'templates/user/settings.html',
          controller: 'SettingsCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/main');
});
