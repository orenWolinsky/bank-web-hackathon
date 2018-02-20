import { Subject } from "rxjs/Subject";





export class CurrencyService{

    public currencySubject:Subject<string> = new Subject();
    public currencyList:string[] = ["USD","EUR","AUD","CAD","JPY","CNY","SGD"]; //

    public updateCurrency(newCurrency:string){
        this.currencySubject.next(newCurrency);
    }

}