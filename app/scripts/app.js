'use strict';

/**
 * @ngdoc overview
 * @name angularAppApp
 * @description
 * # angularAppApp
 *
 * Main module of the application.
 */
angular
  .module('angularAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/contact', {
        templateUrl:'views/contact.html',
        controller:'ContactCtrl',
        controllerAs:'contact'
      })
       .when('/moteur', {
        templateUrl:'views/moteur.html',
        controller:'MoteurCtrl',
        controllerAs:'moteur'
      })
       .when('/carrosserie', {
        templateUrl:'views/carrosserie.html',
        controller:'CarrosserieCtrl',
        controllerAs:'carrosserie'
      })
       .when('/about', {
        templateUrl:'views/about.html',
        controller:'AboutCtrl',
        controllerAs:'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
