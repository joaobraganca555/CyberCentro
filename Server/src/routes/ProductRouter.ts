import {NextFunction} from "express";

var express = require("express");
var router = express.Router();

const productController = require("../controllers/ProductController");

//GET ALL
router.get("", productController.getAllProducts);
router.get("/top/:date", productController.getTopProductsByQuantity);

module.exports = router;