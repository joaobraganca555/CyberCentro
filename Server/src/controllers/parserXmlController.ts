import { ErrorHandler } from "../utils/ErrorHandler";
import { customerInterface } from "./CustomerController";
import { invoiceInterface } from "./InvoiceController";
import { productInterface } from "./ProductController";
import { supplierInterface } from "./SupplierController";

const parserXML: any = {};

const fs = require("fs").promises;
const xml2js = require("xml2js");
const parser = new xml2js.Parser();

//Database Operations
const insertCustomers = async (listCustomers) => {
  listCustomers.forEach(async (customer: any) => {
    try {
      await customerInterface.insertCustomer(customer);
    } catch (error) {
      ErrorHandler.reportError(ErrorHandler.getErrorMessage(error));
    }
  });
};

const insertSuppliers = async (listSuppliers) => {
  listSuppliers.forEach(async (supplier: any) => {
    try {
      await supplierInterface.insertSupplier(supplier);
    } catch (error) {
      ErrorHandler.reportError(ErrorHandler.getErrorMessage(error));
    }
  });
};

const insertInvoices = async (listInvoices) => {
  listInvoices.forEach(async (invoice: any) => {
    try {
      await invoiceInterface.insertInvoice(invoice);
    } catch (error) {
      ErrorHandler.reportError(ErrorHandler.getErrorMessage(error));
    }
  });
};

const insertProducts = async (listProducts) => {
  listProducts.forEach(async (product: any) => {
    try {
      await productInterface.insertProduct(product);
    } catch (error) {
      ErrorHandler.reportError(ErrorHandler.getErrorMessage(error));
    }
  });
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
  await insertInvoices(dataToJson.AuditFile.SourceDocuments[0].SalesInvoices[0].Invoice);
};

module.exports = parserXML;
