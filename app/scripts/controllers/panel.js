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
    $scope.payloads = {
      login: {},
      update: {}
    }

    $scope.login = function(){
      User.login($scope.payloads.login, function(data){
        $scope.error = null;
        if(data.requireNewPassword){
          $scope.payloads.update.token = data.token;
          $scope.newPassword = true;
        } else {
          localStorage.setItem("token", data.token);
          $scope.loggedIn = true;
        }
      }, function(err){
        $scope.error = "Username/Password Incorrect";
      });
    }

    $scope.updateUser = function(){
      if($scope.payloads.update.password && $scope.payloads.update.password !== $scope.payloads.update.confirmPassword){
        $scope.error = "Passwords Do Not Match."
        return false;
      }

      $scope.payloads.update.token = $scope.payloads.update.token || localStorage.getItem("token");
      User.update($scope.payloads.update, function(data){
        $scope.error = null;
        localStorage.setItem("token", $scope.payloads.update.token);
        $scope.payloads.update = {}
        $scope.loggedIn = true;
      }, function(err){
        $scope.error = "Something Went Wrong...";
      });
    }
  });
