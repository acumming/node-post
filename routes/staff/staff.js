var userModel = require("../../models/user").model;

exports.index = function(req, res) {
	
	res.render("staff/directory");
};

exports.me = function(req, res) {
	res.render("staff/me");
};

exports.edit_me = function(req, res) {
	res.render("staff/edit_me");
};