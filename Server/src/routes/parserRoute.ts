var express = require("express");
var router = express.Router();

const parserXML = require("../controllers/parserXmlController");

router.get("/import", parserXML.importFile);

module.exports = router;
