import { AppDataSource } from "../data-source";
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
  for (let customer of listCustomers) {
    try {
      await customerInterface.insertCustomer(customer);
    } catch (error) {
      ErrorHandler.reportError(ErrorHandler.getErrorMessage(error));
    }
  }
};

const insertSuppliers = async (listSuppliers) => {
  for (let supplier of listSuppliers) {
    try {
      await supplierInterface.insertSupplier(supplier);
    } catch (error) {
      ErrorHandler.reportError(ErrorHandler.getErrorMessage(error));
    }
  }
};

const insertInvoices = async (listInvoices) => {
  for (let invoice of listInvoices) {
    try {
      await invoiceInterface.insertInvoice(invoice);
    } catch (error) {
      ErrorHandler.reportError(ErrorHandler.getErrorMessage(error));
    }
  }
};

const insertProducts = async (listProducts) => {
  for (let product of listProducts) {
    try {
      await productInterface.insertProduct(product);
    } catch (error) {
      ErrorHandler.reportError(ErrorHandler.getErrorMessage(error));
    }
  }
};

//Read Saft File
const readFile = async (filePath) => {
  const data = await fs.readFile(filePath);
  return data;
};

//Parse XML File to Json using xml2js lib -> Ex: "public/example.xml"
const importFile = async (pathFile) => {
  const data = await readFile(pathFile);

  return new Promise((resolve) => {
    parser.parseString(data, (err, result) => {
      resolve(result);
    });
  });
};

const createTablesDB = async()=>{
  const script = await readFile("public/ScriptCreateTables.sql");
  await AppDataSource.manager.query(String(script));
};

const populateDB = async (dataFromSaft: any) => {
  await insertCustomers(dataFromSaft.AuditFile.MasterFiles[0].Customer);
  await insertSuppliers(dataFromSaft.AuditFile.MasterFiles[0].Supplier);
  await insertProducts(dataFromSaft.AuditFile.MasterFiles[0].Product);
  await insertInvoices(dataFromSaft.AuditFile.SourceDocuments[0].SalesInvoices[0].Invoice);
};

parserXML.importFile = async function (req, res) {
  //***Need to have already created an instance DB running called BD_CyberCentro
  //await createTablesDB();
  const dataToJson: any = await importFile("public/saft_joao/SAFT_CYBER_01-01-2022_31-12-2022.xml");
  await populateDB(dataToJson);
  res.status(200).send({success: true});
};

module.exports = parserXML;

