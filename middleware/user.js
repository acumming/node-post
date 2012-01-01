var userModel = require("../models/user").model;
exports.getUser = function() {
	return function(req, res, next) {
		if(req.session.auth && req.session.auth.email) {
			userModel.findByEmail(req.session.auth.email, function(err, user) {
				req.user = user;
				next();
			});
		} else {
			next();
		}
	}
};