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

angular.module('euroku.prices', [])

.controller('PricesCtrl', function($scope, $rootScope, $ionicSideMenuDelegate) {
  $rootScope.menu_show = true;
  $ionicSideMenuDelegate.canDragContent(true);
});




