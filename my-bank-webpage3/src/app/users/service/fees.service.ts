import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpResponse } from '@angular/common/http';
import { HttpHeaders,HttpParams } from '@angular/common/http';
import { inject } from '@angular/core/testing';
import { Subject } from 'rxjs/Subject';
import { MoneyTransferData } from '../class/moneyTransfering';
import { Stub } from '../json/stubTask.json';
import { HttpHeaderResponse } from '@angular/common/http/src/response';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { FeeIncomingInfo } from '../class/feeIncomingInfo';

@Injectable()
export class FeesService{

    public feesSubject:Subject<FeeIncomingInfo> = new Subject();//should be array of feejsons //try working with task json
    public strArr: string[];
    public url:string = //"http://192.168.169.59:8888/myapp/api/calculateFees";
    "http://192.168.173.143:8080/feesServer/api/calculateFees";//      crunchifyService";

    public par = new HttpParams();
    private data:MoneyTransferData = new MoneyTransferData();
    private feeIncoming:FeeIncomingInfo = new FeeIncomingInfo();

    constructor(private _http:Http) {}

    /**
     * use post request to URL fee calculation with json request TransferInfo and suppose to get a json for response
     * @param info 
     */
    public startFeesCalculation(info:MoneyTransferData): Observable<FeeIncomingInfo> {
        console.log('starting with post fees calculation');
        console.log(info);
        let json:string = this.genteratePostJson(info);
        console.log(json);

        // setTimeout(() => {
        // this.setMockService();
        // this.feesSubject.next(this.feeIncoming);    
        // }, 1000);

        return this._http.post(this.url,JSON.stringify(json)).map((res)=>{
            console.log("response is recived");
            console.log(res);
            
            //console.log(JSON.parse(res._body)); //here parsing the incmoing response
            
            //now just mocking the response info
            this.setMockService();

            this.feesSubject.next(this.feeIncoming);
            return this.feeIncoming;
        },
        (err)=>{
            console.log('error in response');
        }
    );

    }

    private setMockService(){
        this.feeIncoming.immidiateFee = 2.5+1;
        this.feeIncoming.immidiateBaseFee = 2.5;
        this.feeIncoming.immidiateTaxFee = 1;

        this.feeIncoming.nonUrgentFee = 2.0+0.5;
        this.feeIncoming.nonUrgentBaseFee = 2.0; 
        this.feeIncoming.nonUrgentTaxFee = 0.5;

        this.feeIncoming.urgentFee = 3.0+1.3
        this.feeIncoming.urgentBaseFee = 3.0
        this.feeIncoming.urgentTaxFee = 1.3

    }

    private genteratePostJson(data:MoneyTransferData):string{
        let json:string = `
        {
            "localoffice" : "FIN",
            "bdDebitamount" : 10,
            "bdCreditamount" : 10,
            "creditCurrency" : "${data.currency}",
            "debitCsutomer" : "myDebitCustomer",
            "creditCsutomer" : "myCreditCustomer",
            "productList" : [ "myProduct" ]
          }
        `;

        return json;
    }
    public isTransferInputValid(money:MoneyTransferData):boolean{
        if(money.account === "My Accounts" || money.amount<10 || money.bankName === undefined || money.cdtNumber === undefined){
            return false;
        }
        return true;
    }



    public setProduct(prod:string){
        this.data.productFee = prod;
    }
    public setFeePart(fee:string){
        this.data.feePart = fee;
    }

    public getProduct(){
        return this.data.productFee;
    }

    public getFeePart(){
        return this.data.feePart;
    }
}