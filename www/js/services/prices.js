/**********************************************************************************************
Prices Services fitxategia:
----------------------------
getUserListPrices = erabiltzailearen sariak erakutsi
getPriceDetails = aukeratutako sari baten xehetasunak
getPublicPriceList = dauden sarien zerrenda
***********************************************************************************************/


angular.module('euroku.services.prices', [])


.service('pricesServices', function pricesServices($http, URL_LOCALHOST, PRICES) {

    return {
      getUserListPrices : function ()
      {

        /********************************************************
        Load device id from local Storage
        *********************************************************/

        var device_id = window.localStorage.getItem ('device_id');

        console.log(URL_LOCALHOST+PRICES.list+"?device_id=" + device_id);

        return $http.get(URL_LOCALHOST+PRICES.list+"?device_id=" + device_id).success(

            function(resp)
            {
              return resp.data;
            }
        );
      },
      getPriceDetails : function (price_key)
      {

        //var price_key = "1";

        /********************************************************
        Load device id from local Storage
        *********************************************************/

        var device_id = window.localStorage.getItem ('device_id');

        console.log(URL_LOCALHOST+PRICES.list+"?price_key=" + price_key + "&device_id=" + device_id);

        return $http.get(URL_LOCALHOST+PRICES.list+"?price_key=" + price_key+ "&device_id=" + device_id).success(

            function(resp)
            {
              return resp.data;
            }
        );
      },
      getPublicPriceList: function()
      {
        /********************************************************
        Load device id from local Storage
        *********************************************************/

        var device_id = window.localStorage.getItem ('device_id');

        console.log(URL_LOCALHOST+PRICES.public_list+"?device_id=" + device_id);

        return $http.get(URL_LOCALHOST+PRICES.public_list+"?device_id=" + device_id).success(

            function(data) {
              return data;
            }
        );
      }
      //gehiago gehitu daitezke...
    };
  });
