//Created this file to have a place where we organize where/when we are using the different api-routes
//Could potentially call these functions using .on("click")
//Just a thought, might not be best approach

//RESERVATIONS LOGIC
function reserveMedia() {
	//ajax call to POST to reservations table
}

function removeReservation() {
	//ajax call to DELETE from reservations table
}

//aka Fulfill Reservation
function checkOutReservedMedia() {
	//ajax call to GET all reserved media under the userId
	//.then
	//select and store a reserved media from the returned data (dropdown?)
	//.then
	//ajax call to DELETE the selected media from reservations table
	//.then
	//ajax call to POST the selected media to CheckOutHistoryTable
	//.then
	//ajax call to UPDATE the media table number columns
	//.then
	//display message to user
}
