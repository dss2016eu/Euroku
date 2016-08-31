#Development of installation instructions:#

1.- Install NodeJS. More info: https://nodejs.org/

2.- Install Cordova and Ionic: 

    $ sudo npm install -g cordova ionic

3.- After you install the dependencies of these projects

    $ npm install
    $ bower install

4.- Start app in browser:

    $ ionic serve

5.- Create files to compile application in Android and iOS platforms:

    $ ionic platform add ios android

6.- After this step, platforms/ios and platforms/android directories will create more open Android Studio and XCode with applications to compile and load the App-Store.

#Installed modules list and references:#

* Angular Translate (pascalprecht.translate): https://github.com/angular-translate/angular-translate
* ngMessages (Angular Messages): https://github.com/angular/bower-angular-messages
* ngCordova: http://ngcordova.com
* Social Sharing (Edukia partekatzeko): cordova plugin add https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git
* Keyboard: cordova plugin add ionic-plugin-keyboard
* Plugin Whitelist: cordova plugin add cordova-plugin-whitelist
* Inapbrowser: cordova plugin add cordova-plugin-inappbrowser
* Google Analytics: cordova plugin add cordova-plugin-google-analytics

#API documentation#

* http://eurokudok.arno.cs (local url)

# Validate forms #

Apart from the need Ionic libraries of "Angular Messages".

#App constant values#

* 'Constant.js' chance to edit the contents of files and add new ones. File find in inside www/constant directory.