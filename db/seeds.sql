USE librarymanagementsystem;
INSERT INTO media (mediaType, genericId, totalStock, numShelved, numReserved, numCheckedOut, waitlistSize, totalNumCheckouts)
VALUES ("Harry Potter and the Philosopher's Stone","0-7475-3269-9",10,3,1,6,0,15),
("Harry Potter and the Chamber of Secrets","0-7475-3849-2",4,3,1,0,0,15),
("Harry Potter and the Prisoner of Azkaban","0-7475-4215-5",12,0,5,7,5,15),
("Harry Potter and the Goblet of Fire","0-7475-4624-X",14,3,1,10,0,15),
("Harry Potter and the Order of the Phoenix","	0-7475-5100-6",6,3,1,2,0,15),
("Harry Potter and the Half-Blood Prince","0-7475-8108-8",4,0,1,3,5,15),
("Harry Potter and the Deathly Hallows","0-545-01022-5",4,3,1,0,0,15);

INSERT INTO users (firstName, middleName, lastName, userType, phoneNumber, address, emailAddress, isEmployee)
VALUES ("Ali", "Boosted", "Arfeen", "Patron", "555-555-5555", "poop road", "aliarfeen@gmail.com", false),
("Eva", "", "Simon", "Patron", "234-555-5555", "pooper street", "evasimon@gmail.com", true),
("Imran", "Booster", "Kazmi", "Patron", "234-234-1111", "hello avenue", "imrankazmi@gmail.com", false),
("JC", "Frenchman", "Scalabre", "Patron", "000-000-0001", "Animal street", "boostedestanimal@gmail.com", false);

INSERT INTO checkouthistories (isCheckedOut, lateFees, MediumId, UserId)
VALUES (true,3.50,3,1), (true,0,6,3), (false,0,5,2), (false,10,1,4), (true,30,2,4);

INSERT INTO reservations (MediumId, UserId)
values (4,1) ,(5,2), (1,3), (1,4), (2,3), (6,1), (5,2), (1,4);

INSERT INTO saveditems (isFavorite, isInCart, MediumId, UserId)
VALUES (true,true,1,3), (false,true,4,1), (false, true, 4, 3), (true, false, 6,2);

SELECT * FROM media;
SELECT * FROM users;