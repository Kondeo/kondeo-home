'use strict';

/**
 * @ngdoc function
 * @name kondeoHomeApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the kondeoHomeApp
 */
angular.module('kondeoHomeApp')
  .controller('AdminCtrl', function ($scope, $location, User, Invoice) {
    var token = localStorage.getItem("token") || false;
    var admin = localStorage.getItem("admin") || false;
    if(!token || !admin) $location.path('panel');

    Invoice.getAll({
        token: token
    }, function(res){
        console.log(res)
    }, function(err){
        console.log(err)
    });

    $scope.addInvoice = function(){
        Invoice.create(payload, function(res){

        }, function(err){

        });
    }
  });
