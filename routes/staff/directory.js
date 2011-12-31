var userModel = require("../../models/user").model;
var gravatar = require("../../helpers/gravatar")
var md5 = require("MD5");
var _u = require("underscore");

exports.directory = function(req, res) {
	var sort = req.params.sort || "email";
	userModel.directory(sort, function(err, documents) {
		
		for(var i = 0; i < documents.length; i++) {
			documents[i].gravatar = {
				url: gravatar.getGravatarURL(documents[i].email, "jpg", 60)
			}
		}
		res.render("staff/directory", {
			disciplines: req.disciplines
			, teams: req.teams
			, users: documents
		});
	});
};