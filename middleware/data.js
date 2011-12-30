var disciplineModel = require("../models/discipline").model;

exports.getDisciplines = function() {
	return function(req, res, next) {
		disciplineModel.getAllDisciplines(function(err, documents) {
			req.disciplines = documents;
			next();
		});
	}
}