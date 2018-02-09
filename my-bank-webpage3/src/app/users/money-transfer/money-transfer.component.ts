import { Component, OnInit ,Input,Output, ViewChild} from '@angular/core';
import {DropdownModule} from "ng2-dropdown";
import {TransferInfo} from "../json/transferInfo.json";
import {MopService} from "../service/mop.service";
import { FeesService } from '../service/fees.service';
import { BicService } from '../service/bic.service';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { MoneyTransfer } from '../class/moneyTransfering';
import { AccountsService } from '../service/accounts.service';

@Component({
  selector: 'app-money-transfer',
  templateUrl: './money-transfer.component.html',
  styleUrls: ['./money-transfer.component.css']
})
export class MoneyTransferComponent implements OnInit {
  @ViewChild('ngFormInstance') public ngFormInstance: NgForm;
  @ViewChild('ngFormInstance') public bicNgModel: NgModel;
 
  public accList:string[] = [];
  public myAccounts:string;
  public bic:string = "";
  public amount:number= 100.00;
  public isVisible:boolean = false;
  public isVisible2:boolean = false;
  public calculate_fees_disable:string ="disabled";
  public country:string = "";
  public wrongInput:string = "";
  public total:number = 0;

  constructor(private _mopService:MopService,private _feeService:FeesService,private _bicService:BicService, private _router: Router,private _acct:AccountsService) {

    this.accList = this._acct.accList;
    this.myAccounts = this._acct.defult;

  }

  ngOnInit() {
  }

  setChoosenAccount(event){
    this.myAccounts = event.target.text;
    console.log('account choosen ' + this.myAccounts);
  }

  public bicCal(){
    if(this.bicNgModel.control.status === 'VALID'){
      this.calculate_fees_disable = "";
    }else{
      this.calculate_fees_disable = "disabled";
    }
    console.log(this.bicNgModel.control.status);
    this.bic = this._bicService.autoComplete(this.bic);
    this.country = this._bicService.retriveCountryFromBic(this.bic);
    if(this.country !== undefined){
      console.log('retrived country from bic '+this.country);
        this._mopService.blockOptions(this.country);
    }
  }
  


  calculateFees(){
    
    let money:MoneyTransfer = new MoneyTransfer(this.myAccounts,this.amount,this.bic);
    
    if(this._feeService.isTransferInputValid(money)){
    
      console.log(`Starting fee calculation for account ${this.myAccounts} amount ${this.amount} and bic ${this.bic}`);
      this.isVisible = true;
      this.calculate_fees_disable = "disabled";

      this._feeService.startFeesCalculation(null).subscribe((fees:string[])=>{
        console.log('started fee calculation '+fees);
      });  
    }else{
      console.log('error cannot transfer money');
      document.getElementById("openModalButton").click();
    }
  }

  sumerrize(){
    this.total = this.amount;
    this.isVisible2 = true;
  }

  refresh(): void {
    console.log('Payment finished, reloading page');
    window.location.reload();
    this._router.navigateByUrl('/sheep');
  }
}
