/**********************************************************************************************
Url Services fitxategia:
----------------------------

LOCALHOST (Probatarako zerbitzaria): http://eurokuserver.cs/
EXTERNAL SERVER: https://euroku.codesyntax.com/
UA-57621960-8 (Real)
UA-61164860-1 (Debug)
***********************************************************************************************/


angular.module('euroku.constants', [])

.constant('URL_LOCALHOST', 'https://euroku.codesyntax.com/')
.constant('ANALYTICS', {
                        tracker_id: 'UA-57621960-8',
                        start_play: 'Start Play',
                        what_is_euroku: 'What is Euroku?',
                        prices: 'Price list show',
                        show_source: 'Show question info source',
                        start_app: 'Start application',
                        go_to_web_cs: 'Go to CodeSyntax Web',
                        go_to_web_dss2016: 'Go to Dss 2016 Web',
                        share_app: 'Share App',
                        select_language_option: 'Select Language option'
                    })
.constant('QUESTIONS', 'api/1.0/galdera')
.constant('PROFILE', 'api/1.0/profile')
.constant('REGISTER', 'api/1.0/register')
.constant('PRICES', {
                        list: "api/1.0/prices",
                        detail_item: "api/1.0/price/",
                        public_list: "api/1.0/prices/public"
                    })
;
