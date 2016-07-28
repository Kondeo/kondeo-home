'use strict';

/**
 * @ngdoc function
 * @name kondeoHomeApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the kondeoHomeApp
 */
angular.module('kondeoHomeApp')
  .controller('AdminCtrl', function ($scope, $location, User) {
    var loggedIn = localStorage.getItem("token") || false;
    var admin = localStorage.getItem("admin") || false;
    if(!loggedIn || !admin) $location.path('panel');
  });
