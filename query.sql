
CREATE TABLE IF NOT EXISTS books (
    ISBN_Number INT,
    bookName VARCHAR(100),
    authorName TEXT,
    publishDate DATE,
    bookDescription VARCHAR(100),
    img_name TEXT,
    trade_price INT,
    retail_price INT,
    quantity INT,

    PRIMARY KEY(ISBN_Number)
);




-- INSERT INTO books(bookName, authorName, publish, ISBNnumber, bookDescription, frontCoverPicName)
--     VALUES('Don Quixote', 'Miguel de Cervantes', '1605-01-16', '9780192100320', 'book descrription', 'picture of front page');

-- INSERT INTO books(bookName, authorName, publish, ISBNnumber, bookDescription, frontCoverPicName)
--     VALUES('Lord of the Rings', 'J.R.R. Tolkien', '1955-10-20', '9780261103689', 'book descrription', 'picture of front page');

-- INSERT INTO books(bookName, authorName, publish, ISBNnumber, bookDescription, frontCoverPicName)
--     VALUES('Harry Potter and the Philosophers Stone', 'J.K. Rowling', '1997-06-26', '9780747532743', 'book descrription', 'picture of front page');

-- INSERT INTO books(bookName, authorName, publish, ISBNnumber, bookDescription, frontCoverPicName)
--     VALUES('And Then There Were None', 'Agatha Christie', '1939-11-06', '9780062073488', 'book descrription', 'picture of front page');

-- INSERT INTO books(bookName, authorName, publish, ISBNnumber, bookDescription, frontCoverPicName)
--     VALUES('Alice Adventures in Wonderland', 'Lewis Carroll', '1865-11-18', '9780312018214', 'book descrription', 'picture of front page');

-- INSERT INTO books(bookName, authorName, publish, ISBNnumber, bookDescription, frontCoverPicName)
--     VALUES('The Lion, the Witch, and the Wardrobe', 'C.S. Lewis', '1950-10-16', '9780007323128', 'book descrription', 'picture of front page');

-- INSERT INTO books(bookName, authorName, publish, ISBNnumber, bookDescription, frontCoverPicName)
--     VALUES('Pinocchio', 'Carlo Collodi', '1883-02-01', '9780141331645', 'book descrription', 'picture of front page');

-- INSERT INTO books(bookName, authorName, publish, ISBNnumber, bookDescription, frontCoverPicName)
--     VALUES('Catcher in the Rye', 'J.D. Salinger', '1951-07-16', '9780316769488', 'book descrription', 'picture of front page');

-- INSERT INTO books(bookName, authorName, publish, ISBNnumber, bookDescription, frontCoverPicName)
--     VALUES('Anne of Green Gables', 'L. M. Montgomery', '1908-06-01', '9780140324624', 'book descrription', 'picture of front page');

-- INSERT INTO books(bookName, authorName, publish, ISBNnumber, bookDescription, frontCoverPicName)
--     VALUES('The 48 Laws of Power', 'Robert Greene', '1998-01-01', '9788176493246', 'book descrription', 'picture of front page');


