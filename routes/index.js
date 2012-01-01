
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('homepage', {
		disciplines: req.disciplines
		, teams: req.teams
	});
};