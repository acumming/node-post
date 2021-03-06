var db = require("../drivers/mongo").db;
var _u = require("underscore");

db.collection("disciplines").ensureIndex({
	"slug": 1
});

db.bind("disciplines", {
	"getAllDisciplines": function(fn) {
		this.find({}, {}).sort({
			name: 1
		}).toArray(fn);
	}
});

exports.model = db.disciplines;