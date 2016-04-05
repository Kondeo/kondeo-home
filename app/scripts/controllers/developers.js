'use strict';

/**
 * @ngdoc function
 * @name kondeoHomeApp.controller:AboutdevelopersCtrl
 * @description
 * # AboutdevelopersCtrl
 * Controller of the kondeoHomeApp
 */
angular.module('kondeoHomeApp')
  .controller('DevelopersCtrl', function ($scope, $routeParams) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.developer = $routeParams.developer;
    $scope.developerURL = "views/developers/" + $scope.developer + ".html";
  });
