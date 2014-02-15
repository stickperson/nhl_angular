'use strict';

xdescribe('Service: allTeams', function () {

  // load the service's module
  beforeEach(module('nhlApp'));

  // instantiate service
  var allTeams,
    $httpBackend;
  beforeEach(inject(function ($injector) {
    allTeams = $injector.get('allTeams');
    $httpBackend = $injector.get('$httpBackend');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('should make call to get all teams', function () {
    $httpBackend.expect('GET', 'http://127.0.0.1:8000/api/v1/teams').respond({
      data: {
        objects: [
          {
            location: 'Washington',
            name: 'capitals'
          },
          {
            name: 'flyers'
          }
        ]
      }
    });
    allTeams.getTeams().then(function(result) {
      console.log(result);
      expect(result.data.objects[0].name).toEqual('capitals');
      expect(result.data.objects[1].name).toEqual('flyers');
    });
  });

  xit('should get one team by id', function(){
    $httpBackend.expect('GET', 'http://127.0.0.1:8000/api/v1/ateam?id=').respond({});
    allTeams.getRandom();
  });

  it('should get one team by name', function(){
    $httpBackend.expect('GET', 'http://127.0.0.1:8000/api/v1/ateam?name=flyers').respond({});
    allTeams.getTeam('flyers');
  });

});
