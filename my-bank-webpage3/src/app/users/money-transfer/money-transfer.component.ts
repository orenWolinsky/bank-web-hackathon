import { Component, OnInit ,Input,Output, ViewChild,AfterViewChecked } from '@angular/core';
import {DropdownModule} from "ng2-dropdown";
import {MopService} from "../service/mop.service";
import { FeesService } from '../service/fees.service';
import { BicService } from '../service/bic.service';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { MoneyTransferData } from '../class/moneyTransfering';
import { AccountsService } from '../service/accounts.service';
//declare var $: any;

@Component({
  selector: 'app-money-transfer',
  templateUrl: './money-transfer.component.html',
  styleUrls: ['./money-transfer.component.css']
})
export class MoneyTransferComponent implements OnInit {
  @ViewChild('ngFormInstance') public ngFormInstance: NgForm;
  @ViewChild('ngFormInstance') public bicNgModel: NgModel;
 
  public accList:string[] = [];
  public currencyList:string[]=[];

  public isVisible:boolean = false;
  public isVisible2:boolean = false;
  public calculate_fees_disable:string ="disabled";
  public wrongInput:string = "";
  public transferInfo:MoneyTransferData = new MoneyTransferData();

  constructor(private _mopService:MopService,private _feeService:FeesService,private _bicService:BicService, private _router: Router,private _acct:AccountsService) {
    this.transferInfo.amount = 100;
    this.accList = this._acct.accList;
    this.currencyList = this._acct.currencyList;
    this.transferInfo.account = this._acct.defult;
    this.transferInfo.currency = this.currencyList[0];
  }

  ngOnInit() {
  }

  setChoosenAccount(event){
    this.transferInfo.account = event.target.text;
    console.log('Account choosen ' + this.transferInfo.account);
  }

  setChoosenCurrency(event){
    this.transferInfo.currency = event.target.text;
    console.log('Currency choosen ' + this.transferInfo.currency);
  }

  public bicCal(){
    if(this.bicNgModel.control.status === 'VALID'){
      this.calculate_fees_disable = "";
    }else{
      this.calculate_fees_disable = "disabled";
    }
    console.log(this.bicNgModel.control.status);
    this.transferInfo.bic = this._bicService.autoComplete(this.transferInfo.bic);
    this.transferInfo.country = this._bicService.retriveCountryFromBic(this.transferInfo.bic);
    if(this.transferInfo.country !== undefined){
      console.log('retrived country from bic '+this.transferInfo.country);
        this._mopService.blockOptions(this.transferInfo.country);
    }
  }
  


  calculateFees(){

    
    if(this._feeService.isTransferInputValid(this.transferInfo)){
    
      console.log(`Starting fee calculation for account ${this.transferInfo.account} amount ${this.transferInfo.amount} and bic ${this.transferInfo.bic}`);
      this.isVisible = true;
      this.calculate_fees_disable = "disabled";

   
      this._feeService.startFeesCalculation(this.transferInfo).subscribe((fees:string[])=>{
        console.log('started fee calculation '+fees);
      });
    
    }else{
      console.log('error cannot transfer money');
      document.getElementById("openModalButton").click();
    }
  }

  /*
  here i will get from fee service also the calculated choosen fees so i can add to amount
  */
  sumerrize(){
    let product:string = this._feeService.getProduct();
    let feePart:string = this._feeService.getFeePart();
    console.log(`Sumerrize money transfer with ${product} and fee part ${feePart}`);
    if(product === undefined || feePart === undefined){
      document.getElementById("openModalButton2").click();
    }else{
      this.transferInfo.total = this.transferInfo.amount;
      this.isVisible2 = true;
    }    
  }

  refresh(): void {
    console.log('Payment finished, reloading page');
    //window.location.reload();
    this._router.navigateByUrl('/sheep');
  }
}
