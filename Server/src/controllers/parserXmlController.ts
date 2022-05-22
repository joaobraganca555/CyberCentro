import { AppDataSource } from "../data-source";
import { BillingAddress } from "../entity/BillingAddress";
import { Customer } from "../entity/Customer";
import { customerInterface } from "./CustomerController"
import { supplierInterface } from "./SupplierController";


const parserXML: any = {};

const fs = require("fs").promises;
const xml2js = require("xml2js");
const parser = new xml2js.Parser();

//Handle with errors
function getErrorMessage(error: unknown) {
  let today = new Date();
  if (error instanceof Error)
    return today.toDateString() + ":" + error.message + "\n";
  else return today.toDateString() + ":" + String(error) + "\n";
}

//Logging the errors
const reportError = async (message: string) => {
  await fs.appendFile("public/logs.txt", message);
};

//Database Operations
const insertCustomers = async (listCustomers) => {
  listCustomers.forEach(async (customer: any) => {
    try {
      await customerInterface.insertCustomer(customer);
    } catch (error) {
      reportError(getErrorMessage(error));
    }
  });
};

const insertSuppliers = async (listSuppliers) => {
  listSuppliers.forEach(async (supplier: any) => {
    try {
      await supplierInterface.insertSupplier(supplier);
    } catch (error) {
      reportError(getErrorMessage(error));
    }
  });
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
  //await insertCustomers(dataToJson.AuditFile.MasterFiles[0].Customer);
  //await insertSuppliers(dataToJson.AuditFile.MasterFiles[0].Supplier);
  await insertProducts(dataToJson.AuditFile.MasterFiles[0].Product);
  //await insertInvoices(dataToJson.AuditFile.SourceDocuments[0].SalesInvoices);
};

module.exports = parserXML;
