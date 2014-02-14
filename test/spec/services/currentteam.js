'use strict';

describe('Service: currentTeam', function () {

  // load the service's module
  beforeEach(module('nhlApp'));

  // instantiate service
  var currentTeam;
  beforeEach(inject(function (_currentTeam_) {
    currentTeam = _currentTeam_;
  }));

  it('should do something', function () {
    expect(!!currentTeam).toBe(true);
  });

});
