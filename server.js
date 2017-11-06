var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var app = express();

// //////////////////////////////////////////////////////////////////////
// // auth0
// const passport = require("passport");
// const Auth0Strategy = require("passport-auth0");

// // Configure Passport to use Auth0
// const strategy = new Auth0Strategy(
// 	{
// 		domain: "aliarfeen.auth0.com",
// 		clientID: "ThQWvIxBJwaEWL1uaCbC00Lz1CUmuVuF",
// 		clientSecret: "YOUR_CLIENT_SECRET",
// 		callbackURL: "http://localhost:3000/callback"
// 	},
// 	(accessToken, refreshToken, extraParams, profile, done) => {
// 		return done(null, profile);
// 	}
// );

// passport.use(strategy);

// // This can be used to keep a smaller payload
// passport.serializeUser(function(user, done) {
// 	done(null, user);
// });

// passport.deserializeUser(function(user, done) {
// 	done(null, user);
// });

// // ...
// app.use(passport.initialize());
// app.use(passport.session());
// //////////////////////////////////////////////////////////////////////

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
require("./controllers/index-controller.js")(app);
require("./controllers/book-controller.js")(app);
require("./controllers/user-controller.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/media.js")(app);

var port = process.env.PORT || 3000;
// connect to database, sync with database, then listen on port 3000
db.sequelize.sync({ force: true }).then(() => {
	app.listen(port, () => {
		console.log(`Listening on port ${port}`);
	});
});
