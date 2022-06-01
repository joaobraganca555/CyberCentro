import { productInterface } from "../controllers/ProductController";

var express = require("express");
var router = express.Router();

//GET ALL
router.get("", productInterface.getAllProducts);
router.get("/top/:date", productInterface.getTopProductsByQuantity);
router.get("/topByTotalGross/:date", productInterface.getTopProductsByTotalGross);

module.exports = router;