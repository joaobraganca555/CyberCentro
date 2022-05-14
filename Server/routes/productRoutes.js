const express = require('express');
const router = express.Router();

//Call controllers later

//Routes
router.get('/',(req,res)=>{
    res.send('Cyber App Running!')
});

module.exports = router;
