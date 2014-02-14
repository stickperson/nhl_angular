'use strict';

describe('Service: allTeams', function () {

  // load the service's module
  beforeEach(module('nhlApp'));

  // instantiate service
  var allTeams;
  beforeEach(inject(function (_allTeams_) {
    allTeams = _allTeams_;
  }));

  it('should do something', function () {
    expect(!!allTeams).toBe(true);
  });

});
