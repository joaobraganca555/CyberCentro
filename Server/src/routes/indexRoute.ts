var express = require("express");
var parserRoute = require("./parserRoute");
var invoiceRouter = require("./invoiceRouter");
var productRouter = require("./productRouter");
var customerRouter = require("./customerRouter");
var router = express.Router();

//Map all route files here.
router.use("/parser", parserRoute);
router.use("/invoice", invoiceRouter);
router.use("/product", productRouter);
router.use("/customer", customerRouter);

module.exports = router;
