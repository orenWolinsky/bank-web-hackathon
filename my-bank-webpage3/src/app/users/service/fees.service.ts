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

@Injectable()
export class FeesService{

    public feesSubject:Subject<string[]> = new Subject();//should be array of feejsons //try working with task json
    public strArr: string[];
    public json:string = `{
        "localoffice" : "FIN",
        "bdDebitamount" : 10,
        "bdCreditamount" : 10,
        "creditCurrency" : "EUR",
      }`;
    
    public par = new HttpParams();
    constructor(private _httpService: HttpClient) {}

    public startFeesCalculation(info:TransferInfo): Observable<any[]> {
        console.log(info);
        let param:HttpParams = new HttpParams().set("localoffice","FIN").append("bdDebitamount","10").append("bdCreditamount","10").append("creditCurrency","EUR");
        let head:HttpHeaders = new HttpHeaders()
        .set("Access-Control-Allow-Headers","X-Requested-With,Content-Type")
        .append("Access-Control-Allow-Methods","GET")
        //.append("Access-Control-Allow-Origin","*")
        .append("Access-Control-Allow-Origin","http://192.168.173.143:8080");
//http://192.168.173.143:8080/CrunchifyTutorials/api/verify
        return this._httpService.get('http://192.168.173.143:8080/CrunchifyTutorials/api/oren', {  //'https://nztodo.herokuapp.com/api/task/?format=json' 'http://192.168.169.59:8888/myapp/api/calculateFees'
            observe: 'response',
            //headers: head,
            //params: param
        })
            .map((res) => {
                console.log(res);
                // const i:Stub = res.body[1] as Stub;
                // console.log(res.body[1]);
                // console.log(i.description);
                // console.log(res.body[1].title); //playing with incoming json
                // console.log(res.body[1]);
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