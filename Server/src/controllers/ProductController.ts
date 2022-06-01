import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";

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

productInterface.getTopProductsByQuantity = async function (req, res) {
  res.json(await productRepository
      .query("SELECT product.productCode, productDescription, soma FROM product LEFT JOIN\n" +
          "    (SELECT sum(CAST(quantity AS float)) as soma, productCode FROM product\n" +
          "    LEFT JOIN invoice_line ON product.productCode = productProductCode \n" +
          "    LEFT JOIN invoice ON invoice_line.invoiceInvoiceNo = invoice.invoiceNo\n" +
          "    WHERE invoice_line.productProductCode IS NOT NULL\n" +
          "    AND invoiceDate > CAST(@0 as DATE) \n" +
          "    AND invoiceDate < CAST(@1 as DATE) \n" +
          "    GROUP by productCode\n" +
          "    ) AS s ON product.productCode = s.productCode\n" +
          "    \n" +
          "    ORDER BY soma\n" +
          "    DESC",
          [req.params.date.toString(),(parseInt(req.params.date)+1).toString()]));
};

//module.exports = productInterface;


