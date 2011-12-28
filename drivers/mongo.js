var db_config = require("../config/db").config;
var mongodb = require("mongoskin");

exports.db = mongodb.db(db_config.db_host + ":" + db_config.db_port + "/" + db_config.db_name);