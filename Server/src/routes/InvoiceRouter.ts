var express = require("express");
var router = express.Router();

import {  invoiceInterface } from "../controllers/InvoiceController";

router.get("", invoiceInterface.getAllInvoices);
router.get("/totalGross", invoiceInterface.getTotalGross);
router.get("/getGrossByZoneByDate/:date", invoiceInterface.getTotalGrossByZone);
router.get("/getGrossByFamilyByDate/:date", invoiceInterface.getGrossByFamilyByDate);
router.get("/totalGrossByYearAndMonth/:date", invoiceInterface.getTotalGrossByYearAndMonth);

module.exports = router;