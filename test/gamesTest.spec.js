describe("GamesController", function() {
	var gamesController;
	var gamesFactory;
	var httpBackend;
	var scope;
	
	// initialize the app
	beforeEach(module('Mahjong_Mayhem'));

	// Inject the modules and get them in global variables
	beforeEach(inject(function($rootScope, $controller, $httpBackend, $injector){
		// The scope for the controller
		scope = $rootScope.$new();
		// Get the service which will be injected
		gamesFactory = $injector.get('gamesFactory');
		// For mocking the backend
		httpBackend = $httpBackend;

		
		
		var id = "5541fc5b1872631100678bb4";
		
		
		var tiles = [
			{ 
				_id: "23456y",
				id: "23456y",
				xPos: 1,
				yPos: 2,
				zPos: 0,
				tile: {
					name: "2",
					suit: "Character",
					matchesWholeSuit: true
				}
			},
			{ 
				_id: "dfbgdcj",
				id: "dfbgdcj",
				xPos: 3,
				yPos: 2,
				zPos: 0,
				tile: {
					name: "2",
					suit: "Character",
					matchesWholeSuit: true
				}
			},
			{ 
				_id: "adfbcgdcj",
				id: "adfbcgdcj",
				xPos: 3,
				yPos: 0,
				zPos: 0,
				tile: {
					name: "West",
					suit: "Wind",
					matchesWholeSuit: true
				}
			},
			{ 
				_id: "adfbcgdcj",
				id: "adfbcgdcj",
				xPos: 3,
				yPos: 0,
				zPos: 1,
				tile: {
					name: "3",
					suit: "Character",
					matchesWholeSuit: true
				}
			}
			
		];
		
		
		
		// Stubbing with sinon
		gamesFactory.getTiles = function(id, callback) {
			//callback([tils]);
			callback(tiles);
		};
		
		
		
		
		
		
		/*gamesFactory.getTiles = sinon.stub();
		gamesFactory.getTiles.withArgs(id).returns([
			{ 
				_id: "23456y",
				id: "23456y",
				xPos: 1,
				yPos: 2,
				zPos: 0,
				tile: {
					name: "2",
					suit: "Character",
					matchesWholeSuit: true
				}
			},
			{ 
				_id: "dfbgdcj",
				id: "dfbgdcj",
				xPos: 3,
				yPos: 2,
				zPos: 0,
				tile: {
					name: "2",
					suit: "Character",
					matchesWholeSuit: true
				}
			},
			{ 
				_id: "adfbcgdcj",
				id: "adfbcgdcj",
				xPos: 3,
				yPos: 0,
				zPos: 0,
				tile: {
					name: "West",
					suit: "Wind",
					matchesWholeSuit: true
				}
			},
			{ 
				_id: "adfbcgdcj",
				id: "adfbcgdcj",
				xPos: 3,
				yPos: 0,
				zPos: 1,
				tile: {
					name: "3",
					suit: "Character",
					matchesWholeSuit: true
				}
			}
			
		]);*/
		
		//gamesFactory.sayHello.withArgs('Martijn').returns('Stub says hi Martijn');
		//gamesFactory.sayHello.returns('Hi from stub');
		
		// This is the controller we're going to test
		gamesController = $controller('GamesController', { $scope: scope, gamesFactory: gamesFactory });
	}));

	it('should mock the httpbackend', function(){
		
		require('../app/js/models/game.js');
		// Given
		var game = new Game(gamesFactory);
		game.getTiles();
		
		expect(game.matchesLeft()).to.equal(true);
		
	});
});