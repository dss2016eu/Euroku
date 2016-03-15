/**********************************************************************************************
Url Services fitxategia:
----------------------------
getDevideID = erabiltzailearen identifikatzailea lortu zerbitzaritik
getDetails = erabiltzailearen xehetasunak kargatu zerbitzaritik
setDetails = erabiltzailearen xehetasunetan egindako aldaketak gorde zerbitzarian
***********************************************************************************************/


angular.module('euroku.services.profile', [])


.service('profileServices', function profileServices($http, URL_LOCALHOST, PROFILE, REGISTER) {

    return {

      getDevideID : function (lang_code)
      {

        console.log(URL_LOCALHOST+REGISTER + "?language=" + lang_code);

        return $http.get(URL_LOCALHOST+REGISTER+ "?language=" + lang_code).success(

            function(resp)
            {
              return resp.data;
            }
        );
      },
      getDetails : function ()
      {
        /********************************************************
        Load device id and language from local Storage
        *********************************************************/
        var device_id = window.localStorage.getItem ('device_id');

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
        /********************************************************
        Load device id and language from local Storage
        *********************************************************/

        var device_id = window.localStorage.getItem('device_id');

        console.log(device_id);

        var params = {language: lang_code, device_id: device_id};

        console.log(params);

        console.log(URL_LOCALHOST + PROFILE);
        return $http.post(URL_LOCALHOST + PROFILE, angular.toJson(params)).success(

            function(data) {
              return data;
            }

        );
      }
      //gehiago gehitu daitezke...
    };
  });
