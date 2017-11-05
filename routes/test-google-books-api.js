let request = require("request");

module.exports = function getBookInfoByISBN(dataObject, response) {
  // storing multiple api keys here in case one gets rate limited for the day
  let apiKey = "AIzaSyDHgOaKEpv8i56Zj-PqAnsEvrvs0xpM-jo"; // ali's api key
  // let apiKey = "AIzaSyBVaPHihkOt3MSXrw5Hf-HjJB7TrOdawlo"; // eva's api key

  // // dataObject is an object of arrays
  // // deep clone it into a deliverable variable
  let dataDeliverable = JSON.parse(JSON.stringify(dataObject));
  let counter = 0;
  let target = 20;
  // dataDeliverable.forEach(dataArray => {
  for (let item in dataDeliverable) {
    // dataArray.forEach(item => {
    for (let i = 0; i < dataDeliverable[item].length; i++) {
      if (dataDeliverable[item][i].mediaType === "book") {
        //isbn must be entered as a string
        let isbn = dataDeliverable[item][i].industryIdentifier;
        // console.log(isbn);

        let queryURL =
          "https://www.googleapis.com/books/v1/volumes?q=isbn:" +
          isbn +
          "&key=" +
          apiKey;
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
            } else {
              dataDeliverable.dataImage = "/assets/img/placeholder.gif";
            }

            if (parsedBody.items[0].volumeInfo.industryIdentifiers[0]) {
              dataDeliverable[
                "data" +
                  parsedBody.items[0].volumeInfo.industryIdentifiers[0].type
              ] =
                parsedBody.items[0].volumeInfo.industryIdentifiers[0].identifier;
            }

            if (parsedBody.items[0].volumeInfo.industryIdentifiers[1]) {
              dataDeliverable[
                "data" +
                  parsedBody.items[0].volumeInfo.industryIdentifiers[1].type
              ] =
                parsedBody.items[0].volumeInfo.industryIdentifiers[1].identifier;
            }

            counter++;
            if (counter === target) {
              console.log("==================");
              console.log(dataDeliverable);
              response.json(dataDeliverable);
              // response.render("index", dataDeliverable);
            }
          }
        });
      }
    }
  }
};
