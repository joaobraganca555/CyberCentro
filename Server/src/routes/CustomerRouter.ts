import {NextFunction} from "express";

var express = require("express");
var router = express.Router();

const customerController = require("../controllers/CustomerController");

//GET ALL
router.get("", customerController.getAllCustomers);

module.exports = router;