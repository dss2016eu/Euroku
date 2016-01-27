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

.controller('PricesCtrl', function($scope, $rootScope, $ionicSideMenuDelegate, pricesServices, $state, $ionicHistory, $ionicLoading) {
  $rootScope.menu_show = true;
  $ionicSideMenuDelegate.canDragContent(true);

  $scope.loading = false;

  $ionicLoading.show();

  //Erabiltzailearen sariak
  pricesServices.getUserListPrices().then(function(resp)
  {
    console.log("52: " + resp.data);
    $scope.user_prices = resp.data;

    //Dauden sari guztien zerrenda
    pricesServices.getPublicPriceList().then (function(resp)
    {
      console.log("45: " + resp.data);

      $scope.public_prices = [];

      for (var i = 0; i < resp.data.length; i++)
      {
        var prices = {
                      date: resp.data[i].date,
                      event: resp.data[i].event,
                      url: resp.data[i].url,
                      amount: resp.data[i].amount,
                      title: resp.data[i].title,
                      enddate: resp.data[i].enddate
                    };
                    console.log(prices);
        $scope.public_prices.push(prices);
      }
      console.log($scope.public_prices);
      $scope.loading = true;
      $ionicLoading.hide();

    },
        function(error)
        {
          $scope.loading = true;
          $ionicLoading.hide();
          console.error(error);
          $scope.public_prices = [
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

          console.log($scope.public_prices);
    });
    },
    function(error)
    {
      console.error(error);
    });


  $scope.openPriceDetailItemInfo = function (type, index)
  {
    //$state.go('app.detais_price');
    if (type === 1)
    {
      console.log($scope.user_prices[index].price_key);
    }
    else
    {
      console.log($scope.public_prices[index].price_key);
      //Save select public prices object in json
      window.localStorage.setItem("public_price", angular.toJson($scope.public_prices[index]));

    }
    var price_key = -1;
    if ($scope.public_prices[index].price_key === undefined || $scope.public_prices[index].price_key === null ||
        $scope.user_prices[index].price_key === undefined || $scope.user_prices[index].price_key === null)
    {
      price_key = -1;
    }
    window.localStorage.setItem('save_from_location', 'app.prices');
    $state.go('app.details_price', { 'id': price_key})
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
    console.log(type+":" + index);
  };
})

.controller('PriceDetailCtrl', function($scope, $rootScope, $ionicSideMenuDelegate, pricesServices, $stateParams, $state, $ionicHistory) {
  $rootScope.menu_show = false;
  $ionicSideMenuDelegate.canDragContent(false);

  console.log($stateParams.id);

  if ($stateParams.id !== "-1")
  {
    //Lortutako sariaren xehetasunak
    pricesServices.getPriceDetails("DSS2016BOLI_1")
      .then (function(resp)
      {
        console.log("52: " + resp);
      },
      function(error)
      {
        console.error(error);
    });
  }
  else
  {
    console.log("Show public price details");
    $scope.price = JSON.parse(window.localStorage.getItem('public_price'));
    console.log(JSON.parse(window.localStorage.getItem('public_price')));
  }

  $scope.correct = true;

  $scope.returnToPrices = function ()
  {
    $rootScope.menu_show = true;
    $ionicSideMenuDelegate.canDragContent(true);
    $state.go('app.prices');
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
  };
});




