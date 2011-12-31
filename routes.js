var
	// Middleware
	data = require("./middleware/data")
	, permissions = require("./middleware/permissions")
;

module.exports = function(app) {

	// ! Auth routing
	// Must come before the top-level resource route call.
	
	app.get('/login', require("./routes/auth/index").login_page);
	app.post('/login', require("./routes/auth/index").login);
	
	app.get('/logout', require("./routes/auth/index").logout);
	
	app.get(
		'/register'
		, permissions.checkLoginAndPermission("register_users")
		, data.getDisciplines()
		, data.getTeams()
		, require("./routes/auth/register").registration_page
	);
	app.post(
		'/register'
		, permissions.checkLoginAndPermission("register_users")
		, require("./routes/auth/register").register
	);
	
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
	
	// Staff routing
	app.get(
		"/staff"
		, permissions.checkLoginAndPermission("view_staff")
		, data.getDisciplines()
		, function(req, res, next) { next(); }
	);
	
	app.resource("staff", require("./routes/staff/staff"));


	// ! Top-level resource routing
	// Must come last
	app.resource(require("./routes/post/post"));
};