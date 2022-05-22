import { AppDataSource } from "../data-source";
import { BillingAddress } from "../entity/BillingAddress";
import { Supplier } from "../entity/Supplier";

export const supplierInterface: any = {};

supplierInterface.insertSupplier = async (supplier: any) => {
  const billingAddress = new BillingAddress();
  billingAddress.city = supplier.BillingAddress[0].City ?? "NOT_DEFINED";
  billingAddress.country = supplier.BillingAddress[0].Country ?? "NOT_DEFINED";
  billingAddress.postalCode = supplier.BillingAddress[0].PostalCode ?? "NOT_DEFINED";
  billingAddress.addressDetail = supplier.BillingAddress[0].AddressDetail ?? "NOT_DEFINED";

  await AppDataSource.manager.save(billingAddress);

  const newSupplier = new Supplier();
  newSupplier.supplierID = supplier.SupplierID ?? "NOT_DEFINED";
  newSupplier.supplierTaxID = supplier.SupplierTaxID ?? "NOT_DEFINED";
  newSupplier.companyName = supplier.CompanyName ?? "NOT_DEFINED";
  newSupplier.telephone = supplier.Telephone ?? "NOT_DEFINED";
  newSupplier.billingAddress = billingAddress;

  await AppDataSource.manager.save(newSupplier);
};
