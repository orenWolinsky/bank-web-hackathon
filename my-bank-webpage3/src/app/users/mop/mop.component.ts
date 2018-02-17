import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import {FeesService} from "../service/fees.service";
import {MopService} from "../service/mop.service";
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-mop',
  templateUrl: './mop.component.html',
  styleUrls: ['./mop.component.css']
})
export class MopComponent implements OnInit {
  public immidiateFee:string = "";
  public directDebitFee:string = "";
  public loanFee:string = "";
  public sheepFee:string = "";

  public currency:string = "$";
  public isVisible:boolean = false;
  public titleFeeBox:string;
  
  private disabled:string = "disabled";
  private active:string = "active";

  public immdt_btn:MOPOption = new MOPOption("Immidiate",this.active);;
  public urg_btn:MOPOption = new MOPOption("Urgent",this.active);
  public nUrg_btn:MOPOption = new MOPOption("Non Urgent",this.active);

  public Content:string;

  public imdtInfo:string = "Immidate tranfer, will be done by end of day";
  public urgInfo:string = "Urgent tranfer will be done right away";
  public nUrgInfo:string = "Non urgent tranfer will not be urgent";

  constructor(private _feeService:FeesService,private _mopService:MopService) { 
    
    this._feeService.feesSubject.subscribe((arr:string[])=>{
      console.log("subscribed to fee service and recived fee " + arr);

      this.immidiateFee = arr[0] +this.currency;
      this.directDebitFee = arr[1] +this.currency;
      this.loanFee = arr[2] + this.currency;

    });
    
    this._mopService.mopSubject.subscribe((arr:boolean[])=>{
      this.immdt_btn.setActivation(arr[0]);
      this.urg_btn.setActivation(arr[1]);
      this.nUrg_btn.setActivation(arr[2]);
    });
  }

  ngOnInit() {

  }




  setChoosenFees(event){
    console.log('choose fee ' + event.target.text);
    this._feeService.setFeePart(event.target.text);
  }

  public showScreenBelow(event){
    const text:string = event.target.textContent;
    const isBlocked:boolean = this.isblocked(event.target.className);
    console.log(text);
    if(!isBlocked){
      this.titleFeeBox = text;
      this._feeService.setProduct(text);
    }

    if(!this.isVisible && isBlocked){
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
    //debugger;
    if(title.includes("disabled")){
      return true;
    }
    return false;
  }


  public clickTab(event):void{
    console.log('pressed '+event.target.text);
    event.target.classList.add('active');
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


  public setActivation(bol:boolean){
    if(bol){
      this.mop_btn_active = this.active;
    }else{
      this.mop_btn_active = this.disabled;
    }
  }
}