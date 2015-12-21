/**********************************************************************************************
Url Services fitxategia:
----------------------------


***********************************************************************************************/


angular.module('euroku.services.questions', [])


.service('questionsServices', function questionsServices($http, URL_LOCALHOST, QUESTIONS) {

    return {
      getQuestion : function (game_id)
      {
        if (game_id !== "" && game_id !== undefined)
        {
          game_id = "&game_id=" + game_id;
        }
        else if (game_id === undefined)
        {
          game_id = "";
        }
        var device_id = "1";

        console.log(URL_LOCALHOST+QUESTIONS+"?device_id=" + device_id + game_id);

        return $http.get(URL_LOCALHOST+QUESTIONS+"?device_id=" + device_id + game_id).success(

            function(resp)
            {
              return resp.data;
            }
        );
      },
      setQuestionRequest: function(params)
      {

        return $http.post(URL_LOCALHOST + QUESTIONS, params).success(

            function(data) {

              console.log("Send user answer...");
              return data;
            }
        );
      }
      //gehiago gehitu daitezke...
    };
  });
