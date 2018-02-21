

import {Subject} from "rxjs/Subject";
import {Observer} from "rxjs/Observer"


export class MopService{

    public mopSubject:Subject<boolean[]> = new Subject();
    public mopOptionsArr:boolean[] = [];  
    public static mopList:string[] = ["Immediate","Same Day","Two Days Delivery"];
    public france:string = "FRANCE";
    public israel:string = "ISRAEL";
    public usa:string = "USA";
    public brazil:string = "BRAZIL";
    public unknown:string = "unkown";
    //have a map of key - string and value - array of 3 booleans, return array of booleans based on the selected product
    public blockOptions(product:string){

        // console.log(`block options is on recived: on ${product}`);
        this.mopOptionsArr = [];
        
        if(product === this.france){
            this.mopOptionsArr.push(true);
            this.mopOptionsArr.push(true);
            this.mopOptionsArr.push(false);
        }
        else if(product === this.israel){
            this.mopOptionsArr.push(true);
            this.mopOptionsArr.push(false);
            this.mopOptionsArr.push(true);
        }
        else if(product === this.usa){
            this.mopOptionsArr.push(true);
            this.mopOptionsArr.push(false);
            this.mopOptionsArr.push(true);
        }
        else if(product === this.brazil){
            this.mopOptionsArr.push(true);
            this.mopOptionsArr.push(false);
            this.mopOptionsArr.push(true);
        }
        else if(product === this.unknown){
            this.mopOptionsArr.push(false);
            this.mopOptionsArr.push(false);
            this.mopOptionsArr.push(false);
        }
        else{
            this.mopOptionsArr.push(true);
            this.mopOptionsArr.push(true);
            this.mopOptionsArr.push(true);
        }
        
        this.mopSubject.next(this.mopOptionsArr);
    }



}