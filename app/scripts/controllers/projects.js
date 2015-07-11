'use strict';

/**
 * @ngdoc function
 * @name kondeoHomeApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the kondeoHomeApp
 */
angular.module('kondeoHomeApp')
  .controller('ProjectsCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
