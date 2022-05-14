require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

//Packages
app.use(cors());
app.use(express.json());
app.use(express.static('./public'));

//Routers
const productRouter = require('./routes/productRoutes');

app.use('/api/v1/product',productRouter);

//Start Server
const port = 3000
app.listen(port, () =>
    console.log(`Server is listening on port ${port}...`)
);
  
