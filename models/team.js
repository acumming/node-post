var db = require("../drivers/mongo").db;
var _u = require("underscore");

db.collection("teams").ensureIndex({
	"slug": 1
});

db.bind("teams", {
	"getAllTeams": function(fn) {
		this.find({}, {}).sort({
			name: 1
		}).toArray(fn);
	}
});

exports.model = db.teams;