var userModel = require("../../models/user").model;

exports.login_page = function(req, res) {

	if(typeof req.session.auth !== "undefined") {
		res.redirect("home");
	} else {
		res.render("auth/login");
	}
};

exports.login = function(req, res) {
	
	var errors = [];
	
	req.onValidationError(function(msg) {
		errors.push(msg);
		return this;
	});	

	req.assert('email', 'Invalid email.').notEmpty().isEmail();
	req.assert('password', 'Password is required.').notEmpty();

	if (errors.length) {
		req.flash("error", errors.join(", "));
		res.redirect("/login");
	} else {
		
		userModel.checkLogin(req.body, function(err, user) {
			if(user === null) {
				req.flash("error", "Your email or password is incorrect.");
				res.redirect("/login");
			}
			else {
				req.session.auth = {
					"email": user.email
					, "first_name": user.first_name
					, "last_name": user.last_name
					, "permissions": user.permissions
					, "team": user.team
					, "discipline": user.discipline
					, "status": user.status
				};
				
				res.redirect("home");
			}
		});
	}
};

exports.logout = function(req,res) {

	res.header('Cache-Control', 'no-cache');
	res.header('Expires', 'Fri, 31 Dec 1998 12:00:00 GMT');

	delete req.session.auth;
	
	req.flash("massage", "You have been logged out.");
	
	res.redirect("/login");
};	