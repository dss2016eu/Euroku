/******************************************************************************************************************************************************
Questions Services fitxategia:
----------------------------
getQuestion = galdera eman, "game_id" balorea ez badauka partida berria izango da baina "game_id" balorea badaukagu partida jarraitzea dagokigu
setQuestionRequest = jokatzen ari garen galderaren erantzuna bidaliko da zerbitzarian konprobatu dezan erantzun zuzena den ala ez
*******************************************************************************************************************************************************/


angular.module('euroku.services.questions', [])


.service('questionsServices', function questionsServices($http, URL_LOCALHOST, QUESTIONS) {

    return {
      getQuestion : function ()
      {

        var game_id = window.localStorage.getItem("game_id");

        console.log("Questions (20): " + game_id);
        if (game_id !== "" && game_id !== undefined && game_id !== null)
        {
          game_id = "&game_id=" + game_id;
        }
        else
        {
          game_id = "";
        }
        var device_id = window.localStorage.getItem('device_id');

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
        console.log("Questions (39): " + URL_LOCALHOST + QUESTIONS);

        var params = angular.toJson(params);
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
