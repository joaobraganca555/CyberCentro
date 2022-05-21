const express = require("express");
const cors = require("cors");
var xmlparser = require("express-xml-bodyparser");
const indexRouter = require("./routes/index");
require("dotenv").config(); // Using .env configs
import { AppDataSource } from "./data-source"
import { BillingAddress } from "./entity/BillingAddress";

//Packages
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("./public"));
app.use(xmlparser());

app.use("/api/v1", indexRouter);

AppDataSource.initialize()
  .then(async () => {
    console.log("Inserting a new address into the database...");
    const billing = new BillingAddress();
    billing.addressDetail = "";
    billing.city ="porto";
    billing.country ="portu";
    billing.postalCode = "4814-22";

    await AppDataSource.manager.save(billing);
    console.log("Saved a new address with id: " + billing.addressId);

    console.log("Loading address from the database...");
    const addresss = await AppDataSource.manager.find(BillingAddress);
    console.log("Loaded address: ", addresss);

    app.listen(process.env.PORT, () =>
      console.log(`Server is listening on port ${process.env.PORT}...`)
    );
  })
  .catch((error) => console.log(error));

// Start Server
