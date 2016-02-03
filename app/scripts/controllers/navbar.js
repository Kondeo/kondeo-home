'use strict';

/**
 * @ngdoc function
 * @name kondeoHomeApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the kondeoHomeApp
 */
angular.module('kondeoHomeApp')
  .controller('NavbarCtrl', function ($scope, $timeout, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };

  });
