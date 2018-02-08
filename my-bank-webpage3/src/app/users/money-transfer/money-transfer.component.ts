import { Component, OnInit ,Input,Output, ViewChild} from '@angular/core';
import {DropdownModule} from "ng2-dropdown";
import {TransferInfo} from "../json/transferInfo.json";
import {MopService} from "../service/mop.service";
import { FeesService } from '../service/fees.service';
import { BicService } from '../service/bic.service';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-money-transfer',
  templateUrl: './money-transfer.component.html',
  styleUrls: ['./money-transfer.component.css']
})
export class MoneyTransferComponent implements OnInit {
  @ViewChild('ngFormInstance') public ngFormInstance: NgForm;
  @ViewChild('ngFormInstance') public bicNgModel: NgModel;
 
  public accList:string[] = [];
  public myAccounts:string = "My Accounts";
  public bic:string = "";
  public amount:number= 100.00;
  public isVisible:boolean = false;
  public isVisible2:boolean = false;
  public calculate_fees_disable:string ="disabled";

  constructor(private _mopService:MopService,private _feeService:FeesService,private _bicService:BicService) {

    this.accList = this._mopService.accList;

  }

  ngOnInit() {
  }

  setChoosenAccount(event){
    this.myAccounts = event.target.text;
    this._mopService.blockOptions(this.myAccounts);
  }

  public bicCal(){
    if(this.bicNgModel.control.status === 'VALID'){
      this.calculate_fees_disable = "";
    }
    this.bic = this._bicService.autoComplete(this.bic);
  }


  calculateFees(){
    
    this.isVisible = true;
    this.calculate_fees_disable = "disabled";

    
    this._feeService.startFeesCalculation(null).subscribe((fees:string[])=>{
      console.log('started fee calculation '+fees);
    });

    let county:string = this._bicService.retriveCountryFromBic(this.bic);

  }

  sumerrize(){
    this.isVisible2 = true;
    //this._mopService.blockOptions(this.agent);
  }

  refresh(): void {
    window.location.reload();
  }
}
