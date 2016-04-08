'use strict';

/**
 * @ngdoc function
 * @name kondeoHomeApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the kondeoHomeApp
 */
angular.module('kondeoHomeApp')
  .controller('PanelCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.loggedIn = localStorage.getItem("token") || false;

    $scope.login = function(){
      var payload = {
        email: $scope.email,
        password: $scope.password
      }
      User.login(payload, function(data){
        localStorage.setItem("token", data.token);
        $scope.loggedIn = true;
      }, function(err){
        $scope.error = "Username/Password Incorrect";
      });
    }
  });
