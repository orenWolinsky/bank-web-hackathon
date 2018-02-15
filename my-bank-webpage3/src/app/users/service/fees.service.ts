import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpResponse } from '@angular/common/http';
import { HttpHeaders,HttpParams } from '@angular/common/http';
import { inject } from '@angular/core/testing';
import {TransferInfo} from "../json/transferInfo.json";
import { Subject } from 'rxjs/Subject';
import { MoneyTransfer } from '../class/moneyTransfering';
import { Stub } from '../json/stubTask.json';
import { HttpHeaderResponse } from '@angular/common/http/src/response';
import { HttpModule, Http, RequestOptions } from '@angular/http';

@Injectable()
export class FeesService{

    public feesSubject:Subject<string[]> = new Subject();//should be array of feejsons //try working with task json
    public strArr: string[];
    public url:string = "http://192.168.173.143:8080/CrunchifyTutorials/api/crunchifyService";

    public json2:TransferInfo = new TransferInfo("FIN","10","10","EUR");
    public par = new HttpParams();
    constructor(private _http:Http) {}

    /**
     * use post request to URL fee calculation with json request TransferInfo and suppose to get a json for response
     * @param info 
     */
    public startFeesCalculation(info:TransferInfo): Observable<string[]> {
        console.log(info);

        console.log(this.json2);
        console.log(this.json2.toString());
        return this._http.post(this.url,JSON.stringify(this.json2)).map((res=>{
            console.log("response is recived");
            console.log(JSON.parse(res._body));
            let j:TransferInfo = JSON.parse(res._body);
            
            console.log(j);            
            console.log(j.localoffice);
            return this.strArr;
        }));

        
    }


    public isTransferInputValid(money:MoneyTransfer):boolean{
        if(money.account === "My Accounts" || money.amount<10 || money.bic === undefined){
            return false;
        }
        return true;
    }
}