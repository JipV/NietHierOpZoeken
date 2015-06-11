require('angular/angular');
require('angular-ui-router/build/angular-ui-router');

// Create your app
var app = angular.module("Mahjong_Mayhem", ['ui.router']);

//Auth
var HttpInjector      = require('./factories/httpInjector');
app.factory('HttpInjector', HttpInjector);

//Factories
var urlFactory = require("./factories/urlFactory");
var loginFactory = require("./factories/loginFactory");
var gamesFactory = require("./factories/gamesFactory");

var gameService = require("./services/gameService");

var gamesController = require("./controllers/GamesController");
var gameController = require("./controllers/GameController");

app.factory("urlFactory", urlFactory);
app.factory("gamesFactory", gamesFactory);
app.factory("loginFactory", loginFactory);

app.service("gameService", gameService);

//Controllers
var gamesController = require("./controllers/GamesController");
var gameController = require("./controllers/GameController");
var loginController = require("./controllers/LoginController");
var userController = require("./controllers/UserController");
var callbackController = require("./controllers/CallbackController");

app.controller("GamesController", gamesController);
app.controller("GameController", gameController);
app.controller("loginController", loginController);
app.controller("UserController", userController);
app.controller("callbackController", callbackController)

//Models
var game = require("./models/game");

app.config(function($stateProvider, $httpProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('login', {
      url: "/",
      controller: loginController,
      templateUrl:"./views/login.html"
    })
    .state('home', {
      url: "/games",
      templateUrl: "./views/games.html",
      controller: "GamesController as gamesController",
      resolve: {
        retreivedGames: function(gamesFactory, $q){
          setProgressBar("Loading games", 30);
          var deferred = $q.defer();

          gamesFactory.getGames(100, setProgressBar, function(games){
            setProgressBar("Loading games", 100);
            deferred.resolve(games);
          })

          return deferred.promise;
        }
      }
    })
    .state('home.opengames', {
      templateUrl: "./views/directives/gamesViews/opengames.html",
    })
    .state('home.playinggames', {
      url: "/playing",
      templateUrl: "./views/directives/gamesViews/playinggames.html"
    })
    .state('home.ownedgames', {
      url: "/owned",
      templateUrl: "./views/directives/gamesViews/ownedgames.html",
    })
    .state('game', {
      url: "/game",
      templateUrl: "./views/game.html",
      controller: gameController
    })
    .state('game.gameboard', {
      url: "/gameboard",
      templateUrl: "./views/gameboard.html"
    })
    .state('game.gamePlayers', {
      url: "/gamePlayers",
      templateUrl: "./views/gamePlayers.html"
    })
    .state('authcallback', {
      url: "/auth/authcallback",
      controller: callbackController
    });
});

app.config(['$httpProvider', function ($httpProvider)
{
  $httpProvider.interceptors.push('HttpInjector');
}]);

app.directive('tile', function() {
	return {
		restrict: 'E',
		templateUrl: './views/directives/tileTemplate.html',
		controller: function($scope) {
		},
		link: function(scope, element, attrs) {
		}
	}
});

app.directive('game', function() {
  return {
    restrict: 'E',
    templateUrl: './views/directives/gamesViews/game.html',
  }
});

app.directive('creategame', function() {
  return {
    restrict: 'E',
    templateUrl: './views/directives/gamesViews/creategame.html',
  }
});

app.directive('user', function(){
  return {
    restrict: 'E',
    templateUrl:'./views/directives/user.html',
    controller: "UserController as uc"
  }
});

function setProgressBar(task, number){
  $("#loadingTask").html(task)
  $('.progress-bar').css('width', number+'%').attr('aria-valuenow', number);
}
