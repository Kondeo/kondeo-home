'use strict';

describe('Controller: AboutdevelopersCtrl', function () {

  // load the controller's module
  beforeEach(module('kondeoHomeApp'));

  var AboutdevelopersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AboutdevelopersCtrl = $controller('AboutdevelopersCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AboutdevelopersCtrl.awesomeThings.length).toBe(3);
  });
});
