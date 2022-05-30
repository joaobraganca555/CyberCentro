import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import {invoiceInterface} from "./InvoiceController";
import {Invoice} from "../entity/Invoice";

export const productInterface: any = {};

const productRepository = AppDataSource.getRepository(Product)

productInterface.insertProduct = async (product: any) => {
  const newProduct = new Product();
  newProduct.productCode = product.ProductNumberCode ?? "NOT_DEFINED";
  newProduct.productDescription = product.ProductDescription ?? "NOT_DEFINED";
  newProduct.productType = product.ProductType ?? "NOT_DEFINED";
  newProduct.productGroup = product.ProductGroup ?? "NOT_DEFINED";

  await AppDataSource.manager.save(newProduct);
};

productInterface.findProduct = async (productID: string) => {
  const product = await AppDataSource.manager.findOneByOrFail(Product, {
    productCode: productID,
  });
  return product;
};

productInterface.getAllProducts = async function (req, res) {
  return res.json(await productRepository.find());
};

module.exports = productInterface;
