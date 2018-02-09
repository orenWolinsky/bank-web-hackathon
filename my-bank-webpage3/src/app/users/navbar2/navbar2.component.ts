import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.css']
})
export class Navbar2Component implements OnInit {


  public login = "Logout";
  public user:string = "oren";

  constructor(private _router: Router) { }

  ngOnInit() {
  }

}
