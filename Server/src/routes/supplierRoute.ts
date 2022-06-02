var express = require("express");
var router = express.Router();
import { supplierInterface } from '../controllers/SupplierController'

router.get("/importCSV", supplierInterface.importCSV);
router.get("/totalSpent", supplierInterface.totalSpent);



module.exports = router;