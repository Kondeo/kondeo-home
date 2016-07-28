'use strict';

var API_BASE = "http://localhost:3000/";

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
      .when('/panel/admin', {
        templateUrl: 'views/panel/admin.html',
        controller: 'AdminCtrl'
      })
      .when('/panel/contract', {
        templateUrl: 'views/panel/contract.html',
        controller: 'ContractCtrl'
      })
      .when('/contract', {
        templateUrl: 'views/staticContract.html',
      })
      .when('/about/:developer', {
        templateUrl: 'views/developers.html',
        controller: 'DevelopersCtrl',
        controllerAs: 'aboutDevelopers'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
