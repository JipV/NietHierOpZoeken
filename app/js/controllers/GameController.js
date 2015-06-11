module.exports = function($scope, gamesFactory, gameService) {
	
	var Game = require("./../models/game");
	this.game = new Game(gamesFactory, gameService.getGame()._id);
	this.game.getTiles();
	

	
	/*var io = require("socket.io");
	io("http://mahjongmayhem.herokuapp.com?gameId=" + this.game.id);
	
	io.sockets.on('connection', function(socket) {

		// Er zijn twee tegels gematched
		socket.on("match", function(roomId) {
			console.log("Er zijn twee tegels gematched");
		});
		
	});*/
	
	


	var eventTile1 = null;
	var tile1 = null;

	this.selectTile = function(event, selectedTile) {

		console.log(selectedTile);

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
					$(targetTile1).remove();
					$(targetTile2).remove();
					this.playerHasMatch(tile1, selectedTile);
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

	this.playerHasMatch = function(tile1, tile2) {
		this.game.addMatch(tile1._id, tile2._id);
	}

	this.checkMatchesLeft = function() {
		if (!this.game.matchesLeft()) {
			alert("There are no more matches. The game is over.");
		}
	}

}