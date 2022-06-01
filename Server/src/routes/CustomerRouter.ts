import {  customerInterface } from "../controllers/CustomerController";

var express = require("express");
var router = express.Router();

//GET ALL
router.get("",customerInterface.getAllCustomers);

module.exports = router;