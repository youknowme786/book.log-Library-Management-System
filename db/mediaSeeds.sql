SELECT * FROM librarymanagementsystem.media;

USE librarymanagementsystem;

INSERT INTO media (mediaType, genericId, totalStock, numShelved, numReserved, numCheckedOut, waitlistSize, totalNumCheckouts)
VALUES ("Book","0-545-01022-5",4,3,1,0,0,15), ("Book","0-545-01022-5",4,3,1,0,0,15), ("Book","0-545-01022-5",4,3,1,0,0,15), ("Book","0-545-01022-5",4,3,1,0,0,15), ("Book","0-545-01022-5",4,3,1,0,0,15), ("Book","0-545-01022-5",4,3,1,0,0,15), ("Book","0-545-01022-5",4,3,1,0,0,15);

SELECT * FROM media;