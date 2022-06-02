import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  API_URL: string = environment.api_url;
  API_GET_ALL_INVOICES: string = `${this.API_URL}/invoice`
  API_GET_TOTAL_GROSS: string = `${this.API_URL}/invoice/totalGross`
  API_GET_TOTAL_GROSS_BY_YEAR_AND_MONTH: string = `${this.API_URL}/invoice/totalGrossByYearAndMonth`
  API_GET_TOTAL_GROSS_BY_ZONE: string = `${this.API_URL}/invoice/getGrossByZoneByDate`
  API_GET_TOTAL_GROSS_BY_FAMILY: string = `${this.API_URL}/invoice/getGrossByFamilyByDate`

  constructor(private http: HttpClient) { }

  getAllInvoices() {
    return this.http.get<any>(this.API_GET_ALL_INVOICES);
  }

  getTotalGross() {
    return this.http.get<number>(this.API_GET_TOTAL_GROSS);
  }

  getTotalGrossByYearAndMonth(inputDate: Date) {
    return this.http.post<any>(this.API_GET_TOTAL_GROSS_BY_YEAR_AND_MONTH, { date: inputDate });
  }

  getTotalGrossByZone(year: any) {
    return this.http.get<any>(`${this.API_GET_TOTAL_GROSS_BY_ZONE}/${year}`);
  }

  getTotalGrossByFamily(year: any) {
    return this.http.get<any>(`${this.API_GET_TOTAL_GROSS_BY_FAMILY}/${year}`);
  }
}
