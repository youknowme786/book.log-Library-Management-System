// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");
var getBookInfoByISBN = require("./test-google-books-api.js");

// Routes
// =============================================================
module.exports = function(app) {
    //curl -i -H "Content-Type: application/json" -X GET http://localhost:3000/popular
    app.get("/popularandnew", (req, res) => {
        var dataArray = [];

        db.Medium
            .findAll({
                limit: 10,
                order: [["totalNumCheckouts", "DESC"]]
            })
            .then(data => {
                // data is an array of objects
                // deep clone it into a deliverable variable
                dataArray[0] = JSON.parse(JSON.stringify(data));

                return dataArray;
            })
            .then(dataArray => {
                db.Medium
                    .findAll({
                        limit: 10,
                        order: [["createdAt", "DESC"]]
                    })
                    .then(data => {
                        // data is an array of objects
                        // deep clone it into a deliverable variable
                        dataArray[1] = JSON.parse(JSON.stringify(data));

                        return getBookInfoByISBN(dataArray, res);
                        // res.json(dataArray);
                    })
                    .then(dataDeliverable => {
                        res.json(dataDeliverable);
                    });
            });
    });
};
