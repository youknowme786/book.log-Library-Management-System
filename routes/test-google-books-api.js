module.exports = function getBookInfoByISBN(arrayOfDataArrays, res) {
  var request = require("request");
  var apiKey = "AIzaSyBVaPHihkOt3MSXrw5Hf-HjJB7TrOdawlo";

  // // dataArray is an array of objects
  // // deep clone it into a deliverable variable
  var dataDeliverable = JSON.parse(JSON.stringify(arrayOfDataArrays));

  dataDeliverable.forEach(dataArray => {
    dataArray.forEach(item => {
      if (item.mediaType === "book") {
        //isbn must be entered as a string
        var isbn = item.genericId;
        console.log(isbn);

        var queryURL =
          "https://www.googleapis.com/books/v1/volumes?q=isbn:" +
          isbn +
          "&key=" +
          apiKey;
        console.log(queryURL);

        request(queryURL, (err, res, body) => {
          if (!err && res.statusCode === 200) {
            var parsedBody = JSON.parse(body);
            console.log(
              `================PARSEDBODY FOR ${isbn} BELOW======================`
            );
            console.log(parsedBody.items[0]);
            console.log(
              `================PARSEDBODY FOR ${isbn} ABOVE======================`
            );

            // // modify 
the deliverable and add relevant fields
            if (parsedBody.items[0].volumeInfo.title) {
              item.dataTitle = parsedBody.items[0].volumeInfo.title;
            }

            // if (parsedBody.items[0].volumeInfo.authors) {
            //   item.dataAuthor = parsedBody.items[0].volumeInfo.authors[0];
            // }

            // if (parsedBody.items[0].volumeInfo.description) {
            //   item.dataSummary = parsedBody.items[0].volumeInfo.description;
            // }

            // if (parsedBody.items[0].volumeInfo.imageLinks) {
            //   item.dataImage =
            //     parsedBody.items[0].volumeInfo.imageLinks.thumbnail;
            // }

            // if (parsedBody.items[0].volumeInfo.industryIdentifiers) {
            //   item.dataGenericId =
            //     parsedBody.items[0].volumeInfo.industryIdentifiers[0].identifier;
            // }

            // if (parsedBody.items[0].volumeInfo.industryIdentifiers[1]) {
            //   item.dataISBN13 =
            //     parsedBody.items[0].volumeInfo.industryIdentifiers[1].identifier;
            // }
          }
        });
      }
    });
  });

  console.log(dataDeliverable);
  return dataDeliverable;
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
