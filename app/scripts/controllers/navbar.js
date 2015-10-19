'use strict';

/**
 * @ngdoc function
 * @name kondeoHomeApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the kondeoHomeApp
 */
angular.module('kondeoHomeApp')
  .controller('NavbarCtrl', function ($scope, $timeout) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.navOpen = false;

    //CURRENTLY CAUSES A RESIZING BUG
    //If you make browser small, open the navbar, make big and click nav icon, navbar broken
    $scope.closeNav = function(){
        if($scope.navOpen){
            $scope.navOpen = false;
            $timeout(function() {
                document.getElementById('mobNavBtn').click();
                $scope.navOpen = false;
            }, 0);
        }
    }
  });
