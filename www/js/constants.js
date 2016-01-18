/**********************************************************************************************
Url Services fitxategia:
----------------------------

LOCALHOST (Probatarako zerbitzaria): http://eurokuserver.cs/
EXTERNAL SERVER: https://euroku.codesyntax.com/
***********************************************************************************************/


angular.module('euroku.constants', [])

.constant('URL_LOCALHOST', 'https://euroku.codesyntax.com/')
.constant('QUESTIONS', 'api/1.0/galdera')
.constant('PROFILE', 'api/1.0/profile')
.constant('REGISTER', 'api/1.0/register')
.constant('PRICES', {
                        list: "api/1.0/prices",
                        detail_item: "api/1.0/price/",
                        public_list: "api/1.0/prices/public"
                    })
;
