var db = require("../drivers/mongo").db;
var md5 = require("MD5");
var _u = require("underscore");

db.collection("users").ensureIndex({"email": 1});

db.bind("users", {
	"findByEmail": function(email, fn) {
		this.findOne({
			"email": email
		}, fn);
	},
	"insertUser": function(postdata, fn) {

		// The form inputs give us permissions in the format
		// { "permission": "on" }
		// and we want an array of permission names *only*
		// [ "permission_1", "permission_2" ]
		var permissions = [];
		if(typeof postdata.permissions !== "undefined") {
			_u.forEach(postdata.permissions, function(value, key) {
				permissions.push(key);
			});
		}
		
		this.insert({
			"discipline": postdata.discipline
			, "email": postdata.email
			, "first_name": postdata.first_name
			, "last_name": postdata.last_name
			, "password": md5(postdata.password)
			, "permissions": permissions
			, "status": postdata.user_status
			, "team": postdata.team
		}, {
			"safe": true
		}, fn);
	},
	"checkLogin": function(postdata, fn) {
		this.findOne({
			"email": postdata.email
			, "password": md5(postdata.password)
		}, fn);
	}
});

exports.model = db.users;