

import {Subject} from "rxjs/Subject";
import {Observer} from "rxjs/Observer"


export class MopService{

    private str:string = "";
    public mopSubject:Subject<boolean[]> = new Subject();
    public mopOptionsArr:boolean[] = [];
    //all product actions are here
    private curr:string = "Current";
    public accList:string[] = ["Current","Savings","Expenses"];
    //have a map of key - string and value - array of 3 booleans, return array of booleans based on the selected product

    public blockOptions(product:string){

        console.log(`block options is on recived: ${product}`);
        this.str = product;
        this.mopOptionsArr = [];
        
        if(product === this.curr){
            this.mopOptionsArr.push(true);
            this.mopOptionsArr.push(true);
            this.mopOptionsArr.push(false);
        }
        else{
            this.mopOptionsArr.push(true);
            this.mopOptionsArr.push(false);
            this.mopOptionsArr.push(true);
        }
        this.mopSubject.next(this.mopOptionsArr);
    }



}