module.exports = function getBookInfoByISBN(isbn) {
    var request = require("request");
    //isbn must be entered as a string
    console.log(isbn);

    var apiKey = "AIzaSyBVaPHihkOt3MSXrw5Hf-HjJB7TrOdawlo";
    var queryURL =
        "https://www.googleapis.com/books/v1/volumes?q=isbn:" +
        isbn +
        "&key=" +
        apiKey;
    console.log(queryURL);
    request(queryURL, (err, res, body) => {
        if (!err && res.statusCode === 200) {
            var parsedBody = JSON.parse(body);
            console.log(body);
            var bookInfo = [];
            // bookInfo.push({ "data-title": body.items.volumeInfo.title });

            bookInfo.push({
                "data-title": parsedBody.items[0].volumeInfo.title,
                //Set logic to create a string of multiple authors if authors.length > 1. For now, default to first listed author
                "data-author": parsedBody.items[0].volumeInfo.authors[0],
                "data-summary": parsedBody.items[0].volumeInfo.description,
                "data-image":
                    parsedBody.items[0].volumeInfo.imageLinks.thumbnail,
                "data-isbn-10":
                    parsedBody.items[0].volumeInfo.industryIdentifiers[0]
                        .identifier,
                "data-isbn-13":
                    parsedBody.items[0].volumeInfo.industryIdentifiers[1]
                        .identifier
            });

            console.log(bookInfo);

            return bookInfo;
        }
    });
};

//Example call
// getBookInfoByISBN("0747532699");
