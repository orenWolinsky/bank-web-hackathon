import { Component, OnInit ,Input,Output} from '@angular/core';
import {DropdownModule} from "ng2-dropdown";
import {MopComponent} from "../mop/mop.component";
import {TransferInfo} from "../json/transferInfo.json";
import {MopService} from "../service/mop.service";

@Component({
  selector: 'app-money-transfer',
  templateUrl: './money-transfer.component.html',
  styleUrls: ['./money-transfer.component.css']
})
export class MoneyTransferComponent implements OnInit {

  public agentList:string[] = [];
  public agent:string = "Agent Dropdown";
  public accountNumber:string = "";
  public amount:number= 100.00;
  public isVisible:boolean = false;
  public isVisible2:boolean = false;
  public calculate_fees_disable:string ="";

  private disabled:string = "disabled";
  private active:string = "active";
  constructor(private _mopService:MopService) { //private _mopComponent:MopComponent,

    this.agentList = this._mopService.agentList;

   }

  ngOnInit() {
  }

  setChoosenAgent(event){
    this.agent = event.target.text;
    this._mopService.blockOptions(this.agent);
  }

  calculateFees(){
    //this._mopComponent.startCalculatingFees(new TransferInfo(this.agent,this.accountNumber,this.amount));
    this.isVisible = true;
    this.calculate_fees_disable = this.disabled;
  }

  sumerrize(){
    this.isVisible2 = true;
    //this._mopService.blockOptions(this.agent);
  }

  refresh(): void {
    window.location.reload();
  }
}
