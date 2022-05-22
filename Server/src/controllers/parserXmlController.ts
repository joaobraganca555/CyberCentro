import { AppDataSource } from "../data-source";
import { BillingAddress } from "../entity/BillingAddress";
import { Customer } from "../entity/Customer";

const parserXML: any = {};

const fs = require("fs").promises;
const xml2js = require("xml2js");
const parser = new xml2js.Parser();

//Database Operations
const insertCustomers = async (listCustomers) => {
  listCustomers.forEach(async (customer: any) => {
    const billingAddress = new BillingAddress();
    billingAddress.city = customer.BillingAddress[0].City ?? "NOT_DEFINED";
    billingAddress.country =
      customer.BillingAddress[0].Country ?? "NOT_DEFINED";
    billingAddress.postalCode =
      customer.BillingAddress[0].PostalCode ?? "NOT_DEFINED";
    billingAddress.addressDetail =
      customer.BillingAddress[0].AddressDetail ?? "NOT_DEFINED";

    await AppDataSource.manager.save(billingAddress);

    const newCustomer = new Customer();
    newCustomer.customerID = customer.CustomerID ?? "NOT_DEFINED";
    newCustomer.companyName = customer.CompanyName ?? "NOT_DEFINED";
    newCustomer.customerTaxID = customer.CustomerTaxID ?? "NOT_DEFINED";

    newCustomer.telephone = customer.Telephone ?? "NOT_DEFINED";
    newCustomer.billingAddress = billingAddress;
    await AppDataSource.manager.save(newCustomer);
  });
};

const insertSuppliers = async (listSuppliers) => {
  //console.log(JSON.stringify(listSuppliers));
};

const insertInvoices = async (listInvoices) => {
  //console.log(JSON.stringify(listInvoices));
};

const insertProducts = async (listProducts) => {
  //console.log(JSON.stringify(listProducts));
};

//Read Saft File
const readXMLFile = async (filePath) => {
  const data = await fs.readFile(filePath);
  return data;
};

//Parse XML File to Json using xml2js lib -> Ex: "public/example.xml"
const importFile = async (pathFile) => {
  const data = await readXMLFile(pathFile);

  return new Promise((resolve) => {
    parser.parseString(data, (err, result) => {
      resolve(result);
    });
  });
};

parserXML.importFile = async function (req, res) {
  const dataToJson: any = await importFile("public/saft_tp.xml");
  await insertCustomers(dataToJson.AuditFile.MasterFiles[0].Customer);
  await insertSuppliers(dataToJson.AuditFile.MasterFiles[0].Supplier);
  await insertProducts(dataToJson.AuditFile.MasterFiles[0].Product);
  await insertInvoices(dataToJson.AuditFile.SourceDocuments[0].SalesInvoices);
};

module.exports = parserXML;
