import {NextFunction} from "express";

var express = require("express");
var router = express.Router();

const invoiceController = require("../controllers/InvoiceController");

//GET ALL
router.get("", invoiceController.getAllInvoices);
router.get("/totalGross", invoiceController.getTotalGross);
router.post("/totalGrossByYearAndMonth", invoiceController.getTotalGrossByYearAndMonth);

module.exports = router;