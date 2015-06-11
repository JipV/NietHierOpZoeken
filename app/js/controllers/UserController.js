module.exports = function($scope) {

	this.user = window.localStorage.getItem("email");

	this.isLoggedIn = function(){
		if(window.localStorage.getItem("email")){
			return true;
		} else {
			return false
		}
	}
}