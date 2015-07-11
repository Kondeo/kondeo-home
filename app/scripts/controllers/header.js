'use strict';

/**
 * @ngdoc function
 * @name kondeoHomeApp.controller:HeaderctrlCtrl
 * @description
 * # HeaderctrlCtrl
 * Controller of the kondeoHomeApp
 */
angular.module('kondeoHomeApp')
  .controller('HeaderCtrl', function ($scope, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
  });
