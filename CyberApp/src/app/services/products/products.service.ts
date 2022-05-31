import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductTopQuantity } from 'src/app/models/product-top-quantity';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  API_URL: string = environment.api_url;
  API_GET_ALL_PRODUCTS: string = `${this.API_URL}/product`
  API_GET_TOP_PRODUCTS_QUANTITY: string = `${this.API_URL}/product/top`

  constructor(private http: HttpClient) { }

  // getAllProductsv2(): any {
  //   this.http.get(this.API_GET_ALL_PRODUCTS).subscribe(
  //     {
  //       next: (v) => console.log(v),
  //       error: (e) => console.error(e),
  //       complete: () => console.info('complete') 
  //     });
  // }

  getAllProducts(): any {
    return this.http.get<Product>(this.API_GET_ALL_PRODUCTS);
  }

  getTopProductsByQuantity(year: any): any {
    return this.http.get<ProductTopQuantity>(`${this.API_GET_TOP_PRODUCTS_QUANTITY}/${year}`);
  }
}
