const parserXML = {};

const fs = require("fs").promises;
const util = require("util");
const xml2js = require("xml2js");

const parser = new xml2js.Parser();

parserXML.importFile = async function (req, res) {
  const data = await fs.readFile("public/teste.xml");

  parser.parseString(data, (err, result) => {
    console.log(JSON.stringify(result));
    res.status(200).json(result);
  });
};

module.exports = parserXML;
