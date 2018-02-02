import { Component, OnInit ,Input,Output} from '@angular/core';
import {DropdownModule} from "ng2-dropdown";
import {MopComponent} from "../mop/mop.component";
import {TransferInfo} from "../json/transferInfo.json";


@Component({
  selector: 'app-money-transfer',
  templateUrl: './money-transfer.component.html',
  styleUrls: ['./money-transfer.component.css'],
  providers:[MopComponent]
})
export class MoneyTransferComponent implements OnInit {

  @Output() public agentList:string[] = ["SBSA","Ned Bank","ANZ","Sheep Bank"];
  public agent:string = "Agent Dropdown";
  public accountNumber:string = "";
  public amount:number= 0;
  public isVisible:boolean = false;
  public isVisible2:boolean = false;
  public calculate_fees_disable:string ="";

  private disabled:string = "disabled";
  private active:string = "active";
  constructor(private mopComponent:MopComponent) { }

  ngOnInit() {
  }

  setChoosenAgent(event){
    this.agent = event.target.text;
  }

  calculateFees(){
    this.mopComponent.startCalculatingFees(new TransferInfo(this.agent,this.accountNumber,this.amount));
    this.isVisible = true;
    this.calculate_fees_disable = this.disabled;
  }

  sumerrize(){
    this.isVisible2 = true;
  }
}
