#Garapenerako instalazioa egiteko instrukzioak:#

1.- Instalatu NodeJS. Jarraitu argibide hauek: https://nodejs.org/

2.- Instalatu Cordova eta Ionic: 

$ sudo npm install -g cordova ionic

3.- Gero, proiektu honen dependentziak bakarrik instalatu

    $ npm install
    $ bower install

4.- Garapen ingurunea martxan jarri:

    $ ionic serve

5.- Aplikazioa konpilatzeko fitxategiak sortu:

    $ ionic platform add ios android

6.- Pauso horren ostean, platforms/ios eta platforms/android direktorioak sortuko ditu gero Android Studio eta XCode-rekin ireki, aplikazioak konpilatu eta dagokion app-storera kargatu ahal izateko.

#Instalaturik dituen moduloak:#

* Angular Translate (pascalprecht.translate): https://github.com/angular-translate/angular-translate
* ngMessages (Angular Messages): https://github.com/angular/bower-angular-messages
* ngCordova: http://ngcordova.com
* Social Sharing (Edukia partekatzeko): cordova plugin add https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git

#API dokumentazioa#

* http://eurokudok.arno.cs

# Formulario balidazioa #

Ionic-en liburutegiez gain 'Angular Messages" liburutegiak beharko ditugu.

#Aplikazioaren balore konstanteak#

* 'constant.js' fitxategian edukiko dugu aukera editatzeko daudenak eta berriak gehitzeko. Hau, www/constant direktorioaren barruan aurkituko dugu.