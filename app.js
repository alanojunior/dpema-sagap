'use strict';

var app = angular['module']('starter',['ionic','ngCookies','ngCordova'])

.run(function($ionicPlatform,$rootScope,$ionicSideMenuDelegate,$ionicScrollDelegate) {



  $rootScope.$on('$stateChangeStart', 
  function(event, toState, toParams, fromState, fromParams){ 
     if ($ionicSideMenuDelegate.isOpenLeft() == true)
      {
          $ionicSideMenuDelegate.toggleLeft()
      }
      if ($ionicSideMenuDelegate.isOpenRight() == true)
      {
          $ionicSideMenuDelegate.toggleRight()
      }
      
      $ionicScrollDelegate.scrollTop();
  })



  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    $cordovaPlugin.someFunction().then(success, error);
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
