var jwt = require('jsonwebtoken');
var config = require('../utils/Config');


const verifyToken = function (req, res, next) {
    var token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({ auth: false, message: "No token provided" });
    } else {
      jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
          return res.status(500).send({ auth: false, message: "Invalid Token" });
        }
        next();
      });
    }
};