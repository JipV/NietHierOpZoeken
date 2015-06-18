describe("Directives test", function() {
	var $compile;
	var $rootScope;

	beforeEach(module("Mahjong_Mayhem"));

	beforeEach(module('views/directives/user.html'));

	/*
		We kunnen verchillende dingen van de app opvragen.
		Services, filters, directives, controllers, scopes, etc

		Angular-mocks gebruikt de inject functie hiervoor.

		We kunnen underscores voor en achter de providers zetten, angular weet dan nog steeds welke providers het zijn
	*/
	beforeEach(inject(function(_$compile_, _$rootScope_){
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	it('should render the user directive', function() { 
		// Maak een nieuwe scope die de properties bevat die we willen testen
		var $scope = $rootScope.$new();
		$scope.item = {

			user: "ebrandsm@student.avans.nl",
			isLoggedIn: function(){
				return true;
			}
		}
		// We maken onze string (die we gebruiken in templates om directives aan te duiden)
		// en compileren deze zodat de directive gecreëerd wordt.
		var element = $compile('<user></user>')($scope);

		// We kunnen de html opvragen en vergelijken met wat we verwachten.
		// In dit geval verwachten we dat de voor- en achternaam achter elkaar in een h3 staan.
		expect(element.html()).to.have.string('ebrandsm@student.avans.nl');
	});

});