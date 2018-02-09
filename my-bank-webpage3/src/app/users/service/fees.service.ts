import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core/testing';
import {TransferInfo} from "../json/transferInfo.json";
import { Subject } from 'rxjs/Subject';
import { MoneyTransfer } from '../class/moneyTransfering';

@Injectable()
export class FeesService{

    public feesSubject:Subject<string[]> = new Subject();//should be array of feejsons //try working with task json
    public strArr: string[];

    constructor(private _httpService: HttpClient) {}

    public startFeesCalculation(info:TransferInfo): Observable<any[]> {
        console.log(info);
        
        return this._httpService.get<any[]>('https://nztodo.herokuapp.com/api/task/?format=json', {
            observe: 'response',
        })
            .map((res: HttpResponse<any[]>) => {
                this.strArr = ["4.50","5.50","3.0"];
                this.feesSubject.next(this.strArr);
                return this.strArr;
            })
    }


    public isTransferInputValid(money:MoneyTransfer):boolean{
        if(money.account === "My Accounts" || money.amount<10 || money.bic === undefined){
            return false;
        }
        return true;
    }
}