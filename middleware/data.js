var disciplineModel = require("../models/discipline").model;
var teamModel = require("../models/team").model;

exports.getDisciplines = function() {
	return function(req, res, next) {
		disciplineModel.getAllDisciplines(function(err, documents) {
			req.disciplines = documents;
			next();
		});
	}
};

exports.getTeams = function() {
	return function(req, res, next) {
		teamModel.getAllTeams(function(err, documents) {
			req.teams = documents;
			next();
		});
	}
};