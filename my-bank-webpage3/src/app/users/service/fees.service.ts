import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core/testing';
import {TransferInfo} from "../json/transferInfo.json";

@Injectable()
export class FeesService{

    constructor(private _httpService: HttpClient) {}

    public getFeesCalculation(info:TransferInfo): Observable<any[]> {
        console.log(info);
        
        return this._httpService.get<any[]>('https://nztodo.herokuapp.com/api/task/?format=json', {
            observe: 'response',
        })
            .map((res: HttpResponse<any[]>) => {
                const result:string[] = ["12","45","56","7"];
                return result;
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