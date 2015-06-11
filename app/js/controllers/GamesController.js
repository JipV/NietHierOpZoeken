module.exports = function($scope, $state, $timeout, gamesFactory, gameService, retreivedGames) {

	this.user = {
		_id: window.localStorage.getItem("email"),
		id: window.localStorage.getItem("email")
	};

	this.activeTab = "open"
	this.confirmButtonColor = "#337ab7"

	this.gameType = "Shanghai";

	this.games = retreivedGames;
	this.creatingGame = false

	var progressBarToAdd = '<div id="progressBarToRemove" class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div></div>'
	var self = this;
	var stop;

	this.showGame = function(game) {
		gameService.setGame(game);
		$state.go('game');
	}

	this.hasPlayer = function(game, user){
		for(var x = 0; x < game.players.length; x++){
			if(game.players[x]._id === user._id){
				return true
			}
		}
		return false
	}	
	
	this.createGame = function() {
		var minPlayers = $("#minPlayers").val();
		var maxPlayers = $("#maxPlayers").val();
		if(minPlayers != "" && maxPlayers != "" && minPlayers > 0 && minPlayers < 33 && maxPlayers > 0 && maxPlayers < 33 && maxPlayers > minPlayers){
			//Implementeer success (Alle gegevens zijn goed )
			$("#addProgressBarHere").append(progressBarToAdd)
			this.creatingGame = true
			gamesFactory.createGame(this.gameType, minPlayers, maxPlayers, function(newGame){
				self.games.push(newGame);
				$("#progressBarToRemove").remove()
				swal({ title: "Game created!", text: "The game is added to 'My games'", type: "success", confirmButtonText: "Cool!", 
					confirmButtonColor: self.confirmButtonColor }, function(){
					self.creatingGame = false
					self.goToOwnedGames();
				});
			});
		} else {
			$("#alertToRemove").remove()
			$("#createGame").append('<div id="alertToRemove" class="alert alert-danger myAlert" role="alert">De game voldoet niet aan een van deze eisen: </br> minPlayers != undefined && maxPlayers != undefined && minPlayers > 1 && minPlayers < 32 && maxPlayers > 0 && maxPlayers < 33 && maxPlayers > minPlayers</div>')
			$(".myAlert").dequeue();
			$(".myAlert").css("opacity", 0);
			$(".myAlert").clearQueue();
			$(".myAlert").stop(true, true);
			if(angular.isDefined(stop)){
				$timeout.cancel(stop);
            	stop = undefined;
			}
			$(".myAlert").animate({
			    opacity: 1,
			}, 1000, function() {
			    stop = $timeout(function(){
					$( ".myAlert" ).animate({
						opacity: 0,
					}, 4000, function() {
						$("#alertToRemove").remove()
					});
				}, 4000);
			});
		}
	};

	this.joinGame = function(game) {
		swal({   
			title: "Joining game!",   
			text: progressBarToAdd,   
			html: true,
			showConfirmButton: false });

		gamesFactory.joinGame(game._id, function(data){
			for (var i in self.games) {
		     if (self.games[i]._id == data._id) {
		        self.games[i] = data;
		        break;
		     }
		   }
			swal.close();
			window.setTimeout(function(){
				swal({ title: game.createdBy.name + "'s game joined!", text: "You have successfully joined " +  game.createdBy.name + "'s game!'", type: "success", confirmButtonText: "Cool!", 
					confirmButtonColor: self.confirmButtonColor});
			}, 400)
		});
	};

	this.startGame = function(game) {
		
		swal({   
			title: "Starting game!",   
			text: progressBarToAdd,   
			html: true,
			showConfirmButton: false });

		gamesFactory.startGame(game._id, function(data){
			for (var i in self.games) {
		     	if (self.games[i]._id == game._id) {
		        	self.games[i].state = "playing";
		        	break;
		     	}
		   	}
			swal.close();
			window.setTimeout(function(){
				swal({   
					title: "Game started!",   
					text: "You have successfully started your game!",   
					type: "success",   
					showCancelButton: true,   
					confirmButtonColor: self.confirmButtonColor,   
					confirmButtonText: "Go to game!",   
					cancelButtonText: "Cool!",   
					closeOnConfirm: true,   
					closeOnCancel: true }, function(isConfirm){   
						if (isConfirm) {     
							for (var i in self.games) {
						     	if (self.games[i]._id == game._id) {
						        	self.showGame(self.games[i])
						        	break;
						     	}
						   	} 
						}
					});
			}, 400)
		});
	};

	this.isOwnedGame = function(game){
		if(this.user._id == game.createdBy._id){
			return true;
		} else {
			var found = false;
			for(var i = 0; i < game.players.length; i++) {
			    if (game.players[i]._id == this.user._id) {
			        found = true;
			        break;
			    }
			}
			return found;
		}
	}

	this.isSelfCreatedGame = function(game){
		return this.user._id == game.createdBy._id;
	}

	this.goToOwnedGames = function(){
		this.activeTab = 'owned'
		$state.go('home.ownedgames');
	}

	this.goToOpenGames = function(){
		this.activeTab = 'open'
		$state.go('home.opengames');
	}

	this.goToPlayingGames = function(){
		this.activeTab = 'playing'
		$state.go('home.playinggames')
	}

	this.changeSelect = function(gameType){
		this.gameType = gameType;
		$("#selectGameType").html(this.gameType);
	}
	
	$state.go('home.opengames');
}