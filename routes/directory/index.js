exports.directory = function(req, res) {
	res.render("directory/index", {
		disciplines: req.disciplines
	});
};