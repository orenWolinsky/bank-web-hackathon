import { Component, OnInit ,Input,Output, ViewChild,AfterViewChecked } from '@angular/core';
import {DropdownModule} from "ng2-dropdown";
import {MopService} from "../service/mop.service";
import { FeesService } from '../service/fees.service';
import { BicService } from '../service/bic.service';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { MoneyTransferData } from '../class/moneyTransfering';
import { AccountsService } from '../service/accounts.service';
import { FeeIncomingInfo } from '../class/feeIncomingInfo';
import { CurrencyService } from '../service/currency.service';
//declare var $: any;

@Component({
  selector: 'app-money-transfer',
  templateUrl: './money-transfer.component.html',
  styleUrls: ['./money-transfer.component.css']
})
export class MoneyTransferComponent implements OnInit {
  @ViewChild('ngFormInstance') public ngFormInstance: NgForm;
  @ViewChild('ngFormInstance') public bicNgModel: NgModel;
  @ViewChild('ngFormInstance') public accNumModel: NgModel;

  public feeData:FeeIncomingInfo = new FeeIncomingInfo();
  public accList:string[] = [];
  public currencyList:string[]=[];
  public has_error:string = "";
  public isVisible:boolean = false;
  public isVisible2:boolean = false;
  public calculate_fees_disable:string ="disabled";
  public transfer_money_disable:string = "disabled";

  public wrongInput:string = "";
  public transferInfo:MoneyTransferData = new MoneyTransferData();

  constructor(private _mopService:MopService,
              private _feeService:FeesService,
              private _bicService:BicService,
              private _router: Router,
              private _acct:AccountsService,
              private _currencyService:CurrencyService) {

    this.transferInfo.amount = 100;
    this.accList = this._acct.accList;
    this.currencyList = this._currencyService.currencyList;
    this.transferInfo.account = this._acct.defult;
    
    this.transferInfo.currency = this.currencyList[0];

    this._feeService.feesSubject.subscribe((fee:FeeIncomingInfo)=>{
      console.log("subscribed to fee service and recived fee " + fee);
      this.feeData = fee;
      
    });

  }

  ngOnInit() {
  }

  setChoosenAccount(event){
    this.transferInfo.account = event.target.text;
    console.log('Account choosen ' + this.transferInfo.account);
  }

  setChoosenCurrency(event){
    this.transferInfo.currency = event.target.text;
    this._currencyService.updateCurrency(this.transferInfo.currency);
    console.log('Currency choosen ' + this.transferInfo.currency);
  }

  public bicCal(){

    this.calculate_fees_disable = "";
    
    this.transferInfo.bic = this._bicService.autoComplete(this.transferInfo.bic);
    this.transferInfo.bankName = this._bicService.nameComplete(this.transferInfo.bic);
    this.transferInfo.country = this._bicService.retriveCountryFromBic(this.transferInfo.bic);
    if(this.transferInfo.country !== undefined){
      console.log('retrived country from bic '+this.transferInfo.country);
        this._mopService.blockOptions(this.transferInfo.country);
    }

    
    this.has_error = "";
    this.isVisible = false;
  }

  
  


  calculateFees(){
    //if button is blocked then don't press the button
    // if(this.calculate_fees_disable === "disabled"){
    //   return;
    // }

    // console.log(this.transferInfo.bankName);
    // if(this.transferInfo.bankName === undefined){
    //   this.has_error = "has-error";
    //   this.isVisible = true;
    // }else{
    //   this.has_error = "";
    //   this.isVisible = false;
    // }

    // if(this._feeService.isTransferInputValid(this.transferInfo)){
    
    //   console.log(`Starting fee calculation for account ${this.transferInfo.account} amount ${this.transferInfo.amount} and bic ${this.transferInfo.bic}`);
      
    //   this.transfer_money_disable = "";
    //   this.calculate_fees_disable = "disabled";

   
      this._feeService.startFeesCalculation(this.transferInfo).subscribe((fees:FeeIncomingInfo)=>{
        console.log('started fee calculation '+fees);
      });
    
    // }else{
    //   console.log('error cannot transfer money');
    //   document.getElementById("openModalButton").click();
    // }
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
      document.getElementById("openModalButton3").click();
    }    
  }

  refresh(): void {
    console.log('Payment finished, reloading page');
    //window.location.reload();
    this._router.navigateByUrl('/sheep');
  }
}
