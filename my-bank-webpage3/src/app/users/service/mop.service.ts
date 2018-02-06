

import {Subject} from "rxjs/Subject";
import {Observer} from "rxjs/Observer"


export class MopService{

    private str:string = "";
    public mopSubject:Subject<string> = new Subject();
    //all product actions are here
    private ned:string = "SBSA";

    public blockOptions(product:string){

        console.log('block options is on');
        this.str = product;
        this.mopSubject.next(this.str);
    }



}