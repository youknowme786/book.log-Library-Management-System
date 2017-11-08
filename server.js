var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var app = express();
var db = require("./models");

// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));

// override with POST having ?_method=POST
app.use(methodOverride("_method"));

// initiate handlebars with default layout
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// establish routes for database access
require("./controllers/checkout-controller.js")(app);
require("./controllers/employee-controller.js")(app);
require("./controllers/favorite-controller.js")(app);
require("./controllers/index-controller.js")(app);
require("./controllers/media-controller.js")(app);
require("./controllers/reservation-controller.js")(app);
require("./controllers/user-controller.js")(app);
require("./controllers/search-controller.js")(app);

var port = process.env.PORT || 3000;
// connect to database, sync with database, then listen on port 3000

db.sequelize.sync().then(() => {
	app.listen(port, () => {
		console.log(`Listening on port ${port}`);
	});
});
