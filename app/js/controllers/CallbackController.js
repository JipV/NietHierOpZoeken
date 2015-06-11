module.exports = function($location) {
	var location = $location.search();

	window.localStorage.setItem('email', location.username);
	window.localStorage.setItem('token', location.token);

	$location.url('/games');
	window.location.reload();
}