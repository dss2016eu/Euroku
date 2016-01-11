/**********************************************************************************************
Url Services fitxategia:
----------------------------

LOCALHOST (Probatarako zerbitzaria): http://eurokuserver.cs/
EXTERNAL SERVER: http://euroku.korpoweb.com/
***********************************************************************************************/


angular.module('euroku.constants', [])

.constant('URL_LOCALHOST', 'http://eurokuserver.cs/')
.constant('QUESTIONS', 'api/1.0/galdera')
.constant('PROFILE', 'api/1.0/profile')
.constant('PRICES', {
                        list: "api/1.0/prices",
                        detail_item: "api/1.0/price/",
                        public_list: "api/1.0/prices/public"
                    })
;
