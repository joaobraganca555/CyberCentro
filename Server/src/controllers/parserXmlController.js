const parserXML = {};

const fs = require("fs").promises;
const util = require("util");
const xml2js = require("xml2js");

const parser = new xml2js.Parser();

//Database Operations
const insertCustomers = async (listCustomers) => {
  //console.log(JSON.stringify(listCustomers));
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

const insertBillingAddresses = async () => {};

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
  const dataToJson = await importFile("public/saft_tp.xml");
  await insertCustomers(dataToJson.AuditFile.MasterFiles[0].Customer);
  await insertSuppliers(dataToJson.AuditFile.MasterFiles[0].Supplier);
  await insertProducts(dataToJson.AuditFile.MasterFiles[0].Product);
  await insertInvoices(dataToJson.AuditFile.SourceDocuments[0].SalesInvoices);
};

module.exports = parserXML;
