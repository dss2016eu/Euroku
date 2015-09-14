angular.module('euroku.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});


  /********

  play format:

  {"q1":{"attribution":"","qtype":{"desc":"","id":93,"title":"Nork margotu zuen?"},"id":206348,"desc":""
,"photo_url_xxhdpi":"/media/photologue/photos/cache/1435837131_xxhdpi.jpg","title":"Margolaria","url"
:"http://anitalaydonmillersmiddlegradeblog.blogspot.com/2010/07/oil-pastel-klee-portrait.html","incorrect_answer_two"
:"Edvard Munch","incorrect_answer_one":"Mark Rothko","provider":"anitalaydonmillersmiddlegradeblog.blogspot
.com","correct_answer":"Paul Klee"},"q3":{"attribution":"EpMartín ☼","qtype":{"desc":"","id":8,"title"
:"Zer herri da argazkikoa?"},"id":13299,"desc":null,"photo_url_xxhdpi":"/media/photologue/photos/cache
/1405409010870_xxhdpi.jpg","title":"Zer herritakoa da argazki hau?","url":"http://www.panoramio.com/photo
/29516313","incorrect_answer_two":"Mugerre","incorrect_answer_one":"Iurreta","provider":"Panoramio","correct_answer"
:"Senpere"},"q2":{"attribution":"AritzIbañezLusarreta @aritzibanez","qtype":{"desc":"","id":3,"title"
:"Hitzokei"},"id":10447,"desc":"","photo_url_xxhdpi":"","title":"Greziar musikari zorrotzegia","url"
:"http://twitter.com/aritzibanez/status/484944044007886848","incorrect_answer_two":"BELAUKNEEKATU","incorrect_answer_one"
:"MUGIRO","provider":"Twitter","correct_answer":"TIKIS MIKIS THEODORAKIS"},"q5":{"attribution":"Wikipedia"
,"qtype":{"desc":"","id":22,"title":"Nazioak"},"id":33559,"desc":null,"photo_url_xxhdpi":"/media/photologue
/photos/cache/1410366424_xxhdpi.jpg","title":"Munduko banderak","url":"http://eu.wikipedia.org/wiki/Azawad"
,"incorrect_answer_two":"Akrotiri eta Dhekelia","incorrect_answer_one":"Argentina","provider":"Wikipedia"
,"correct_answer":"Azawad"},"q4":{"attribution":"","qtype":{"desc":"","id":9,"title":"Non jaio zen?"
},"id":9650,"desc":"","photo_url_xxhdpi":"","title":"Mari Abrego Santesteban mendigoizalea eta Euskal
 Herriko himalaismoaren aitzindaria izan da. Non jaio zen?","url":"http://eu.wikipedia.org/wiki/Mari_Abrego"
,"incorrect_answer_two":"Miranda Arga","incorrect_answer_one":"Tutera","provider":"Wikipedia","correct_answer"
:"Iruñea"},"id":220969}

  *****/

  // Form data for the login modal
  $scope.loginData = {};

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

.controller('PlaylistsCtrl', function($scope, $translate, $ionicPlatform, $window) {

  $scope.$on('$ionicView.afterEnter', function(){
    console.log(window.localStorage.getItem('lang'));
    $translate.use(window.localStorage.getItem('lang'));
    console.log("49 Playlist");

    if (window.localStorage.getItem('change_language') === "yes")
    {
      $window.location.reload(true);
      window.localStorage.setItem('change_language', "no");
      console.log("Change language...");
    }
    //$window.location.reload(true)
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

.controller('MainCtrl', function($scope, $ionicSideMenuDelegate, $state, $translate)
{
  $ionicSideMenuDelegate.canDragContent(false);

  $scope.goToMainMenuLayout = function(key)
  {
    $translate.use(key);
    window.localStorage.setItem('lang', key);
    console.log(window.localStorage.getItem('lang'));
    $state.go('app.mainmenu');
  };
})

.controller('PlaylistCtrl', function($scope, $stateParams, $translate, $state) {

  $translate.use(window.localStorage.getItem('lang'));
  $scope.changeLanguage = function (key) {
    $translate.use(key);
    window.localStorage.setItem('lang', key);
    console.log(window.localStorage.getItem('lang'));
    window.localStorage.setItem('change_language', "yes");
  };

  $scope.returnToMain = function ()
  {
    $state.go('app.playlists');
  };


});
