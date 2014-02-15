'use strict';

describe('Directive: currentHeading', function () {

  // load the directive's module
  beforeEach(module('nhlApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<current-heading></current-heading>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the currentHeading directive');
  }));
});
