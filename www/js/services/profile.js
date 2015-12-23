/**********************************************************************************************
Url Services fitxategia:
----------------------------


***********************************************************************************************/


angular.module('euroku.services.profile', [])


.service('profileServices', function profileServices($http, URL_LOCALHOST, PROFILE) {

    return {
      getDetails : function ()
      {

        var device_id = "1";

        /********************************************************
        Load device id and language from local Storage
        *********************************************************/

        console.log(URL_LOCALHOST+PROFILE+"?device_id=" + device_id);

        return $http.get(URL_LOCALHOST+PROFILE+"?device_id=" + device_id).success(

            function(resp)
            {
              return resp.data;
            }
        );
      },
      setDetails: function(lang_code)
      {
        var params = {language: lang_code, device_id: device_id};

        console.log(params);

        console.log(URL_LOCALHOST + PROFILE);
        return $http.post(URL_LOCALHOST + PROFILE, params).success(

            function(data) {
              return data;
            }
        );
      }
      //gehiago gehitu daitezke...
    };
  });
