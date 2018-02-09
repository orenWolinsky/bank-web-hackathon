import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SinginService } from '../users/service/singin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userName:string = "";
  public password:string ="";
  public isVisible:boolean = false;
  public isVisible2:boolean = false;

  constructor(private _router: Router,private _signService:SinginService) {}

  ngOnInit() {
  }

  public login(){
    console.log('signin submit');
    if(this._signService.validateSign(this.userName,this.password)){
      this.isVisible = true;
      this.isVisible2 = false;
      setTimeout(() => {
        this._router.navigateByUrl('/transfer');  
      }, 1000);

    }else{
      this.isVisible2 = true;
    }
  }
}
