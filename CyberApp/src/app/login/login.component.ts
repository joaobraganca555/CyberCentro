import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
  }

  submit(): void {
    console.log(this.form.getRawValue());
    
  }


}
