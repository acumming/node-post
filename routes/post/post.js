exports.index = function(req, res) {
	res.render("homepage");
}

// POST call
exports.create = function(req, res) {
	console.log("post");
	res.redirect("/");
}

exports.show = function(req, res){
  res.send('Post ID ' + req.params.id);
};

exports.edit = function(req, res){
  res.send('Edit Post ID ' + req.params.id);
};

exports.update = function(req, res){
  res.send('update forum ');
};

exports.destroy = function(req, res){
  res.send('destroy forum ');
};