

import {Subject} from "rxjs/Subject";


export class MopService{

    public mopSubject:Subject<boolean> = new Subject();
    //all product actions are here
    private ned:string = "SBSA";

    public blockOptions(product:string){
        if(this.ned === product){
            console.log('block options is on');
            this.mopSubject.next(true);
        }
    
    }



}