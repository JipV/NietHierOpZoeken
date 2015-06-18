describe("Filters test", function() {

	var tileNotMatchedFilter;
	var tileMatchedByPlayerFilter;

	var tiles = [
		{ 
			_id: "tile1"
		},
		{ 
			_id: "tile2",
			match: {
				foundBy: "j.verhoeven5@student.avans.nl",
				foundOn: "2015-06-14T15:20:23.320Z",
				otherTileId: "tile4"
			}
		},
		{ 
			_id: "tile3"
		},
		{ 
			_id: "tile4",
			match: {
				foundBy: "j.verhoeven5@student.avans.nl",
				foundOn: "2015-06-14T15:20:23.320Z",
				otherTileId: "tile2"
			}
		},
		{ 
			_id: "tile5",
			match: {
				foundBy: "e.brandsma@student.avans.nl",
				foundOn: "2015-06-14T15:20:25.320Z",
				otherTileId: "tile6"
			}
		},
		{ 
			_id: "tile6",
			match: {
				foundBy: "e.brandsma@student.avans.nl",
				foundOn: "2015-06-14T15:20:25.320Z",
				otherTileId: "tile6"
			}
		}
	];

	var player1 = {
		_id: "j.verhoeven5@student.avans.nl",
		name: "Jip Verhoeven",
	}

	beforeEach(module("Mahjong_Mayhem"));

	beforeEach(inject(function(_tileNotMatchedFilter_, _tileMatchedByPlayerFilter_) {
		tileNotMatchedFilter = _tileNotMatchedFilter_;
		tileMatchedByPlayerFilter = _tileMatchedByPlayerFilter_;
	}));

	it('should return not matched tiles', function(done) {
		var result = tileNotMatchedFilter(tiles);
		expect(result).to.have.length(2);
		expect(result[0]._id).to.equal("tile1");
		expect(result[1]._id).to.equal("tile3");
		done();
	});

	it('should return tiles matched by player', function(done) {
		var result = tileMatchedByPlayerFilter(tiles, player1);
		expect(result).to.have.length(2);
		expect(result[0].match.foundBy).to.equal("j.verhoeven5@student.avans.nl");
		expect(result[0].match.otherTileId).to.equal("tile4");
		expect(result[1].match.foundBy).to.equal("j.verhoeven5@student.avans.nl");
		expect(result[1].match.otherTileId).to.equal("tile2");
		done();
	});

});