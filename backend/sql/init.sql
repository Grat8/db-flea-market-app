-- Active: 1760138508635@@127.0.0.1@5432
CREATE TABLE Vendor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL DEFAULT '',
    email VARCHAR(100) NOT NULL DEFAULT '',
    description VARCHAR(500) NOT NULL DEFAULT '',
    owner VARCHAR(100) NOT NULL DEFAULT '',
    logo BLOB
);

CREATE TABLE Product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(500) NOT NULL DEFAULT '',
    count DECIMAL(10, 2),
    price DECIMAL(10, 2) NOT NULL,
    image BLOB,
    vid INT NOT NULL,
    FOREIGN KEY (vid) REFERENCES Vendor(id) ON DELETE CASCADE
);

CREATE TABLE Sale (
    id INT AUTO_INCREMENT PRIMARY KEY,
    discount DECIMAL(10, 2) NOT NULL,
    date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE SaleItem (
    pid INT NOT NULL,
    sid INT NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (sid) REFERENCES Sale(id) ON DELETE CASCADE,
    FOREIGN KEY (pid) REFERENCES Product(id) ON DELETE CASCADE,
    PRIMARY KEY (sid, pid)
);

CREATE TABLE Booth (
    id INT AUTO_INCREMENT PRIMARY KEY,
    xcor DECIMAL(10, 2) NOT NULL,
    ycor DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Reservation (
    vid INT NOT NULL,
    bid INT NOT NULL,
    date DATETIME NOT NULL,
    duration INT NOT NULL,
    FOREIGN KEY (bid) REFERENCES Booth(id) ON DELETE CASCADE,
    FOREIGN KEY (vid) REFERENCES Vendor(id) ON DELETE CASCADE,
    PRIMARY KEY (vid, bid)
);

INSERT INTO Vendor (id, name, phone, description, owner) VALUES
(1, 'Fresh Farms', '123-456-7890', 'We sell fresh fruits and vegetables.', 'Alice Johnson'),
(2, 'Tech Gadgets', '987-654-3210', 'Latest technology gadgets and accessories.', 'Bob Smith'),
(3, 'Book Haven', '555-123-4567', 'A wide selection of books and novels.', 'Cathy Lee'),
(4, 'Clothing Corner', '444-555-6666', 'Trendy clothing for all ages.', 'David Kim');

INSERT INTO Product (id, name, description, count, price, vid) VALUES
(1, 'Apple', 'Fresh red apples.', 100.00, 1.50, 1),
(2, 'Banana', 'Organic bananas.', 150.00, 1.30, 1),
(3, 'Smartphone', 'Latest model smartphone.', 50.00, 699.99, 2),
(4, 'Headphones', 'Noise-cancelling headphones.', 75.00, 129.99, 2),
(5, 'Novel A', 'Bestselling novel.', 20.00, 19.99, 3),
(6, 'Science Fiction Book', 'Exciting science fiction story.', 12.00, 14.99, 3),
(7, 'T-Shirt', 'Comfortable cotton t-shirt.', 20.00, 7.99, 4),
(8, 'Jeans', 'Stylish denim jeans.', 15, 29.99, 4),
(9, 'Jacket', 'Warm winter jacket.', 13.00, 49.99, 4),
(10, 'Sneakers', 'Comfortable running sneakers.', 9.00, 49.99, 4);

INSERT INTO Sale (id, discount) VALUES
(1, 2.00),
(2, 15.00),
(3, 5.00),
(4, 10.00),
(5, 7.50),
(6, 20.00),
(7, 3.00),
(8, 12.00),
(9, 8.00);

INSERT INTO SaleItem (pid, sid, quantity) VALUES
(1, 1, 4.00),
(2, 1, 8.00),
(3, 2, 1.00),
(4, 2, 1.00),
(5, 3, 2.00),
(6, 3, 1.00),
(7, 4, 3.00),
(8, 4, 2.00),
(9, 5, 1.00),
(10, 5, 1.00),
(1, 6, 10.00),
(2, 6, 5.00),
(3, 7, 2.00),
(4, 7, 1.00),
(5, 8, 4.00),
(6, 8, 2.00),
(7, 9, 3.00),
(8, 9, 2.00),
(9, 9, 1.00),
(10, 9, 1.00);

INSERT INTO Booth (id, xcor, ycor) VALUES
(1, 10.00, 20.00),
(2, 15.00, 25.00),
(3, 20.00, 30.00);

INSERT INTO Reservation (vid, bid, date, duration) VALUES
(1, 1, '2024-07-01 09:00:00', 4),
(2, 2, '2024-07-01 10:00:00', 6),
(3, 3, '2024-07-02 11:00:00', 5),
(4, 1, '2024-07-03 12:00:00', 3),
(1, 2, '2024-07-04 13:00:00', 2),
(2, 3, '2024-07-05 14:00:00', 4),
(3, 1, '2024-07-06 15:00:00', 6);