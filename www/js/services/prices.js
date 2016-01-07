/**********************************************************************************************
Url Services fitxategia:
----------------------------


***********************************************************************************************/


angular.module('euroku.services.prices', [])


.service('pricesServices', function pricesServices($http, URL_LOCALHOST, PRICES) {

    return {
      getUserListPrices : function ()
      {

        var device_id = "1";

        /********************************************************
        Load device id from local Storage
        *********************************************************/

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

        console.log(URL_LOCALHOST+PRICES.detail_item+"?price_key=" + price_key);

        return $http.get(URL_LOCALHOST+PRICES.detail_item+"?price_key=" + price_key).success(

            function(resp)
            {
              return resp.data;
            }
        );
      },
      getPublicPriceList: function()
      {
        console.log(URL_LOCALHOST+PRICES.public_list);
        return $http.get(URL_LOCALHOST+PRICES.public_list).success(

            function(data) {

              console.log("Send user answer...");
              return data;
            }
        );
      }
      //gehiago gehitu daitezke...
    };
  });
