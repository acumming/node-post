exports.getData = function() {

	return function(req, res, next) {
		console.log("get data");
		next();
	}
}