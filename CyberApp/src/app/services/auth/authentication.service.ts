import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  API_URL: string = 'http://localhost:3000/api'
  API_URL_LOGIN: string = `${this.API_URL}/auth/login`
  API_URL_REGISTER: string = `${this.API_URL}/auth/register`

  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  user: any = {}
  token = ""

  constructor(private jwtHelper: JwtHelperService, private http: HttpClient, private router: Router) {
  }

  authenticate(data: any): void {

    this.http.post(this.API_URL_LOGIN, data, {
      withCredentials: true,
      headers: this.headers,
    }).subscribe( (res:any) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/menu'])
      });
  }

  verifyToken(): boolean {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    if (Object.keys(this.user).length !== 0) {
      this.token = this.user.token;
    }

    if (this.token.length === 0 || this.jwtHelper.isTokenExpired(this.token)) {
      console.log("Sem token ou token expirado!");
      return false;
    }
    console.log("Token válido!");
    return true;
  }
}
