// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");
var getBookInfoByISBN = require("./google-books-api.js");

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

    //curl -i -H "Content-Type: application/json" -X GET http://localhost:3000/popular
    app.get("/popular", (req, res) => {
        db.Medium
            .findAll({
                limit: 10,
                order: [["totalNumCheckouts", "DESC"]]
            })
            .then(data => {
                // data is an array of objects
                // deep clone it into a deliverable variable
                var dataDeliverable = JSON.parse(JSON.stringify(data));

                // // modify the deliverable and add relevant fields

                dataDeliverable.forEach(item => {
                    if (item.mediaType === "book") {
                        //         // call google books API here
                        //         console.log(item.genericId);

                        //         // // fill in these fields from API
                        //         // item.author = //author from API
                        //         // item.summary = //summary from API
                        //         // item.image = //image link from API

                        //         item.bookInfo = getBookInfoByISBN(item.genericId);

                        item.test = "popular test";
                    }
                });

                return dataDeliverable;

                // res.json(dataDeliverable);
            })
            .then(dataDeliverable => {
                res.json(dataDeliverable);
            });
    });

    app.get("/new", (req, res) => {
        db.Medium
            .findAll({
                limit: 10,
                order: [["createdAt", "DESC"]]
            })
            .then(data => {
                // data is an array of objects
                // deep clone it into a deliverable variable
                var dataDeliverable = JSON.parse(JSON.stringify(data));

                // modify the deliverable and add relevant fields
                dataDeliverable.forEach(item => {
                    if (item.mediaType === "book") {
                        // call google books API here
                        console.log(item.genericId);

                        // // fill in these fields from API
                        // item.author = //author from API
                        // item.summary = //summary from API
                        // item.image = //image link from API
                        item.test = "new test";
                    }
                });

                res.json(dataDeliverable);
            });
    });
};
