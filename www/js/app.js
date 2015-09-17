// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('euroku', ['ionic',
                          'ngCordova' ,
                          'euroku.controllers',
                          'euroku.register',
                          'euroku.login',
                          'euroku.mainmenu',
                          'euroku.quiz',
                          'euroku.directives',
                          'euroku.constants',
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

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
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

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/main');
});
