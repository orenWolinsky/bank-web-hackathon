import { Component, OnInit ,Input,Output} from '@angular/core';
import {DropdownModule} from "ng2-dropdown";
import {TransferInfo} from "../json/transferInfo.json";
import {MopService} from "../service/mop.service";
import { FeesService } from '../service/fees.service';

@Component({
  selector: 'app-money-transfer',
  templateUrl: './money-transfer.component.html',
  styleUrls: ['./money-transfer.component.css']
})
export class MoneyTransferComponent implements OnInit {

  public accList:string[] = [];
  public myAccounts:string = "My Accounts";
  public bic:string = "";
  public amount:number= 100.00;
  public isVisible:boolean = false;
  public isVisible2:boolean = false;
  public calculate_fees_disable:string ="";

  private disabled:string = "disabled";
  private active:string = "active";
  constructor(private _mopService:MopService,private _feeService:FeesService) {

    this.accList = this._mopService.accList;

   }

  ngOnInit() {
  }

  setChoosenAccount(event){
    this.myAccounts = event.target.text;
    this._mopService.blockOptions(this.myAccounts);
  }

  calculateFees(){
    
    this.isVisible = true;
    this.calculate_fees_disable = this.disabled;

    
    this._feeService.startFeesCalculation(null).subscribe((fees:string[])=>{
      console.log('started fee calculation '+fees);
    });
  }

  sumerrize(){
    this.isVisible2 = true;
    //this._mopService.blockOptions(this.agent);
  }

  refresh(): void {
    window.location.reload();
  }
}
