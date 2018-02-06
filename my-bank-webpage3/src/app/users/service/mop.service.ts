

import {Subject} from "rxjs/Subject";
import {Observer} from "rxjs/Observer"


export class MopService{

    private str:string = "";
    public mopSubject:Subject<boolean[]> = new Subject();
    public mopOptionsArr:boolean[] = [];
    //all product actions are here
    private ned:string = "SBSA";
    public agentList:string[] = ["SBSA","Ned Bank","ANZ","Sheep Bank","SwedBank"];
    //have a map of key - string and value - array of 3 booleans, return array of booleans based on the selected product

    public blockOptions(product:string){

        console.log(`block options is on recived: ${product}`);
        this.str = product;
        this.mopOptionsArr = [];
        
        if(product === this.ned){
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