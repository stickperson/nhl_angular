'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('nhlApp'));

  var MainCtrl,
    allTeams,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    // Create new scope which is a child of the root scope
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should be 2 actions', function () {
    expect(scope.actions.length).toBe(3);
  });
});
