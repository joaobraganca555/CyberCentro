IF EXISTS (SELECT name FROM sys.databases WHERE name = N'BD_CyberCentro')
ALTER DATABASE BD_CyberCentro SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
GO

DROP DATABASE IF EXISTS BD_CyberCentro
GO

CREATE DATABASE BD_CyberCentro;
GO

USE BD_CyberCentro
GO


CREATE TABLE Address (
    AddressID INT IDENTITY(1,1) PRIMARY KEY,
    StreetName VARCHAR(200),
    City VARCHAR(50),
    PostalCode VARCHAR(20),
    Region VARCHAR(50),
    Country VARCHAR(12)
);

CREATE TABLE Customer (
    CustomerID VARCHAR(30) NOT NULL PRIMARY KEY,
    CustomerTaxID VARCHAR(30) NOT NULL,
    CompanyName VARCHAR(100),
    BillingAdress INT FOREIGN KEY REFERENCES Address(AddressID),
    Telephone VARCHAR(20),
    Email VARCHAR(254)
);

CREATE TABLE Supplier (
    SupplierID VARCHAR(30) NOT NULL PRIMARY KEY,
    SupplierTaxID VARCHAR(30),
    CompanyName VARCHAR(100),
    BillingAdress INT FOREIGN KEY REFERENCES Address(AddressID),
    Telephone VARCHAR(20),
    Email VARCHAR(254)
);

CREATE TABLE Product (
    ProductCode VARCHAR(60) NOT NULL PRIMARY KEY,
    ProductType VARCHAR(1),
    ProductGroup VARCHAR(50),
    ProductDescription VARCHAR(200)
);

CREATE TABLE Invoice (
    InvoiceNo VARCHAR(60) NOT NULL PRIMARY KEY,
    InvoiceStatus VARCHAR(1),
    InvoiceDate DATE,
    InvoiceType VARCHAR(2),
    CustomerID VARCHAR(30),
    GrossTotal MONEY,
    PaymentMechanism VARCHAR(2),
    PaymentDate DATE
);

CREATE TABLE LineNumber (
    LineNumber INT NOT NULL PRIMARY KEY,
    OriginatingON VARCHAR(60) FOREIGN KEY REFERENCES Invoice(InvoiceNo),
    ProductCode VARCHAR(60) FOREIGN KEY REFERENCES Product(ProductCode),
    Quantity DECIMAL,
    UnitOfMeasure VARCHAR(20),
    UnitPrice MONEY,
    TaxBase MONEY
);