module.exports = function(){
  	return {
		restrict: 'E',
		templateUrl: 'views/directives/user.html',
		
		// PersonDirective.js
		scope: {
			user: '=?',
			onSelect: '=?'
		},
		controller: function($scope){
			var self = this;

			$scope.user = window.localStorage.getItem("email");
			console.log('THe user is; ' + $scope.user);
			$scope.isLoggedIn = function(){
				if($scope.user){
					return true;
				} else {
					return false
				}
			}
		},
		
		// PersonDirective.js
		link: function(scope, element, attrs){
			scope.toLogin = function(){
				if(scope.onSelect){
					scope.onSelect();
				}
			};
		}
	};
}