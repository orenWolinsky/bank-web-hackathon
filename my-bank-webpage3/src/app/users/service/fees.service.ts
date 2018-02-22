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
import { HttpModule, Http, RequestOptions,Headers } from '@angular/http';
import { FeeIncomingInfo } from '../class/feeIncomingInfo';
import { MopService } from './mop.service';
import { FeeResults } from '../class/feeresults';
import { FeeResult } from '../json/feeresult.json';
//import { Headers } from '@angular/http/src/headers';

@Injectable()
export class FeesService{

    public feesSubject:Subject<FeeIncomingInfo> = new Subject();//should be array of feejsons //try working with task json
    public strArr: string[];
    public url:string = 
    //"http://192.168.173.143:8080/CrunchifyTutorials/api/crunchifyService";//      working old version
    //"http://192.168.173.143:8080/feesServer/api/calculateFees"; // working local API
    "http://192.168.169.59:8888/myapp/api/calculateFees"; //docker URL

    public par = new HttpParams();
    private data:MoneyTransferData = new MoneyTransferData();
    private feeIncoming:FeeIncomingInfo = new FeeIncomingInfo();


    //
    private head:Headers = new Headers();
    

    constructor(private _http:Http) {}

    /**
     * use post request to URL fee calculation with json request TransferInfo and suppose to get a json for response
     * @param info 
     */
    public startFeesCalculation(info:MoneyTransferData): Observable<FeeIncomingInfo> {
        console.log('Requesting Fees Calculation [START]');
        

        let jason = {
            localoffice:"FIN",
            bdDebitamount:info.amount,//
            bdCreditamount:info.amount,//
            creditCurrency:info.currency, //real currency
            debitCsutomer:info.account, //my account
            creditCsutomer:info.cdtNumber, //
            productList: MopService.mopList//imidate sha our ben but wait, i don't choose it yet!
        };
         
        console.log('Request:Request:Request:Request:');
        console.log(jason);
        let body = JSON.stringify(jason);
        console.log('Requesting Fees Calculation [END]');

        return this._http.post(this.url,body).map((res:any)=>{
            console.log("Response is recived:Response:Response:Response:");
            console.log(res);
            
            let answer = JSON.parse(res._body); 
            console.log(answer);

            let rsltFees = answer.feesResults;
            console.log(rsltFees);
            this.parseIncomingImmediateFee(rsltFees.Immediate);
            this.parseIncomingUrgentFee(rsltFees.SameDay);
            this.parseIncomingNonUrgentFee(rsltFees.TwoDaysDelivery);

            this.feesSubject.next(this.feeIncoming);
            console.log('Updating DOM with fees results');
            return this.feeIncoming;
        },
    );

    }

    /** HERE MAKE SURE THER IS NO NULL POINTER EXCEPTION OR SOMETHING */
    private parseIncomingImmediateFee(feeJson){
        //set immediate fee
        //debugger;
        this.feeIncoming.immidiateCableFee = feeJson.CableFees ? feeJson.CableFees:3.2;
        this.feeIncoming.immidiateInternationalFee = feeJson.InternationalFees? feeJson.InternationalFees: 1.5;
        this.feeIncoming.immidiateTaxFee = feeJson.TaxFees?feeJson.TaxFees:0.5;     
        this.feeIncoming.immidiateFee = this.feeIncoming.totalImmidiateFee();
    }

    private parseIncomingUrgentFee(feeJson){
        //set urgent fee
        this.feeIncoming.urgentCableFee = feeJson.CableFees?feeJson.CableFees:3.5;
        this.feeIncoming.urgentInternationalFee = feeJson.InternationalFees?feeJson.InternationalFees:2.5;
        this.feeIncoming.urgentTaxFee = feeJson.TaxFees?feeJson.TaxFees:0.7;
        this.feeIncoming.urgentFee = this.feeIncoming.totalUrgenteFee();  
    }

    private parseIncomingNonUrgentFee(feeJson){
        //set non urgent fee
        this.feeIncoming.nonUrgentCableFee = feeJson.CableFees?feeJson.CableFees:1.2;
        this.feeIncoming.nonUrgentInternationalFee = feeJson.InternationalFees?feeJson.InternationalFees:2.5;
        this.feeIncoming.nonUrgentTaxFee = feeJson.TaxFees?feeJson.TaxFees:0.3;
        this.feeIncoming.nonUrgentFee = this.feeIncoming.totalNonUrgentFee();        
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


    public setMockingService(){
        this.feeIncoming.immidiateCableFee = 3.5;
        this.feeIncoming.immidiateInternationalFee = 1.5;
        this.feeIncoming.immidiateTaxFee = 0.7;
        this.feeIncoming.immidiateFee = this.feeIncoming.totalImmidiateFee();

        //set urgent fee
        this.feeIncoming.urgentCableFee = 2.5;
        this.feeIncoming.urgentInternationalFee = 0.8;
        this.feeIncoming.urgentTaxFee = 0.5;
        this.feeIncoming.urgentFee = this.feeIncoming.totalUrgenteFee();

        //set non urgent fee
        this.feeIncoming.nonUrgentCableFee = 1.5;
        this.feeIncoming.nonUrgentInternationalFee = 0.5;
        this.feeIncoming.nonUrgentTaxFee = 0.3;
        this.feeIncoming.nonUrgentFee = this.feeIncoming.totalNonUrgentFee();

        this.feesSubject.next(this.feeIncoming);
    }

}