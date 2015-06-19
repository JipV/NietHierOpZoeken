describe("Example Directives", function() {
	var userDirective;
	var $compile;
	var $rootScope;

	beforeEach(module('Mahjong_Mayhem'));

  	beforeEach(module('views/directives/user.html'));

	beforeEach(inject(function(_userDirective_, _$compile_, _$rootScope_){
		userDirective = _userDirective_;
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));
	
	it('should render the user directive', function() { 
		var $scope = $rootScope.$new();
		window.localStorage.setItem('email', "ebrandsma@student.avans.nl");
		$scope.myFunctionWhenClickedOn = function() {
			console.log('OnClick was called!');
		};

		var element = $compile('<user user="user" on-select="myFunctionWhenClickedOn"></user>')($scope);
		$scope.$digest();
		$('#loginButton').triggerHandler('click');
		expect(element.html()).to.have.string('You are logged in as ebrandsma@student.avans.nl');
	});
});
