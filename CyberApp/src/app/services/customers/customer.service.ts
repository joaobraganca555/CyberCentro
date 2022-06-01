import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  API_URL: string = environment.api_url;
  API_GET_ALL_PRODUCTS: string = `${this.API_URL}/customer`

  constructor(private http: HttpClient) { }

  getAllCustomers(): any {
    return this.http.get<Customer>(this.API_GET_ALL_PRODUCTS);
  }
}
