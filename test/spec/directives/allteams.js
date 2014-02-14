'use strict';

describe('Directive: allTeams', function () {

  // load the directive's module
  beforeEach(module('nhlApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<all-teams></all-teams>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the allTeams directive');
  }));
});
