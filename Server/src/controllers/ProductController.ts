import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";

export const productInterface:any = {}

productInterface.insertProduct = async function(product: any){
    const newProduct = new Product();
    newProduct.productCode = product.ProductNumberCode ?? "NOT_DEFINED";
    newProduct.productDescription = product.ProductDescription ?? "NOT_DEFINED";
    newProduct.productType = product.ProductType ?? "NOT_DEFINED";
    newProduct.productGroup = product.ProductGroup ?? "NOT_DEFINED";
   
    await AppDataSource.manager.save(newProduct);
  };
