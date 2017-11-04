//Created this file to have a place where we organize where/when we are using the different api-routes
//Could potentially call these functions using .on("click") OR call these functions as part of our routes?
//Example use - A user reserves a new book. We need to POST to reservations table and PUT to media table. The route could call the two functions that do those things

//RESERVATIONS LOGIC
function reserveMedia(mediaToReserve) {
	//ajax call to POST to reservations table
}

function updateMediaTable() {
	//ajax call to PUT to media table
}

// //aka Fulfill Reservation
// function checkOutReservedMedia(reservedMedia) {
// 	//ajax call to GET all reserved media under the userId
// 	//.then
// 	//select and store a reserved media from the returned data (dropdown?)
// 	//.then
// 	//ajax call to DELETE the selected media from reservations table
// 	//.then
// 	//ajax call to POST the selected media to CheckOutHistoryTable
// 	//.then
// 	//ajax call to UPDATE the media table number columns
// 	//.then
// 	//display message to user
// }
