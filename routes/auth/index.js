var db = require("../../config/db");

exports.login_page = function(req, res) {
	res.render("auth/login");
};

exports.logout = function(req,res) {
	
	res.redirect("/login");
};	