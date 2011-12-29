var _u = require("underscore");

var notPermitted = "You do not have permission to do that.";
var unauthorized = "Unauthorized.";

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
			next(new Error(unauthorized));
		}
	};
};

exports.checkPermission = function(permission) {
	return function(req, res, next) {
		if(checkPermission(permission, req.session)) {
			next();
		} else {
			next(new Error(notPermitted));
		}
	};
};

exports.checkLoginAndPermission = function(permission) {
	return function(req, res, next) {
		if(checkLogin(req.session)) {
			if(checkPermission(permission, req.session)) {
				next();
			} else {
				next(new Error(notPermitted));
			}
		} else {
			next(new Error(unauthorized));
		}
	};
};