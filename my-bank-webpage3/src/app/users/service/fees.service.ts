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
    "http://192.168.173.143:8080/feesServer/api/calculateFees"; // working local API
    //"http://192.168.169.59:8888/myapp/api/calculateFees"; //docker URL

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
        console.log('starting with post fees calculation');
        console.log(info);

        let jason = {
            localoffice:"FIN",
            bdDebitamount:info.amount,//
            bdCreditamount:info.amount,//
            creditCurrency:info.currency, //real currency
            debitCsutomer:info.account, //my account
            creditCsutomer:info.cdtNumber, //
            productList: MopService.mopList//imidate sha our ben but wait, i don't choose it yet!
        };
		 
        console.log(jason);
        let body = JSON.stringify(jason);

        return this._http.post(this.url,body).map((res:any)=>{
            console.log("response is recived");
            console.log(res);
            
            let answer = JSON.parse(res._body); 
            console.log(answer);
            let feeResult:FeeResults = new FeeResults();

            console.log(answer.feesResults);
            console.log(answer.feesResults.Immediate);
            let map1:Map<string,string> = new Map<string,string>();
            map1 = answer.feesResults.Immediate;
            console.log();

            this.feesSubject.next(this.feeIncoming);

            return this.feeIncoming;
        },
    );

    }

    /** HERE MAKE SURE THER IS NO NULL POINTER EXCEPTION OR SOMETHING */
    private parseIncomingFeesToFeeIncoming(feeJson:FeeResults){
        //set immediate fee
        this.feeIncoming.immidiateFee = feeJson.feeResult.get(MopService.mopList[0]).get("") | 3.0;
        this.feeIncoming.immidiateCableFee = feeJson.feeResult.get(MopService.mopList[0]).get("") | 2.5;
        this.feeIncoming.immidiateInternationalFee = feeJson.feeResult.get(MopService.mopList[0]).get("") | 2.5;
        this.feeIncoming.immidiateTaxFee =feeJson.feeResult.get(MopService.mopList[0]).get("") | 0.5;

        //set urgent fee
        this.feeIncoming.urgentFee = feeJson.feeResult.get(MopService.mopList[1]).get("") | 4.2;
        this.feeIncoming.urgentCableFee = feeJson.feeResult.get(MopService.mopList[1]).get("") | 3.5;
        this.feeIncoming.urgentInternationalFee = feeJson.feeResult.get(MopService.mopList[0]).get("") | 2.5;
        this.feeIncoming.urgentTaxFee = feeJson.feeResult.get(MopService.mopList[1]).get("") | 0.7;

        //set non urgent fee
        this.feeIncoming.nonUrgentFee = feeJson.feeResult.get(MopService.mopList[2]).get("") | 1.5;
        this.feeIncoming.nonUrgentCableFee = feeJson.feeResult.get(MopService.mopList[2]).get("") | 1.2;
        this.feeIncoming.nonUrgentInternationalFee = feeJson.feeResult.get(MopService.mopList[0]).get("") | 2.5;
        this.feeIncoming.nonUrgentTaxFee = feeJson.feeResult.get(MopService.mopList[2]).get("") | 0.3;
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