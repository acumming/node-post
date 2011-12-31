var db = require("../drivers/mongo").db;
var md5 = require("MD5");
var _u = require("underscore");

// The form inputs give us checkbox arrays in the format
// { "permission": "on" }
// and we want an array of names *only*
// [ "permission_1", "permission_2" ]
function pushKey(arr) {
	var ret = [];
	_u.forEach(arr, function(value, key) {
		ret.push(key);
	});
	return ret;
}

db.collection("users").ensureIndex({
	"email": 1
});

db.bind("users", {

	// ! Find one
	"findByEmail": function(email, fn) {
		this.findOne({
			"email": email
		}, fn);
	}
	
	, "directory": function(sort, fn) {

		this.find({}, {}).sort(sort).toArray(fn);
		
	}
	
	// ! Insert
	, "insertUser": function(postdata, fn) {

		var permissions = [];
		if(typeof postdata.permissions !== "undefined") {
			permissions = pushKey(postdata.permissions);
		}
		var disciplines = [];
		if(typeof postdata.disciplines !== "undefined") {
			disciplines = pushKey(postdata.disciplines);
		}
		var teams = [];
		if(typeof postdata.teams !== "undefined") {
			teams = pushKey(postdata.teams);
		}
		
		this.insert({
			"disciplines": disciplines
			, "email": postdata.email
			, "first_name": postdata.first_name
			, "last_name": postdata.last_name
			, "password": md5(postdata.password)
			, "permissions": permissions
			, "status": postdata.user_status
			, "teams": teams
		}, {
			"safe": true
		}, fn);
	},
	"checkLogin": function(data, fn) {
		this.findOne({
			"email": data.email
			, "password": md5(data.password)
		}, fn);
	}
});

exports.model = db.users;