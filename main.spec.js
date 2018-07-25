describe('TourneyListController', function() {

  beforeEach(module('CyburiAssistantCoach'));

  it('should create a `player` list with 8 player', inject(function($controller) {
    var scope = {};
    var ctrl = $controller('TourneyListController', {$scope: scope});

    expect(scope.playerList.names.length).toBe(8);
  }));

});