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
    $scope.overlay = {};

    loadInvoices();
    loadUsers();

    function loadInvoices(){
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
            $scope.invoices = {};
            if(due.length > 0) $scope.invoices.due = due;
            if(history.length > 0) $scope.invoices.history = history;
        }, function(err){
            console.log(err)
            alert("An error occurred")
        });
    }

    function loadUsers(){
        User.getAll({
            token: token
        }, function(res){
            $scope.users = res;
        }, function(err){
            console.log(err)
            alert("An error occurred")
        });
    }

    $scope.showInvoiceOverlay = function(invoice){
        if(invoice){
            invoice.due = new Date(invoice.due);
            invoice.email = invoice.user.email;
        }
        $scope.overlay.invoice = invoice || {};
    }

    $scope.hideInvoiceOverlay = function(){
        $scope.overlay.invoice = null;
    }

    $scope.saveInvoice = function(){
        var userId = null;
        for(var i=0;i<$scope.users.length;i++){
            if($scope.users[i].email == $scope.overlay.invoice.email){
                userId = $scope.users[i]._id;
                break;
            }
        }
        var payload = {
            paid: $scope.overlay.invoice.paid || false,
            accountId: userId,
            total: $scope.overlay.invoice.total,
            due: $scope.overlay.invoice.due,
            token: token
        }
        if($scope.overlay.invoice._id){
            payload.id = $scope.overlay.invoice._id;
            Invoice.update(payload, function(res){
                loadInvoices();
            }, function(err){
                console.log(err)
                alert("An error occurred")
            });
        } else {
            Invoice.create(payload, function(res){
                loadInvoices();
            }, function(err){
                console.log(err)
                alert("An error occurred")
            });
        }
        $scope.overlay.invoice = null;
    }
  });
