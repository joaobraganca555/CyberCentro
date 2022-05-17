const express = require("express");
const cors = require("cors");
var xmlparser = require("express-xml-bodyparser");
const indexRouter = require("./routes/index");
require("dotenv").config(); // Using .env configs

//Packages
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("./public"));
app.use(xmlparser());

app.use("/api/v1", indexRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}...`)
);


/*
AppDataSource.initialize().then(async () => {
    console.log("Inserting a new address into the database...")
    const address = new Address()
    address.City = "Porto"
    address.Country = "Portugal"
    address.PostalCode = "4610-102"
    address.Region = "Felgueiras"
    address.StreetName = "Rua do Caralho"

    await AppDataSource.manager.save(address)
    console.log("Saved a new address with id: " + address.AddressID)

    console.log("Loading address from the database...")
    const addresss = await AppDataSource.manager.find(Address)
    console.log("Loaded address: ", addresss)
}).catch(error => console.log(error))
*/

// Start Server
