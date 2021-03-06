
/**
 * Module dependencies.
 */

var config = require("./config/app").config
	, db = require("./drivers/mongo")
	, db_config = require("./config/db").config
	, express = require('express')
	, expressValidator = require('express-validator')
	, MongoStore = require("connect-mongo")
	, Resource = require("express-resource")
;

var app = module.exports = express.createServer();

// ! Configuration

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.set('view options', {
//		"pretty": true
	});
	app.use(express.bodyParser());
	app.use(expressValidator);
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.session({
		secret: config.salt
		, maxAge : new Date(Date.now() + 7200000) // 2 Hours
		, store: new MongoStore({
			"db": db_config.db_name
			, "host": db_config.db_host
			, "port": db_config.db_port
		})
	}));
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

// ! Environments
app.configure('development', function(){
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});

// ! Static helpers
app.helpers({
	
});


// ! Dynamic helpers
app.dynamicHelpers({
	session: function(req, res){
		return req.session;
	},
	flash: function(req, res){
		return req.flash();
	}
});

// ! Routes
require('./routes')(app);

// ! Start application
app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
