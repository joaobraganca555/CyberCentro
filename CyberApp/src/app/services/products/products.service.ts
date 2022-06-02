import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductTop } from 'src/app/models/product-top';
import { ProductTopGross } from 'src/app/models/product-top-gross';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  API_URL: string = environment.api_url;
  API_GET_ALL_PRODUCTS: string = `${this.API_URL}/product`
  API_GET_TOP_PRODUCTS_QUANTITY: string = `${this.API_URL}/product/top`
  API_GET_TOP_PRODUCTS_TOTAL_GROSS: string = `${this.API_URL}/product/topByTotalGross`

  constructor(private http: HttpClient) { }

  getAllProducts(): any {
    return this.http.get<Product>(this.API_GET_ALL_PRODUCTS);
  }

  getTopProductsByQuantity(year: any): any {
    return this.http.get<ProductTop>(`${this.API_GET_TOP_PRODUCTS_QUANTITY}/${year}`);
  }

  getTopProductsByGross(year: any): any {
    return this.http.get<ProductTopGross>(`${this.API_GET_TOP_PRODUCTS_TOTAL_GROSS}/${year}`);
  }

  
}
