var express = require("express");
var router = express.Router();

const invoiceController = require("../controllers/InvoiceController");

//GET ALL
router.get("", invoiceController.getAllInvoices);
router.get("/totalGross", invoiceController.getTotalGross);
router.get("/zone", invoiceController.getTotalGrossByZone);
router.get("/grossByfamily", invoiceController.getGrossByFamily);

router.post("/totalGrossByYearAndMonth", invoiceController.getTotalGrossByYearAndMonth);


module.exports = router;