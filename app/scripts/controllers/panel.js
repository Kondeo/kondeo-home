'use strict';

/**
 * @ngdoc function
 * @name kondeoHomeApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the kondeoHomeApp
 */
angular.module('kondeoHomeApp')
  .controller('PanelCtrl', function ($scope, User) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.loggedIn = localStorage.getItem("token") || false;
    $scope.payload = {}

    $scope.login = function(){
      User.login($scope.payload, function(data){
        localStorage.setItem("token", data.token);
        $scope.payload = {}
        $scope.loggedIn = true;
      }, function(err){
        $scope.error = "Username/Password Incorrect";
      });
    }
  });
