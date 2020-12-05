DROP TABLE IF EXISTS User;
CREATE TABLE User(
    Id INT PRIMARY KEY,
    Name VARCHAR(255),
    Surname VARCHAR(255),
    Address VARCHAR(1024),
    PostalCode VARCHAR(255),
    City VARCHAR(255),
    MobilePhone VARCHAR(255),
    Mail VARCHAR(255),
    Country VARCHAR(255),
    Gender VARCHAR(255),
    Login VARCHAR(1024),
    Password VARCHAR(9999)
)