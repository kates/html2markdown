beforeEach(function () {
	this.addMatchers({
		toBeAnyOf: function(list) {
			var text = this.actual;
			for(var i in list) {
				if (list[i] === text) {
					return true;
				}
			}
			return false;
		}
	});
});
