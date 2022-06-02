import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any = {};

  constructor() { }

  ngOnInit(): void {
    this.getUserName();
  }

  getUserName() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  removeSession(): void {
    localStorage.removeItem('user');
    console.log("Sessão terminada e token elimando!");
  }
}
