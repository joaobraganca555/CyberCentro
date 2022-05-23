import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  API_URL: string = 'http://localhost:3000/api'
  API_URL_LOGIN: string = `${this.API_URL}/auth/login`
  API_URL_REGISTER: string = `${this.API_URL}/auth/register`


  constructor(private http: HttpClient) { }

  authenticate(data: any): void {

    this.http.post(this.API_URL_LOGIN, data, {
      withCredentials: true
    }).subscribe( (res:any) => {
        localStorage.setItem('token', res.token);
      });
  }
}
