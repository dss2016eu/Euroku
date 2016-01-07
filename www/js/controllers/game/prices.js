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

.controller('PricesCtrl', function($scope, $rootScope, $ionicSideMenuDelegate, pricesServices) {
  $rootScope.menu_show = true;
  $ionicSideMenuDelegate.canDragContent(true);

  pricesServices.getUserListPrices()
        .then(function(resp)
      {
        console.log("52: " + resp);
      },
      function(error)
      {
        console.error(error);
  });

  pricesServices.getPriceDetails()
    .then (function(resp)
      {
        console.log("52: " + resp);
      },
      function(error)
      {
        console.error(error);
  });


    pricesServices.getPublicPriceList()
    .then (function(resp)
      {
        console.log("52: " + resp);
      },
      function(error)
      {
        console.error(error);
  });

      $scope.prices = [
                        {
                          description: "Price description...",
                          title: "Boligrafoa",
                          photo: "",
                          active: true,
                          id: 129
                        },
                        {
                          description: "Price description...",
                          title: "Kursaal Sarrerak",
                          photo: "",
                          active: false,
                          id: 130
                        },
                        {
                          description: "Sarrerak hitzaldirako",
                          title: "Tokialdatu / Desplazamiento",
                          photo: "",
                          active: false,
                          id: 136
                        },
                        {
                          description: "Potentzia handiko linternak eskuan hartuta, 30 bat pertsonako...",
                          title: "Argi-gerrilla",
                          photo: "",
                          active: true,
                          id: 131
                        },
                        {
                          description: "Price description...",
                          title: "Feministaldia",
                          photo: "",
                          active: true,
                          id: 133
                        }
                    ];

    console.log($scope.prices);

});




