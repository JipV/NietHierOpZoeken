module.exports = function() {

    var gameService = {};

    var game = "";

    gameService.setGame = function(game) {
        this.game = game;
    };

    gameService.getGame = function(){
        return this.game;
    };

    return gameService;

};