CREATE DATABASE "SIO_CyberCentro"

CREATE TABLE "user"(
    "userID" int NOT NULL IDENTITY(1,1),
    "username" nvarchar(255) NOT NULL,
    "email" nvarchar(255) NOT NULL,
    "password" nvarchar(255) NOT NULL,
)
CREATE TABLE "billing_address"
(
    "addressId" int NOT NULL IDENTITY(1,1),
    "postalCode" nvarchar(255) NOT NULL,
    "city" nvarchar(255) NOT NULL,
    "addressDetail" nvarchar(255) NOT NULL,
    "country" nvarchar(255) NOT NULL,
    CONSTRAINT "PK_7e65c1e33d01d93afb170ad6887" PRIMARY KEY ("addressId")
)
CREATE TABLE "product"
(
    "productCode" nvarchar(255) NOT NULL,
    "productType" nvarchar(255) NOT NULL,
    "productGroup" nvarchar(255) NOT NULL,
    "productDescription" nvarchar(255) NOT NULL,
    CONSTRAINT "PK_a3aead4d2b7d774d4b7e6a6c7b2" PRIMARY KEY ("productCode")
)
CREATE TABLE "invoice_line"
(
    "lineNumber" int NOT NULL IDENTITY(1,1),
    "quantity" nvarchar(255) NOT NULL,
    "unitOfMeasure" nvarchar(255) NOT NULL,
    "unitPrice" nvarchar(255) NOT NULL,
    "taxBase" nvarchar(255) NOT NULL,
    "productProductCode" nvarchar(255),
    "invoiceInvoiceNo" nvarchar(255),
    CONSTRAINT "PK_6a8a2d3dc0b2e18e064a628ecb0" PRIMARY KEY ("lineNumber")
)
CREATE TABLE "invoice"
(
    "invoiceNo" nvarchar(255) NOT NULL,
    "invoiceStatus" nvarchar(255) NOT NULL,
    "invoiceDate" nvarchar(255) NOT NULL,
    "invoiceType" nvarchar(255) NOT NULL,
    "grossTotal" nvarchar(255) NOT NULL,
    "paymentMechanism" nvarchar(255) NOT NULL,
    "paymentDate" nvarchar(255) NOT NULL,
    "customerCustomerID" nvarchar(255),
    CONSTRAINT "PK_7a07716f2519432623c404ee94b" PRIMARY KEY ("invoiceNo")
)
CREATE TABLE "customer"
(
    "customerID" nvarchar(255) NOT NULL,
    "customerTaxID" nvarchar(255) NOT NULL,
    "companyName" nvarchar(255) NOT NULL,
    "telephone" nvarchar(255) NOT NULL,
    "billingAddressAddressId" int,
    CONSTRAINT "PK_e9918cbed042a3575e31d3e7332" PRIMARY KEY ("customerID")
)
CREATE UNIQUE INDEX "REL_1c208fb17867d77030075deea1" ON "customer" ("billingAddressAddressId") WHERE "billingAddressAddressId" IS NOT NULL
CREATE TABLE "supplier"
(
    "supplierID" nvarchar(255) NOT NULL,
    "supplierTaxID" nvarchar(255) NOT NULL,
    "companyName" nvarchar(255) NOT NULL,
    "telephone" nvarchar(255) NOT NULL,
    "billingAddressAddressId" int,
    CONSTRAINT "PK_567813a6fd1a07d8bd40be2a23b" PRIMARY KEY ("supplierID")
)
CREATE UNIQUE INDEX "REL_16eb9bacc7c6b1125d9e3c62e7" ON "supplier" ("billingAddressAddressId") WHERE "billingAddressAddressId" IS NOT NULL
ALTER TABLE "invoice_line" ADD CONSTRAINT "FK_202eaebd8e07159107a8ef8cfe8" FOREIGN KEY ("productProductCode") REFERENCES "product"("productCode") ON DELETE NO ACTION ON UPDATE NO ACTION
ALTER TABLE "invoice_line" ADD CONSTRAINT "FK_3e1c5f93120b50c883d5771dd0f" FOREIGN KEY ("invoiceInvoiceNo") REFERENCES "invoice"("invoiceNo") ON DELETE NO ACTION ON UPDATE NO ACTION
ALTER TABLE "invoice" ADD CONSTRAINT "FK_ca71bae71e994da85c6bf9062f6" FOREIGN KEY ("customerCustomerID") REFERENCES "customer"("customerID") ON DELETE NO ACTION ON UPDATE NO ACTION
ALTER TABLE "customer" ADD CONSTRAINT "FK_1c208fb17867d77030075deea1d" FOREIGN KEY ("billingAddressAddressId") REFERENCES "billing_address"("addressId") ON DELETE NO ACTION ON UPDATE NO ACTION
ALTER TABLE "supplier" ADD CONSTRAINT "FK_16eb9bacc7c6b1125d9e3c62e72" FOREIGN KEY ("billingAddressAddressId") REFERENCES "billing_address"("addressId") ON DELETE NO ACTION ON UPDATE NO ACTION
