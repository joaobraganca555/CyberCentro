import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  API_URL: string = environment.api_url;
  API_GET_ALL_SUPPLIERS: string = `${this.API_URL}/supplier`
  API_GET_TOP_SUPPLIERS: string = `${this.API_URL}/supplier/topSuppliers`
  API_GET_TOTAL_SPENT: string = `${this.API_URL}/supplier/totalSpent`

  constructor(private http: HttpClient) { }

  getTotalSpent() {
    return this.http.get<any>(this.API_GET_TOTAL_SPENT)
  }

  getTopSuppliers(year: any) {
    return this.http.get<any>(`${this.API_GET_TOP_SUPPLIERS}/${year}`)
  }

  getAllSuppliers() {
    return this.http.get<any>(`${this.API_GET_ALL_SUPPLIERS}`)
  }
}
