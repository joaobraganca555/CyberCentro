import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  API_URL: string = environment.api_url;
  API_GET_ALL_SUPPLIERS: string = `${this.API_URL}/`
  API_GET_TOTAL_SPENT: string = `${this.API_URL}/totalSpent`

  constructor(private http: HttpClient) { }

  getTotalSpent() {
    return this.http.get(this.API_GET_TOTAL_SPENT)
  }
}
