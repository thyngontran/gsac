(function() {
'use strict';

var app = angular.module('CyburiAssistantCoach', ['ngMaterial', 'ngRoute'], function($locationProvider)  {
    $locationProvider.html5Mode(true);    
})
    .controller('PanelMenuCtrl', PanelMenuCtrl)   
    .controller('TourneyListController', TourneyListController)       
    ;

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.htm"
    })
    .when("/checkin", {
        templateUrl : "checkin.htm"
    })
    .when("/employee", {
        templateUrl : "employee.htm"
    })
    .when("/result", {
        templateUrl : "result.htm"
    });
});    
    
app.run(function($rootScope){
    $rootScope.title = "Floor Warden";
    $rootScope.events = [
      {name:'Fire', startTime:'2018-07-25T17:13:35.873Z', endTime:'', eventType:'1'}
        
    ];
    
    $rootScope.eventType = '1';
    $rootScope.eventStartTime = new Date();
    
});
    
function TourneyListController($scope, $rootScope, $http, $location, $mdPanel) {
    
    this.status = [
        'IN',
        'OUT',
        'SAFE'
      ];
    
    this.more = {
      name: 'more',
      items: [
        'Setting',
        'Main',          
        'Result',          
        'Random'
      ]
    };
    
    var searchKeyword = "ma";
    var playerList = this;
    $scope.customFullscreen = false;
    $scope.regexDigit = '\\d+';
    this._mdPanel = $mdPanel;
    var isAdmin = false;
   
    var poolData = {UserPoolId: 'us-east-2_yIstCoKlH',ClientId: '66a84rgkfsbsc4pv8ifcvohgpk'};
        

    //var apiurl = "https://35ywp9uz0b.execute-api.us-east-1.amazonaws.com/vbcoach_prod/retrieveplayers";
    var apiurl = "https://floorwardenbackend.azurewebsites.us/api/Employees";
    
    playerList.employees = [
      {fname:'Bruce', lname:'Wayne', email:'GSAC.BW@gmail.com', building:'SA20',floor:'17',room:'127',phone:'571-435-4966',status:'IN'},
      {fname:'Clark', lname:'Kent', email:'GSAC.CK@gmail.com', building:'SA20',floor:'17',room:'127',phone:'571-435-4966',status:'IN'},
      {fname:'Bruce', lname:'Banner', email:'GSAC.BB@gmail.com', building:'SA20',floor:'17',room:'127',phone:'571-435-4966',status:'IN'},
      //{fname:'Donna', lname:'Troy', email:'GSAC.DT@gmail.com', building:'SA20',floor:'17',room:'127',phone:'571-435-4966',status:'IN'},
      //{fname:'Selina', lname:'Kyle', email:'GSAC.SK@gmail.com', building:'SA20',floor:'17',room:'127',phone:'571-435-4966',status:'OUT'},
      {fname:'Barbara', lname:'Gordon', email:'GSAC.BG@gmail.com', building:'SA20',floor:'17',room:'127',phone:'571-435-4966',status:'IN'}
    ];
    
    
    playerList.retrieveAllPlayers = function(userStr) {
    
        //var apiurl = "input.txt";
        var request={
            //"locationId": "cyburi",
            //"createdBy": userStr
        };
        
        
        
        //$http.get(apiurl,request,{headers})
        $http.get(apiurl)
            .then(function Success(response){
            
            //$rootScope.playerList.employees = response.data;
            while($rootScope.playerList.employees.length > 0) {
                $rootScope.playerList.employees.pop();
            }
            angular.forEach(response.data, function(player) {
                $rootScope.playerList.employees.push(player);
            });
            
            
            console.log("Response TTT:" + $rootScope.playerList.employees);
          }, function Error(response){ //handler errors here
            console.log("tttttt"+response.statusText);
          });
    };
    
    
    playerList.selectAllFlag = false;

    playerList.isLoggedIn = false;
    playerList.userName = 'guest';
    playerList.siteId = 'site1';
    playerList.totalNet = 0;
    playerList.pool1TeamSize = 2;
    playerList.pool2TeamSize = 2;
    playerList.teamSize = 4;  //default
    playerList.generatedPool1 = [];
    playerList.generatedPool2 = [];
    playerList.generatedPool3 = [];
    playerList.allTeamCount = 0;
    
    //for tracking games points
    playerList.trackTeamWon = '';
    playerList.trackPointDif = 0;
    playerList.trackTeamLost = '';
    
    //for adding new playeer
    playerList.newFNameText = '';
    playerList.newLNameText = '';
    playerList.newEmailText = '';
    playerList.newStatusText = '';
    playerList.newBuildingText = '';
    playerList.newFloorText = '';
    playerList.newRoomText = '';
    playerList.newPhoneText = '';
    
    var params = $location.search();
    if(params != null){
        isAdmin = params.admin;
        var createdByStr = params.createdby;
        
        if(createdByStr != null){    
            $rootScope.playerList = playerList;
            this.retrieveAllPlayers (createdByStr);
        }        
    }

    
    playerList.editPlayer = function(emailStr) {
        
        console.log("EDIT Player:"+emailStr);  
        angular.forEach(playerList.employees, function(player) {
                      console.log("Success Save:"+JSON.stringify(player));
        });
    
        $rootScope.playerList.showDialog('panel.tmpl.html');
    };
    
    
    playerList.addPlayer = function() {
        playerList.saveStatusText = "";

        playerList.employees.push({fname:playerList.newFNameText, lname:playerList.newLNameText, email:playerList.newEmailText, building:playerList.newBuildingText, floor:playerList.newFloorText, room:playerList.newRoomText,phone:playerList.newPhoneText,status:playerList.newStatusText});
        playerList.newNameText = '';
        playerList.newPoolText = '';
    };
 
    playerList.remaining = function() {
      var count = 0;
      angular.forEach(playerList.employees, function(player) {
        count += (player.checkin) ? 1 : 0;
      });
      return count;
    };
    
    playerList.selectAll = function() {
        playerList.saveStatusText = "";

        console.log("SelectAll flag:"+playerList.selectAllFlag);
        
        angular.forEach(playerList.employees, function(player) {
            player.checkin = playerList.selectAllFlag;
        });
    };
    
    playerList.resetTourney = function() {

        playerList.saveStatusText = "";

        angular.forEach(playerList.employees, function(player) {
            player.gameWon=0;
            player.gameLost=0;
            player.gamePlayed=0;
            player.totalPoints=0;
            player.team = 0;
            player.net = 0;
            player.checkin = false;
            
        });

    }
    
    this.showToolbarMenu = function($event, menu) {
      var template = 
        '<div class="menu-panel" md-whiteframe="4">' +
        '  <div class="menu-content">' +
            '<div class="menu-item">' +    
        '      <button class="md-button" ng-click="go(\'/checkin\')">' +
        '        <span>Main</span>' +
        '      </button>' +
        '    </div>' +
            '<div class="menu-item">' +    
        '      <button class="md-button" ng-click="ctrl.settingAction()">' +
        '        <span>Setting</span>' +
        '      </button>' +
        '    </div>' +
            '<div class="menu-item">' +    
        '      <button class="md-button" ng-click="go(\'/result\')">' +
        '        <span>Show Rank</span>' +
        '      </button>' +
        '    </div>' +
            '<div class="menu-item">' +    
        '      <button class="md-button" ng-click="go(\'/random\')">' +
        '        <span>Random</span>' +
        '      </button>' +
        '    </div>' +
        '    <md-divider></md-divider>' +
        '    <div class="menu-item">' +
        '      <button class="md-button" ng-click="ctrl.closeMenu()">' +
        '        <span>Close Menu</span>' +
        '      </button>' +
        '    </div>' +
        '  </div>' +
        '</div>';

      var position = $mdPanel.newPanelPosition()
          .relativeTo($event.target)
          .addPanelPosition(
            $mdPanel.xPosition.ALIGN_START,
            $mdPanel.yPosition.BELOW
          );

      var config = {
        id: 'toolbar_' + menu.name,
        attachTo: angular.element(document.body),
        controller: PanelMenuCtrl,
        controllerAs: 'ctrl',
        template: template,
        position: position,
        panelClass: 'menu-panel-container',
        locals: {
          items: menu.items
        },
        openFrom: $event,
        clickOutsideToClose: true,
        focusOnOpen: false,
        zIndex: 100,
        propagateContainerEvents: true,
        groupName: ['toolbar', 'menus']
      };

      if ($rootScope.playerList == null)
            $rootScope.playerList = playerList;

      $mdPanel.open(config);
    };
    

    playerList.showDialog = function(templateStr) {

        var position = this._mdPanel.newPanelPosition()
           .absolute()
           .center();

        var config = {
            attachTo: angular.element(document.body),
            controller: TourneyListController,
            controllerAs: 'tourneyList',
            disableParentScroll: this.disableParentScroll,
            templateUrl: templateStr,
            hasBackdrop: true,
            panelClass: 'demo-dialog-example',
            position: position,
            trapFocus: true,
            zIndex: 150,
            clickOutsideToClose: true,
            escapeToClose: true,
            focusOnOpen: true
        };

        if ($rootScope.playerList == null)
            $rootScope.playerList = playerList;
        
        this._mdPanel.open(config);
    }

    playerList.closeDialog = function() {
        var panelRef = this.mdPanelRef;
    
        console.log("Inside closeDialog");

        panelRef && panelRef.close();
    };
    
    
    playerList.recordGame = function(ev) {
        
        this.saveStatusText = "";
        
        angular.forEach($rootScope.playerList.employees, function(player) {
                //handle undefine nubmer;
            if (player.gameWon == null) player.gameWon=0;
            if (player.gameLost == null) player.gameLost=0;
            if (player.gamePlayed == null) player.gamePlayed=0;
            if (player.totalPoints == null) player.totalPoints=0;
            
            //record all player on winner team
            if (player.checkin && player.team == playerList.trackTeamWon) {
                
                
                console.log ("Track gamewon:"+player.gameWon+"totalPoints"+player.totalPoints+"pointDif"+playerList.trackPointDif);
                
                player.gameWon++;
                player.totalPoints = Number(player.totalPoints) + Number(playerList.trackPointDif);
                //increase #gameplayed
                player.gamePlayed++;
            }
            
            //record all player on losing team
            if (player.checkin && player.team == playerList.trackTeamLost) {
                player.gameLost++;
                player.totalPoints = Number(player.totalPoints) - Number(playerList.trackPointDif);

                //increase #gameplayed
                player.gamePlayed++;
            }        
        });
        
        playerList.closeDialog();
               
    }
    
    playerList.initSetting = function() {
               
        playerList.userName = $rootScope.playerList.userName;
        playerList.siteId = $rootScope.playerList.siteId;
        playerList.pool1TeamSize = $rootScope.playerList.pool1TeamSize;
        playerList.pool2TeamSize = $rootScope.playerList.pool2TeamSize;
        playerList.teamSize = $rootScope.playerList.teamSize;
        playerList.totalNet = $rootScope.playerList.totalNet;
        
               
    }    

    playerList.recordSetting = function(ev) {
                
        $rootScope.playerList.siteId = playerList.siteId;
        $rootScope.playerList.pool1TeamSize = playerList.pool1TeamSize;
        $rootScope.playerList.pool2TeamSize = playerList.pool2TeamSize;
        $rootScope.playerList.teamSize = playerList.teamSize;
        $rootScope.playerList.totalNet = playerList.totalNet;
        
        playerList.closeDialog();
               
    }    
    
    //main init function that call from index.html
    playerList.init = function() {
        playerList.initAccount();
        if(playerList.isLoggedIn) {
            $rootScope.playerList = playerList;
            playerList.retrieveAllPlayers(playerList.userName);
        }
		
		//$('table.dataTable').DataTable();
    }
    //TODO
    playerList.initChecking = function() {
        var params = $location.search();
        if(params != null){
           isAdmin = params.admin;
        
        var createdByStr = params.createdby;
        
        if(createdByStr != null){    
            $rootScope.playerList = playerList;
            this.retrieveAllPlayers (createdByStr);
        }        
    }
        
    }
    
    playerList.initAccount = function() {
        
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        
        var cognitoUser = userPool.getCurrentUser();
        
        if (cognitoUser != null) {
            cognitoUser.getSession(function (err, session) {
                if (err) {
                    alert(err);
                    return;
                } 
                
                console.log(cognitoUser);
                console.log('session validity: ' + session.isValid());
                playerList.userName = cognitoUser.getUsername();
                playerList.isLoggedIn = true;
            });
        }
        
        
               
    }    
    
    playerList.register = function(ev) {
        
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        var attributeList = [];
        
        var cognitoUser;
        userPool.signUp(playerList.registerusername, playerList.registerpassword,attributeList,null,function(err, result) {
            if (err) {
                alert(err.message);
                return;
            }
            
            cognitoUser = result.user;
            alert("User successfully registered!  Please sign in to start")
            //$rootScope.playerList.userName = "guest";
            //$rootScope.playerList.isLoggedIn = false;
            
            
            
            //$rootScope.playerList.userName = cognitoUser.getUsername();            
            //$rootScope.playerList.isLoggedIn = true;
            playerList.closeDialog();
                
            //playerList.retrieveAllPlayers($rootScope.playerList.userName);
            
        });
        

    }


    playerList.signOut = function(ev) {
        
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        
        var cognitoUser = userPool.getCurrentUser();
        
        if (cognitoUser != null) {
            cognitoUser.signOut();
            playerList.userName = "guest";
            
            $rootScope.playerList.userName = playerList.userName;


            $rootScope.playerList.isLoggedIn = false;
            playerList.closeDialog();
                
            playerList.retrieveAllPlayers($rootScope.playerList.userName);
        }

    }
    
    
    playerList.signIn = function(ev) {
        
        var authenticateData = {Username:playerList.username, Password: playerList.password};
        
        var authenticateDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticateData);
        
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        
        var userData = {Username: playerList.username, Pool: userPool};
        
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticateDetails, {
            onSuccess: function (result){
                var accessToken = result.getAccessToken().getJwtToken();
                /*use the idtoken for login map when federating user pools with identity pools...*/
                var idToken = result.idToken.jwtToken;
                
                $rootScope.playerList.userName = result.getAccessToken().payload.username;
                
                $rootScope.playerList.isLoggedIn = true;
                playerList.closeDialog();
                
                playerList.retrieveAllPlayers($rootScope.playerList.userName);
            },
            
            onFailure: function(err){
                alert(err.message || JSON.stringify(err));
            }
            
        });
        
        
               
    }    
    
    playerList.archive = function() {
        playerList.saveStatusText = "";
      
            //var addPlayerUrl = "https://35ywp9uz0b.execute-api.us-east-1.amazonaws.com/vbcoach_prod/addplayer";
        
            var addPlayerUrl = "https://floorwardenbackend.azurewebsites.us/api/Employees/Add";
        
              var oldNames = playerList.employees;
              var count = 0;
              angular.forEach(oldNames, function(player) {
                  
                  //player.createdBy = playerList.userName;
                   
                  //save to server 
                  $http.post(addPlayerUrl,player).
                  then(function(response){
                      console.log("Success Save:"+JSON.stringify(player));

                  });
              });
        
        playerList.saveStatusText = "Saved Successfully.";
    };

    playerList.letsGo = function() {
        
        
        var generatedPool1 = [];
        var generatedPool2 = [];
        var generatedPool3 = [];
        playerList.allTeamCount = 0;
        playerList.totalNet = 1;
        playerList.saveStatusText = "";
        
        angular.forEach(playerList.names, function(player) {   
                    
          if (player.group =="Gold" && player.checkin){
              generatedPool1.push(player);
          } else if (player.group =="Silver" && player.checkin) {              
              generatedPool2.push(player);
          } else { //unknown
              if(player.checkin){
                 generatedPool3.push(player);
              }
          }          
          
        });
        
        //randomize pool1
        playerList.shuffleArray(generatedPool1);
        
        //assign team number
        var pool1TeamCount = 1;   
        var pool1NumberTeam = Math.round(generatedPool1.length / playerList.pool1TeamSize);
        generatedPool1.forEach(function(player) {
            player.team = pool1TeamCount++;
            player.net = Math.round(player.team/2);
            if(pool1TeamCount > pool1NumberTeam){
                pool1TeamCount = 1
            }
            playerList.allTeamCount = (playerList.allTeamCount > pool1TeamCount)?playerList.allTeamCount:pool1TeamCount;
         
        });   

        //randomize pool2
        playerList.shuffleArray(generatedPool2);
        
        //assign team number
        var pool2TeamCount = playerList.allTeamCount+1;   
        var pool2TeamCountOrg = pool2TeamCount;   
        var pool2NumberTeam = Math.round(generatedPool2.length / playerList.pool2TeamSize);
        generatedPool2.forEach(function(player) {
            player.team = pool2TeamCount++;
            player.net = Math.round(player.team/2);
            if((pool2TeamCount-pool2TeamCountOrg)+1 > pool2NumberTeam){
                pool2TeamCount = pool2TeamCountOrg;
            }
            
            playerList.allTeamCount = (playerList.allTeamCount > pool2TeamCount)?       playerList.allTeamCount:pool2TeamCount;
         
        });   
        
        
        
        //randomize pool3
        playerList.shuffleArray(generatedPool3);
        
        //assign team number
        var pool3TeamCount = playerList.allTeamCount+1;   
        var pool3TeamCountOrg = pool3TeamCount;   
        var pool3NumberTeam = Math.round(generatedPool3.length / playerList.teamSize);
        generatedPool3.forEach(function(player) {
            console.log("Allteamcount"+playerList.allTeamCount);
            console.log("pool3TeamCount before + 1 " + pool3TeamCount);

            player.team = pool3TeamCount++;
            player.net = Math.round(player.team/2);
            if((pool3TeamCount-pool3TeamCountOrg)+1 > pool3NumberTeam){
                pool3TeamCount = pool3TeamCountOrg
            }
            playerList.allTeamCount = (playerList.allTeamCount > pool3TeamCount)?playerList.allTeamCount:pool3TeamCount;
         
        });   
        
        //update model for view
        playerList.generatedPool1 = [];
        angular.forEach(generatedPool1, function(player) {   
            playerList.generatedPool1.push(player);
        });
        
        //update model for view
        playerList.generatedPool2 = [];
        angular.forEach(generatedPool2, function(player) {   
            playerList.generatedPool2.push(player);
        });
        
        //update model for view
        playerList.generatedPool3 = [];
        angular.forEach(generatedPool3, function(player) {   
            playerList.generatedPool3.push(player);
        });
        
        
        playerList.statusText = "Need " + Math.round(playerList.allTeamCount/2) + " Nets Totals"; 
        //$rootScope.test = "TTTTTEST";
        //$rootScope.playerList = playerList;
        alert(playerList.statusText);

    };
    
    // -> Fisher–Yates shuffle algorithm
    playerList.shuffleArray = function(array) {
      var m = array.length, t, i;
  
      // While there remain elements to shuffle
      while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);
  
        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }
  
      return array;
    }
 
}
    
    
  function PanelMenuCtrl($window,$rootScope,mdPanelRef) {
    this.closeMenu = function() {
      mdPanelRef && mdPanelRef.close();
    };
    this.accountAction = function() {      
        
        mdPanelRef && mdPanelRef.close();
        $rootScope.playerList.showDialog('account.panel.html');
    };
      
    this.settingAction = function() {      
        
        mdPanelRef && mdPanelRef.close();
        $rootScope.playerList.showDialog('setting.panel.html');
    };
      
    this.showRankAction = function() {      
        if ($rootScope.playerList.userName && $rootScope.playerList.userName=="guest") {
            alert("You must logged in to use the save/publish feature before seeing rank.");
        } else {
            alert("You are about to leave this main app.  Click back button to go back.");
            $window.location.href = "Result.html?createdby=" + $rootScope.playerList.userName;
            mdPanelRef && mdPanelRef.close();            
        }
        
    };
  }    
    
})();