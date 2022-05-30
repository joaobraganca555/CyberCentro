import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  API_URL: string = environment.api_url;
  API_GET_ALL_SUPPLIERS: string = `${this.API_URL}/`

  constructor() { }
}
