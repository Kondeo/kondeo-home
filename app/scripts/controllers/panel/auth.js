'use strict';

/**
 * @ngdoc function
 * @name kondeoHomeApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the kondeoHomeApp
 */
angular.module('kondeoHomeApp')
  .controller('AuthCtrl', function ($scope, $location, User) {
    var token = localStorage.getItem("token") || false;
    var admin = localStorage.getItem("admin") || false;

    $scope.payloads = {
      login: {},
      update: {}
    }

    $scope.login = function(){
      User.login($scope.payloads.login, function(data){
        $scope.error = null;
        if(data.admin) {
            admin = true;
            localStorage.setItem("admin", true);
        }
        if(data.requireNewPassword){
          token = data.token;
          $scope.payloads.update.token = data.token;
          $scope.payloads.update.requireNewPassword = false;
          $scope.newPassword = true;
        } else {
          localStorage.setItem("token", data.token);
          if(admin) $location.path("panel/admin");
          else $location.path("panel");
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
        $scope.payloads.update = {};
        if(admin) $location.path("panel/admin");
        else $location.path("panel");
      }, function(err){
        $scope.error = "Something Went Wrong...";
      });
    }
  });
