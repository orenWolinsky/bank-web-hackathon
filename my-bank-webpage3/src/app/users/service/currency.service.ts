import { Subject } from "rxjs/Subject";





export class CurrencyService{

    public currencySubject:Subject<string> = new Subject();

    public updateCurrency(newCurrency:string){
        this.currencySubject.next(newCurrency);
    }

}