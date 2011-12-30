var
	// Middleware
	data = require("./middleware/data")
	, permissions = require("./middleware/permissions")
;

module.exports = function(app) {
	// ! Post / top-level routing
	
	app.all(
		"/"
		, permissions.checkLogin()
		, data.getDisciplines()
		, function(req, res, next) { next(); }
	);
	
	
	app.post(
		"/"
		, permissions.checkLoginAndPermission("post")
		, function(req, res, next) { next(); }
	);
	
	// Update route
	app.put(
		"/"
		, permissions.checkLoginAndPermission("post")
		, function(req, res, next) { next(); }
	);
	
	// DELETE route
	app.del(
		"/"
		, permissions.checkLoginAndPermission("post")
		, function(req, res, next) { next(); }
	);
	
	app.resource(require("./routes/post/post"));
	
	// ! Auth routing
	
	app.get('/login', require("./routes/auth/index").login_page);
	app.post('/login', require("./routes/auth/index").login);
	
	app.get('/logout', require("./routes/auth/index").logout);
	
	app.get(
		'/register'
		, permissions.checkLoginAndPermission("register_users")
		, require("./routes/auth/register").registration_page
	);
	app.post(
		'/register'
		, permissions.checkLoginAndPermission("register_users")
		, require("./routes/auth/register").register
	);
	
	// Staff routing
	app.get(
		"/staff"
		, permissions.checkLoginAndPermission("view_staff")
		, data.getDisciplines()
		, function(req, res, next) { next(); }
	);
	
	app.resource("staff", require("./routes/staff/staff"));

};