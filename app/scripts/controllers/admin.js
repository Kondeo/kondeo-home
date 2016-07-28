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

    $scope.invoices = {};
    $scope.users = [];
    $scope.invoice = {};

    Invoice.getAll({
        token: token
    }, function(res){
        var due = [];
        var history = [];
        for(var i=0;i<res.length;i++){
            var invoice = res[i];
            if(invoice.paid){
                history.push(invoice);
            } else {
                due.push(invoice);
            }
        }
        if(due.length > 0) $scope.invoices.due = due;
        if(history.length > 0) $scope.invoices.history = history;
    }, function(err){
        console.log(err)
        alert("An error occurred")
    });

    User.getAll({
        token: token
    }, function(res){
        console.log(res)
        $scope.users = res;
    }, function(err){
        console.log(err)
        alert("An error occurred")
    });

    $scope.addInvoice = function(){
        var payload = {
            paid: $scope.invoice.paid,
            accountId: $scope.invoice.accountId,
            total: $scope.invoice.total,
            due: $scope.invoice.due
        }
        Invoice.create(payload, function(res){
            $scope.invoice = {};
        }, function(err){
            console.log(err)
            alert("An error occurred")
        });
    }
  });
