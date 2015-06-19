module.exports = function($scope, $state, gamesFactory, $stateParams) {
	
	var self = this;
	this.activeTab = "gameboard";
	var Game = require("./../models/game");
	this.game = new Game(gamesFactory, $stateParams["id"]);
	//this.game.getTiles();
	//gamesFactory.testSockets($stateParams["id"]);

	
	/*var io = require("socket.io");
	var socket = io.connect("http://mahjongmayhem.herokuapp.com?gameId=" + this.game.id);
	
	socket.on('connection', function(socket) {

		// Er zijn twee tegels gematched
		socket.on("match", function() {
			console.log("Er zijn twee tegels gematched");
		});
		
	});*/

	/*var socket = io("http://mahjongmayhem.herokuapp.com?gameId=" + this.game.id);
	 
	socket.on('connection', function (socket) {
	    socket.on("match", function() {
			console.log("Er zijn twee tegels gematched");

		});
	});*/
	
	var socket = io.connect("http://mahjongmayhem.herokuapp.com?gameId=" + this.game.id);
	socket.on("match", function(matchedTiles) {
		self.game.setTilesMatched(matchedTiles);
		$scope.$apply();
	});
	socket.on("end", function(matchedTiles) {
		var text = "The winner(s):";
		var winners = self.game.getWinners();
		for (var i = 0; i < winners.length; i++) {
			text = text + " " + winners[i].name;
			if (i != winners.length-1) {
				text = text + ",";
			}
		}
		swal({  
			title: "Game finished!",  
			text: text,  
			showConfirmButton: true
		});
	});
	
	var eventTile1 = null;
	var tile1 = null;

	this.selectTile = function(event, selectedTile) {
		// Als de tegel niet vrij is, dan doe niks
		if (!this.game.checkTileFreedom(selectedTile)) {
			return;
		}

		// Voegt blauw gloed toe
		$(event.target).addClass('isSelected');
		
		if (tile1 == null) {
			eventTile1 = event;
			tile1 = selectedTile;
		} 
		else {
			var targetTile1 = eventTile1.target;
			var targetTile2 = event.target;

			// Haalt blauwe gloed weg
			$(targetTile1).removeClass('isSelected');
			$(targetTile2).removeClass('isSelected');

			if (selectedTile != tile1) {
				if (this.game.checkMove(tile1, selectedTile)) {
					//this.playerHasMatch(tile1, selectedTile);
					this.game.addMatch(tile1, selectedTile);

					this.checkMatchesLeft();
				}
				else {					
					// Voegt rode gloed toe
					$(targetTile1).addClass('noMatch');
					$(targetTile2).addClass('noMatch');

					// Haalt rode gloed weg
					setTimeout(function() {
						$(targetTile1).removeClass('noMatch');
						$(targetTile2).removeClass('noMatch');
					}, 800);
				}
			}

			eventTile1 = null;
			tile1 = null;
		}
	}

	/*this.playerHasMatch = function(tile1, tile2) {
		this.game.addMatch(tile1, tile2);
	}*/

	this.checkMatchesLeft = function() {
		if (!this.game.matchesLeft()) {
			alert("There are no more matches. The game is over.");
		}
	}

	this.goBackToGames = function() {
		$state.go('home');
	}

	this.goToGameboard = function() {
		this.activeTab = 'gameboard';
		$state.go('game.gameboard');
	}

	this.goToPlayers = function() {
		this.activeTab = 'players';
		$state.go('game.players')
	}
	
	$state.go('game.gameboard');

}