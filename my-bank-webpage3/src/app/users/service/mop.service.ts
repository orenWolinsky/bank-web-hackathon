

import {Subject} from "rxjs/Subject";


export class MopService{

    private bolArray:boolean[] = [];
    public mopSubject:Subject<boolean[]> = new Subject();
    //all product actions are here
    private ned:string = "SBSA";

    public blockOptions(product:string){
        if(this.ned === product){
            console.log('block options is on');
            this.bolArray.push(true);
            this.bolArray.push(false);
            this.mopSubject.next(this.bolArray);
        }
    
    }



}