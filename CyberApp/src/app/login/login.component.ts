import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    email: '',
    password: ''
  });

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
  }

  submit(): void {
    console.log(this.form.getRawValue());
    this.authenticationService.authenticate(this.form.getRawValue());
  }


}
