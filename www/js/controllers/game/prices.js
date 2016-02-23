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


    $scope.user_prices = [];

      for (var i = 0; i < resp.data.length; i++)
      {
        var prices = {
                      date: resp.data[i].date,
                      event: resp.data[i].event,
                      url: resp.data[i].url,
                      amount: resp.data[i].amount,
                      claimed: resp.data[i].claimed,
                      last_day_to_claim: resp.data[i].last_day_to_claim,
                      title: resp.data[i].title,
                      enddate: resp.data[i].enddate,
                      key: resp.data[i].key
                    };
                    console.log(prices);
        $scope.user_prices.push(prices);

      }

      console.log($scope.user_prices);
    //Dauden sari guztien zerrenda
    pricesServices.getPublicPriceList().then (function(resp)
    {
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
      $scope.urls2 = $scope.storePriceDetailsUrls($scope.public_prices);
      console.log($scope.urls2);
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
    var price_key = 0;
    if (type === 1)
    {
      console.log($scope.user_prices[index].key);
      price_key = $scope.user_prices[index].key;
      window.localStorage.setItem('save_from_location', 'app.prices');
      $state.go('app.details_price', { 'id': price_key, 'position': index})
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
      console.log(type+":" + index);
    }
    else
    {
      console.log($scope.urls2[index]);
      if ($scope.urls2[index] === "")
      {
        $scope.urls2[index] = "http://dss2016.eu/";
      }

      $scope.openBrowser($scope.urls2[index]);
    }

  };
})

.controller('PriceDetailCtrl', function($scope, $rootScope, $ionicSideMenuDelegate, pricesServices, $stateParams, $state, $ionicHistory) {
  $rootScope.menu_show = false;
  $ionicSideMenuDelegate.canDragContent(false);

  console.log($stateParams.id);

  if ($stateParams.id !== "-1")
  {
    //Lortutako sariaren xehetasunak
    pricesServices.getPriceDetails($stateParams.id)
      .then (function(resp)
      {
        console.log("52: " + resp.data);
        $scope.price = resp.data[$stateParams.position];
        console.log($scope.price);
        $scope.urls = [];
        if ($scope.price.url !== "")
        {
          $scope.urls.push($scope.price.url);
        }
        else
        {
          $scope.urls.push("http://dss2016.eu/");
        }
        
        console.log($scope.urls[0]);
        
      },
      function(error)
      {
        console.error(error);
    });
  }

  $scope.goToInformPoint = function ()
  { 
    var location = '43.32005921624546,-1.9846737384796143';
    console.log(location);
    if (!ionic.Platform.isAndroid()) {
        var url = 'maps://?q=' + location;
        console.log("Browser or iOS: " + url);
      } 
      else if (ionic.Platform.isAndroid())
      {
        var url = 'geo://0,0?q='+location+'&z=15';
        console.log("Android " + url);
      }

      window.open(url, '_system');
  };

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




