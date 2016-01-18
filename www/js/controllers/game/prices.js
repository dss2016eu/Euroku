/*****************************************************
* Euroku - Partida
* GET motako API eskaera bat harturik:
* Sartu URL
* Pasatu beharko zaio erabiltzaile token-a
* @ngdoc function
* @name Tribual.Quiz.controller:QuizCtrl
* @description
* # PricesCtrl
* Controller of the Euroku Game
*******************************************************/

angular.module('euroku.prices', [])

.controller('PricesCtrl', function($scope, $rootScope, $ionicSideMenuDelegate, pricesServices) {
  $rootScope.menu_show = true;
  $ionicSideMenuDelegate.canDragContent(true);

  //Erabiltzailearen sariak
  pricesServices.getUserListPrices()
        .then(function(resp)
      {
        console.log("52: " + resp);
      },
      function(error)
      {
        console.error(error);
  });

  //Lortutako sariaren xehetasunak
  /*pricesServices.getPriceDetails("DSS2016BOLI_1")
    .then (function(resp)
      {
        console.log("52: " + resp);
      },
      function(error)
      {
        console.error(error);
  });*/

  //Dauden sari guztien zerrenda
    pricesServices.getPublicPriceList()
    .then (function(resp)
      {
        console.log("52: " + resp.data[0].amount);

        $scope.user_prices = [];

        for (var i = 0; i < resp.data.length; i++)
        {
          var prices = {
                        amount: resp.data[i].amount,
                        title: resp.data[i].title,
                        enddate: resp.data[i].enddate
                      };
          $scope.user_prices.push(prices);
        }
        console.log($scope.user_prices);

      },
      function(error)
      {
        console.error(error);
        $scope.user_prices = [
                        {
                          amount: "Price description...",
                          title: "Boligrafoa",
                          enddate: "2016-02-25",
                          key: "AJUEH2910",
                          calimed: true
                        },
                        {
                          amount: "Price description...",
                          title: "Boligrafoa",
                          enddate: "2016-02-10",
                          key: "AJUEH2110",
                          calimed: true
                        },
                        {
                          amount: "Sarrerak hitzaldirako",
                          title: "Tokialdia / Desplazamiento",
                          enddate: "2016-01-25",
                          key: "ALOEH2910",
                          calimed: true
                        },
                        {
                          amount: "Potentzia handiko linternak eskuan hartuta, 30 bat pertsonako...",
                          title: "Argi gerrilla",
                          enddate: "2016-02-25",
                          key: "AJUEJ0910",
                          calimed: false
                        },
                        {
                          amount: "Price description...",
                          title: "Feministaldia",
                          enddate: "2016-03-30",
                          calimed: false,
                          key: "AJDHEWU920"
                        }
                    ];

        console.log($scope.user_prices);
  });



});




