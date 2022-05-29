import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  API_URL: string = 'http://localhost:3000/api'
  API_URL_LOGIN: string = `${this.API_URL}/auth/login`
  API_URL_REGISTER: string = `${this.API_URL}/auth/register`

  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  constructor(private http: HttpClient, private router: Router) { }

  authenticate(data: any): void {

    this.http.post(this.API_URL_LOGIN, data, {
      withCredentials: true,
      headers: this.headers,
    }).subscribe( (res:any) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/menu'])
      });
  }
}
