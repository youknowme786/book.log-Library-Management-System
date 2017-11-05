let path = require("path");
let request = require("request");

module.exports = function getBookInfoByISBN(dataObject, results) {
  let apiKey = "AIzaSyBVaPHihkOt3MSXrw5Hf-HjJB7TrOdawlo";

  // // dataObject is an object of arrays
  // // deep clone it into a deliverable variable
  let dataDeliverable = JSON.parse(JSON.stringify(dataObject));

  // dataDeliverable.forEach(dataArray => {
  for (let item in dataDeliverable) {
    // dataArray.forEach(item => {
    for (let i = 0; i < dataDeliverable[item].length; i++) {
      if (dataDeliverable[item][i].mediaType === "book") {
        //isbn must be entered as a string
        let isbn = dataDeliverable[item][i].genericId;
        // console.log(isbn);

        let queryURL =
          "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn;
        // console.log(queryURL);

        request(queryURL, (err, res, body) => {
          if (!err && res.statusCode === 200) {
            let parsedBody = JSON.parse(body);
            // console.log(
            //   `================PARSEDBODY FOR ${isbn} BELOW======================`
            // );
            // console.log(parsedBody.items[0]);
            // console.log(
            //   `================PARSEDBODY FOR ${isbn} ABOVE======================`
            // );

            // // modify the deliverable and add relevant fields
            if (parsedBody.items[0].volumeInfo.title) {
              dataDeliverable[item][i].dataTitle =
                parsedBody.items[0].volumeInfo.title;
            }

            if (parsedBody.items[0].volumeInfo.authors) {
              dataDeliverable[item][i].dataAuthor =
                parsedBody.items[0].volumeInfo.authors[0];
            }

            if (parsedBody.items[0].volumeInfo.description) {
              dataDeliverable[item][i].dataSummary =
                parsedBody.items[0].volumeInfo.description;
            }

            if (parsedBody.items[0].volumeInfo.imageLinks) {
              dataDeliverable[item][i].dataImage =
                parsedBody.items[0].volumeInfo.imageLinks.thumbnail;
            }

            if (parsedBody.items[0].volumeInfo.industryIdentifiers) {
              dataDeliverable[item][i].dataISBN10 =
                parsedBody.items[0].volumeInfo.industryIdentifiers[0].identifier;
            }

            if (parsedBody.items[0].volumeInfo.industryIdentifiers[1]) {
              dataDeliverable[item][i].dataISBN13 =
                parsedBody.items[0].volumeInfo.industryIdentifiers[1].identifier;
            }
          }
        });
      }
    }
  }

  console.log("==================");
  console.log(dataDeliverable);
  setTimeout(() => {
    // results.json(dataDeliverable);
    res.render("index", dataDeliverable)
  }, 1000);
  // console.log(dataDeliverable);
  // return dataDeliverable;
};

//Example call
// getBookInfoByISBN("0747532699");

// // dataArray is an array of objects
// // deep clone it into a deliverable variable
// var dataDeliverable = JSON.parse(JSON.stringify(dataArray));

// // modify the deliverable and add relevant fields

// dataDeliverable.forEach(item => {
//     if (item.mediaType === "book") {
//         // call google books API here
//         console.log(item.genericId);

//         // // fill in these fields from API
//         // item.author = //author from API
//         // item.summary = //summary from API
//         // item.image = //image link from API

//         item.bookInfo = getBookInfoByISBN(item.genericId);

//         item.test = "test";
//     }
// });

// return dataDeliverable;
