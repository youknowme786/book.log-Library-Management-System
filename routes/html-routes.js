// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // add route loads the add.html page,
  // where users can enter new characters to the db
  app.get("/book", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/book.html"));
  });

  // all route loads the all.html page,
  // where all characters in the db are displayed
  app.get("/user", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/user.html"));
  });

  app.get("/popular", (req, res) => {
    db.Medium
      .findAll({
        limit: 10,
        order: [["totalNumCheckouts", "DESC"]]
      })
      .then(data => {
        // data is an array of objects
        data.forEach(item => {
          if (item.mediaType === "book") {
            // call google books API here
            console.log(item.genericId);
          }
        });

        res.json(data);
      });
  });
};
