'use strict';

/**
 * @ngdoc overview
 * @name kondeoHomeApp
 * @description
 * # kondeoHomeApp
 *
 * Main module of the application.
 */
angular
  .module('kondeoHomeApp', [
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
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/projects', {
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/panel', {
        templateUrl: 'views/panel/panel.html',
        controller: 'PanelCtrl'
      })
      .when('/panel/contract', {
        templateUrl: 'views/contract.html',
        controller: 'ContractCtrl'
      })
      .when('/about/developers', {
        templateUrl: 'views/aboutdevelopers.html',
        controller: 'AboutdevelopersCtrl',
        controllerAs: 'aboutDevelopers'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
