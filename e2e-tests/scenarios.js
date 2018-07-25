'use strict';

// Angular E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('RubyTeam Test Suite Application', function() {

  it('should get the app title', function() {
    browser.get('/#!');
    expect(browser.getTitle()).toBe('Team Ruby');
  });

  describe('View: Check In Tab', function() {

    beforeEach(function() {
      browser.get('/#!checkin');
    });

    it('should show all the initial player list', function() {
      var playerList = element.all(by.repeater('player in tourneyList.names'));
        
      expect(element.all(by.repeater('player in tourneyList.names')).count()).toEqual(8);
      var query = element(by.model('tourneyList.searchKeyword'));

       query.sendKeys('nexus'); 
       expect(playerList.count()).toBe(0);
        
       query.clear();
      query.sendKeys('J');
       expect(playerList.count()).toBe(1);

    });

  });

});
