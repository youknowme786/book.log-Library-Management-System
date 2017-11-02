USE librarymanagementsystem;
INSERT INTO media (mediaType, genericId, totalStock, numShelved, numReserved, numCheckedOut, waitlistSize, totalNumCheckouts)
VALUES ("Book",	"0-545-01022-5",4,3,1,0,0,15);

INSERT INTO users (firstName, middleName, lastName, userType, phoneNumber, address, emailAddress, isEmployee)
VALUES ("Ali", "Boosted", "Arfeen", "Patron", "555-555-5555", "poop road", "aliarfeen@gmail.com", false),
("Eva", "", "Simon", "Patron", "234-555-5555", "pooper street", "evasimon@gmail.com", true),
("Imran", "Booster", "Kazmi", "Patron", "234-234-1111", "hello avenue", "imrankazmi@gmail.com", false),
("JC", "Frenchman", "Scalabre", "Patron", "000-000-0001", "Animal street", "boostedestanimal@gmail.com", false);

SELECT * FROM media;
SELECT * FROM users;