var express = require("express");
var router = express.Router();

const authController = require("../controllers/AuthController");

// POST Login
router.post('/login', authController.loginHandler); 

// POST Register
router.post('/register', authController.registerHandler);

module.exports = router;