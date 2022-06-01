import { productInterface } from "../controllers/ProductController";

var express = require("express");
var router = express.Router();

//GET ALL
router.get("", productInterface.getAllProducts);
router.get("/top/:date", productInterface.getTopProductsByQuantity);

module.exports = router;