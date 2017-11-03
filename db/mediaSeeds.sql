USE librarymanagementsystem;

INSERT INTO librarymanagementsystem.media (mediaType, genericId, totalStock, numShelved, numReserved, numCheckedOut, waitlistSize, totalNumCheckouts)
VALUES ("Harry Potter and the Philosopher's Stone","0-7475-3269-9",10,3,1,6,0,15),
("Harry Potter and the Chamber of Secrets","0-7475-3849-2",4,3,1,0,0,15),
("Harry Potter and the Prisoner of Azkaban","0-7475-4215-5",12,0,5,7,5,15),
("Harry Potter and the Goblet of Fire","0-7475-4624-X",14,3,1,10,0,15),
("Harry Potter and the Order of the Phoenix","	0-7475-5100-6",6,3,1,2,0,15),
("Harry Potter and the Half-Blood Prince","0-7475-8108-8",4,0,1,3,5,15),
("Harry Potter and the Deathly Hallows","0-545-01022-5",4,3,1,0,0,15);

SELECT * FROM librarymanagementsystem.media;