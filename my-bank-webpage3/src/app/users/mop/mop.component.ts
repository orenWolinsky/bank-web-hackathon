import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import {FeesService} from "../service/fees.service";
import {MopService} from "../service/mop.service";
import { ChangeDetectorRef } from '@angular/core';
import { FeeIncomingInfo } from '../class/feeIncomingInfo';
import { CurrencyService } from '../service/currency.service';

@Component({
  selector: 'app-mop',
  templateUrl: './mop.component.html',
  styleUrls: ['./mop.component.css']
})
export class MopComponent implements OnInit {
  public feeData:FeeIncomingInfo = new FeeIncomingInfo();
  
  public currency:string = "USD";
  public isVisible:boolean = false;
  public titleFeeBox:string;
  
  private disabled:string = "disabled";
  private active:string = "active";
  //
  public immdt_btn:MOPOption;
  public urg_btn:MOPOption;
  public nUrg_btn:MOPOption;

  public Content:string;

  public imdtInfo:string = "Transfer money right away";
  public urgInfo:string = "Tranfer will be done at end of business day";
  public nUrgInfo:string = "Tranfer will be done in two business day";

  public x:string = "";
  public y:string = "";
  public z:string = "";

  constructor(private _feeService:FeesService,
              private _mopService:MopService,
              private _currencyService:CurrencyService) { 
    
        
        this.immdt_btn = new MOPOption(MopService.mopList[0],this.active);;
        this.urg_btn= new MOPOption(MopService.mopList[1],this.active);
        this.nUrg_btn = new MOPOption(MopService.mopList[2],this.active);

        this._feeService.feesSubject.subscribe((fee:FeeIncomingInfo)=>{
          console.log("subscribed to fee service and recived fee " + fee);
          this.feeData = fee;
          this.validateFeeToShow();
          
        });
        
        this._mopService.mopSubject.subscribe((arr:boolean[])=>{
          this.immdt_btn.setActivation(arr[0]);
          this.urg_btn.setActivation(arr[1]);
          this.nUrg_btn.setActivation(arr[2]);
        });

        this._currencyService.currencySubject.subscribe((cur:string)=>{
          this.currency = cur;
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
    this.mopChoosen(event.target.className);
    console.log(text); 
    if(!isBlocked){
      this.titleFeeBox = text;
      this._feeService.setProduct(text);
      this.setBaseFeeWithRightData(event.target.className);
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


  private mopChoosen(title:string){
    console.log(title);
    this.x = "";
    this.y = "";
    this.z = "";

    if(title.includes("imdt")){
      this.x = "xyz";
    }
    else if(title.includes("urgt")){
      this.y = "xyz";
    }
    else if(title.includes("nogt")){
      this.z = "xyz";
    }
  }

  public clickTab(event):void{
    console.log('pressed '+event.target.text);
    event.target.classList.add('active');
  }

  //nogt urgt imdt
  private setBaseFeeWithRightData(mop:string){
    if(mop.includes("nogt")){
      this.feeData.productFee = this.feeData.nonUrgentFee;
      this.feeData.productCableFee = this.feeData.nonUrgentCableFee;
      this.feeData.productInternationalFee = this.feeData.nonUrgentInternationalFee;
      this.feeData.productTaxFee = this.feeData.nonUrgentTaxFee;
    }
    else if(mop.includes("urgt")){
      this.feeData.productFee = this.feeData.urgentFee;
      this.feeData.productCableFee = this.feeData.urgentCableFee;
      this.feeData.productInternationalFee = this.feeData.urgentInternationalFee;      
      this.feeData.productTaxFee = this.feeData.urgentTaxFee;
    }
    else if(mop.includes("imdt")){
      this.feeData.productFee = this.feeData.immidiateFee;
      this.feeData.productCableFee = this.feeData.immidiateCableFee;
      this.feeData.productInternationalFee = this.feeData.immidiateInternationalFee;      
      this.feeData.productTaxFee = this.feeData.immidiateTaxFee;
    }

  }

  private validateFeeToShow(){
    if(this.nUrg_btn.mop_btn_active === "disabled"){
      this.feeData.nonUrgentFee = undefined;
      this.nUrg_btn.mopNA = "N/A";
    }
    else if(this.immdt_btn.mop_btn_active === "disabled"){
      this.feeData.immidiateFee = undefined;
      this.immdt_btn.mopNA = "N/A";
    }
    else if(this.urg_btn.mop_btn_active === "disabled"){
      this.feeData.urgentFee = undefined;
      this.urg_btn.mopNA = "N/A";
    }
  }
}

class MOPOption{
  public mopName:string;
  public mop_btn_active:string;
  public mopNA:string = "";
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