var userModel = require("../../models/user").model;
var gravatar = require("../../helpers/gravatar")

exports.index = function(req, res) {
	
	res.render("staff/directory");
};

exports.me = function(req, res) {
	userModel.findByEmail(req.session.auth.email, function(err, document) {
		document.gravatar = {
			url: gravatar.getGravatarURL(document.email, "jpg", 200)
		};
		res.render("staff/me", {
			teams: req.teams
			, disciplines: req.disciplines
			, user: document
		});
	});
};

exports.edit_me = function(req, res) {
	res.render("staff/edit_me");
};