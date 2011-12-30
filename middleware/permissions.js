var _u = require("underscore");

var notPermitted = "You do not have permission to do that.";
var unauthorized = "You must be logged in.";

function checkLogin(session) {
	if(typeof session.auth === "undefined") {
		return false;
	}
	return true;
}

function checkPermission(permission, session) {
	if(typeof session.auth !== "undefined") {
		if(typeof(session.auth.permissions !== "undefined")) {
			// Underscore's indexOf returns -1 if the item is not in the array
			// http://documentcloud.github.com/underscore/#indexOf
			if(_u.indexOf(session.auth.permissions, permission) !== -1) {
				return true;
			}
		}
	}
	return false;
}

exports.checkLogin = function() {
	return function(req, res, next) {
		if(checkLogin(req.session)) {
			next();
		} else {
			req.flash("error", unauthorized);
			res.redirect("/login");
		}
	};
};

exports.checkPermission = function(permission) {
	return function(req, res, next) {
		if(checkPermission(permission, req.session)) {
			next();
		} else {
			req.flash("error", notPermitted);
			res.redirect("home");
		}
	};
};

exports.checkLoginAndPermission = function(permission) {
	return function(req, res, next) {
		if(checkLogin(req.session)) {
			if(checkPermission(permission, req.session)) {
				next();
			} else {
				req.flash("error", notPermitted);
				res.redirect("home");
			}
		} else {
			req.flash("error", unauthorized);
			res.redirect("/login");
		}
	};
};