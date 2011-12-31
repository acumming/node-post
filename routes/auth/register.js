var userModel = require("../../models/user").model;

exports.registration_page = function(req, res) {
	
	res.render("auth/register", {
		disciplines: req.disciplines
		, teams: req.teams
	});
};

exports.register = function(req, res) {
	
	var errors = [];
	
	req.onValidationError(function(msg) {
		errors.push(msg);
		return this;
	});	

	req.assert('email', 'Invalid email.').notEmpty().isEmail();
	req.assert('password', 'Password is required.').notEmpty();
	req.assert('password_confirm', 'Password and password confirmation must match.').notEmpty().equals(req.body.password);

	if (errors.length) {
		req.flash("error", errors.join(", "));
		res.redirect("/register");
	} else {
		
		// Database insert
		userModel.findByEmail(req.body.email, function(err, user) {
			if(user === null) {
				userModel.insertUser(req.body, function(err, user) {
					if(!err) {
						req.flash("message", "User registered.");
						res.redirect("/directory");
					} else {
						req.flash("error", "Error registering user.");
						res.redirect("/register");
					}
				});
			} else {
				req.flash("error", "User already exists.");
				res.redirect("/register");
			}
		});
	}
};