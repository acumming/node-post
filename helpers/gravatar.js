var md5 = require("MD5");

exports.getGravatarURL = function (email, extension, size) {
	
	var gravatar_url = "http://www.gravatar.com/avatar/"
	
	var sanitized_email = email.trim().toLowerCase();
	
	var hashed_email = md5(sanitized_email);
	
	var g = gravatar_url + hashed_email + "." + extension + "?s=" + size;
	
	return g;	
}