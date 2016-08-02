'use strict';

/**
 * @ngdoc function
 * @name kondeoHomeApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the kondeoHomeApp
 */
angular.module('kondeoHomeApp')
  .controller('PanelCtrl', function ($scope, $location, User) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.token = localStorage.getItem("token") || false;
    var admin = localStorage.getItem("admin") || false;
    if(!$scope.token) $location.path("panel/auth");
    else if(admin) $location.path("panel/admin");

    $scope.logout = function(){
        localStorage.removeItem("token");
        $location.path("panel/auth");
    }


  });
