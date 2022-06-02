var express = require("express");
var router = express.Router();
import { supplierInterface } from '../controllers/SupplierController'

router.get("/importCSV", supplierInterface.importCSV);

module.exports = router;