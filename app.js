
/**
 * Module dependencies.
 */

var config = require("./config/app").config
	, db_config = require("./config/db").config
	, express = require('express')
	, expressValidator = require('express-validator')
	, MongoStore = require("connect-mongo")
	, db = require("./drivers/mongo")
	, permissions = require("./middleware/permissions")
	, login = require("./middleware/login")
;

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.set('view options', {
		"pretty": true
	});
	app.use(express.bodyParser());
	app.use(expressValidator);
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.session({
		secret: config.salt
		, store: new MongoStore({
			"db": db_config.db_name
			, "host": db_config.db_host
			, "port": db_config.db_port
		})
	}));
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});

// Static helpers
app.helpers({
	
});


// Dynamic helpers
app.dynamicHelpers({
	session: function(req, res){
		return req.session;
	},
	flash: function(req, res){
		return req.flash();
	}
});

// Routes
// Middleware stacks


// Auth routing
app.get('/', require("./routes/index").index);

app.get('/login', require("./routes/auth/index").login_page);
app.post('/login', require("./routes/auth/index").login);

app.get('/logout', require("./routes/auth/index").logout);

app.get('/register', permissions.checkLoginAndPermission("register"), require("./routes/auth/register").registration_page);
app.post('/register', permissions.checkLoginAndPermission("register"), require("./routes/auth/register").register);

// Start application
app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
