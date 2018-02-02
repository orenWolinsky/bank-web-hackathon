import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import {FeesService} from "../service/fees.service";
import {TransferInfo} from "../json/transferInfo.json";


@Component({
  selector: 'app-mop',
  templateUrl: './mop.component.html',
  styleUrls: ['./mop.component.css'],
  providers:[FeesService],
})
export class MopComponent implements OnInit {
  public immidiateFee:string = "d";
  public directDebitFee:string = "";
  public loanFee:string = "";
  public sheepFee:string = "";
  public currency:string = "$";
  public isVisible:boolean = false;
  public titleFeeBox:string;
  
  private disabled:string = "disabled";
  private active:string = "active";

  public immdt_btn:MOPOption = new MOPOption("Immidiate",this.active);;
  public db_btn:MOPOption = new MOPOption("Direct Debit",this.active);
  public loan_btn:MOPOption = new MOPOption("Loan",this.disabled);
  public sp_btn:MOPOption = new MOPOption("Sheep",this.active);

  constructor(private _feeService:FeesService) { 
    this.startCalculatingFees(new TransferInfo("d","d",1));
  }

  ngOnInit() {
    
  }

  public startCalculatingFees(info:TransferInfo){

    this._feeService.getFeesCalculation(info).subscribe((fees: string[]) => {
      this.immidiateFee = fees[0] +this.currency;
      this.directDebitFee = fees[1] +this.currency;
      this.loanFee = fees[2] + this.currency;
      this.sheepFee = fees[3] + this.currency;
      console.log(fees);
    });
    
  }

  public showScreenBelow(event){
    
    const text:string = event.target.textContent;
    const notBlocked:boolean = this.isblocked(event.target.textContent);

    if(notBlocked){
      this.titleFeeBox = text;
    }

    if(!this.isVisible && !notBlocked){
      this.isVisible = false;  
    }
    else{
      this.isVisible = true;
    }
  }


  public closeScreen(){
    this.isVisible = false;
  }

  private isblocked(title:string):boolean{
    if(title.includes(this.db_btn.mopName)){
      return this.db_btn.isActive();
    }
    else if(title.includes(this.immdt_btn.mopName)){
      return this.immdt_btn.isActive();
    }
    else if(title.includes(this.loan_btn.mopName)){
      return this.loan_btn.isActive();
    }
    else if(title.includes(this.sp_btn.mopName)){
      return this.sp_btn.isActive();
    }
    return false;
  }
}

class MOPOption{
  public mopName:string;
  public mop_btn_active:string;
  private disabled:string = "disabled";
  private active:string = "active";

  constructor(private name:string,private actv:string){
    this.mopName = name;
    this.mop_btn_active = actv;
  }

  isActive():boolean{
    return (this.mop_btn_active === this.active) ? true:false;
  }
}