import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core/src/metadata/di';

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.css']
})
export class NavbarComponentComponent implements OnInit {

  public login = "Login";
  public user:string = "User";

  constructor() { }

  ngOnInit() {
  }

}
