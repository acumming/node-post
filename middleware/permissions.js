var notPermitted = "You do not have permission to do that.";
var unauthorized = "Unauthorized.";

function checkLogin() {
	return true;
}

function checkPermisison(permission) {
	return false;
}

exports.checkPermission = function(permission) {
	return function(req, res, next) {
		console.log(this);
		if(checkPermission(permission)) {
			next();
		} else {
			next(new Error(notPermitted));
		}
	}
};

exports.checkLoginAndPermission = function(permission) {
	return function(req, res, next) {
		if(checkLogin()) {
			if(checkPermisison(permission)) {
				next();
			} else {
				next(new Error(notPermitted));
			}
		} else {
			next(new Error(unauthorized));
		}
	}
};