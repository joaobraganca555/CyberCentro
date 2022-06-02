const csv = require("csvtojson");
import { AppDataSource } from "../data-source";
import { BillingAddress } from "../entity/BillingAddress";
import { Purchase } from "../entity/Purchase";
import { Supplier } from "../entity/Supplier";
import { ErrorHandler } from "../utils/ErrorHandler";

export const supplierInterface: any = {};

const supplierRepository = AppDataSource.getRepository(Supplier)

supplierInterface.insertSupplier = async (supplier: any) => {
  const billingAddress = new BillingAddress();
  billingAddress.city = supplier.BillingAddress[0].City ?? "NOT_DEFINED";
  billingAddress.country = supplier.BillingAddress[0].Country ?? "NOT_DEFINED";
  billingAddress.postalCode =
    supplier.BillingAddress[0].PostalCode ?? "NOT_DEFINED";
  billingAddress.addressDetail =
    supplier.BillingAddress[0].AddressDetail ?? "NOT_DEFINED";

  await AppDataSource.manager.save(billingAddress);

  const newSupplier = new Supplier();
  newSupplier.supplierID = supplier.SupplierID ?? "NOT_DEFINED";
  newSupplier.supplierTaxID = supplier.SupplierTaxID ?? "NOT_DEFINED";
  newSupplier.companyName = supplier.CompanyName ?? "NOT_DEFINED";
  newSupplier.telephone = supplier.Telephone ?? "NOT_DEFINED";
  newSupplier.billingAddress = billingAddress;

  await AppDataSource.manager.save(newSupplier);
};

supplierInterface.importCSV = async (req, res) => {
  const csvFilePath = "public/comprasCSV.csv";

  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      jsonObj.forEach(async element => {
        const purchase = new Purchase();
        purchase.dateP = element.date;
        purchase.price = element.price;
        purchase.tax = element.tax;
        purchase.totalPrice = element.totalPrice;
        purchase.documentID = element.documentID;
        purchase.supplierCode = element.supplierCode;

        try {
          const supplier: Supplier = await AppDataSource.manager.findOneByOrFail(Supplier,{supplierID: element.supplierID});
          purchase.supplier = supplier;
        } catch (error) {
          ErrorHandler.reportError(ErrorHandler.getErrorMessage(error));
        }

        await AppDataSource.manager.save(purchase);
      });
      res.status(200);
    });
};

supplierInterface.totalSpent = async function (req, res) {
  return res.json(await supplierRepository
    .query(`SELECT sum( CAST( REPLACE(totalPrice, ' ', '') as float)) as total from purchase`))
};

supplierInterface.topSuppliers = async function (req, res) {
  res.json(await supplierRepository
    .query(`
                  SELECT * from supplier LEFT JOIN
                  (SELECT sum( CAST( REPLACE(totalPrice, ' ', '') as float)) as total, supplierId FROM supplier LEFT JOIN
                  purchase ON supplier.supplierID = purchase.supplierSupplierID
                  WHERE dateP > CAST( @0 as DATE) 
                  AND   dateP < CAST( @1 as DATE)
                  GROUP BY supplierID  ) as s ON supplier.supplierID = s.supplierId
                  ORDER BY total
                  DESC `,
        [req.params.date.toString(),(parseInt(req.params.date)+1).toString()]));
};


supplierInterface.getAllSuppliers = async function (req, res) {
  res.json(await supplierRepository
    .query(`SELECT * from supplier`))
};

