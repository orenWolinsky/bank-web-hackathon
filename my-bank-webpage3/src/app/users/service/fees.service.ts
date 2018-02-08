import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core/testing';
import {TransferInfo} from "../json/transferInfo.json";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FeesService{

    public feesSubject:Subject<string[]> = new Subject();//should be array of feejsons //try working with task json
    public strArr: string[];

    /**
     * 
     * fees server should be activated during calculate fees button. one they are recived. then feesubjst should emiit the change to
     * observer for the fees results.
     * 
     * later on i should see how i pass the whole result and save it to sha our ben
     */
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

    /**
     * so money should use the get calculation
     * later is should update another service method with the updates.
     * and that mthod should have an observer and it will emit the changes to mop component
     * 
     * 
     */
}