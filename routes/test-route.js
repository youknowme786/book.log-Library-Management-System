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
    //curl -i -H "Content-Type: application/json" -X GET http://localhost:3000/popular
    app.get("/popularandnew", (req, res) => {
        var dataObject = [];

        db.Medium
            .findAll({
                limit: 10,
                order: [["totalNumCheckouts", "DESC"]]
            })
            .then(data => {
                // data is an array of objects
                // deep clone it into a deliverable variable
                dataObject.push(JSON.parse(JSON.stringify(data)));

                dataObject[0].forEach(item => {
                    if (item.mediaType === "book") {
                        console.log("popular " + item.genericId);
                        item.test = "popular test";
                    }
                });

                return dataObject;
            })
            .then(dataObject => {
                db.Medium
                    .findAll({
                        limit: 10,
                        order: [["createdAt", "DESC"]]
                    })
                    .then(data => {
                        // data is an array of objects
                        // deep clone it into a deliverable variable
                        dataObject.push(JSON.parse(JSON.stringify(data)));

                        dataObject[1].forEach(item => {
                            if (item.mediaType === "book") {
                                console.log("new " + item.genericId);
                                item.test = "new test";
                            }
                        });

                        getBookInfoByISBN(dataObject);
                        // res.json(dataObject);
                    });
            });
    });
};
