import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';
import { Injectable, Inject, Optional, OpaqueToken } from '@angular/core';
import { Http, Headers, ResponseContentType, Response } from '@angular/http';
import { SwaggerException } from '../../../shared/service-proxies/service-proxies';
import { AppConsts } from "../../../shared/AppConsts";

//import * as moment from 'moment-timezone';
declare var moment;

export const API_BASE_URL = new OpaqueToken('API_BASE_URL');


@Injectable()
export class StripePaymentService {
    private http: Http;
    private baseUrl: string;
    protected jsonParseReviver: (key: string, value: any) => any = undefined;

    constructor(@Inject(Http) http: Http, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = AppConsts.remoteServiceBaseUrlFormat ? AppConsts.remoteServiceBaseUrlFormat : "";
    }

    /**
     * @return Success
     */
    sentPaymentData(input: any): Observable<any> {
        let url_ = this.baseUrl + "/api/services/app/CreditCardPayment/SubmitPaymentAsync";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(input);

        let options_ = {
            body: content_,
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json; charset=UTF-8"
            })
        };

        return this.http.request(url_, options_).flatMap((response_) => {
            return this.getData(response_);
        }).catch((response_: any) => {
            if (response_ instanceof Response) {
                return <Observable<any>><any>Observable.throw(response_);
            } else
                return <Observable<any>><any>Observable.throw(response_);
        });
    }

    protected getData(response: Response): Observable<any> {
        const status = response.status;

        if (status === 200) {
            const responseText = response.text();
            let result200: any = null;
            let resultData200 = responseText === "" ? null : JSON.parse(responseText, this.jsonParseReviver);
            result200 = resultData200;
            return Observable.of(result200);
        } else if (status !== 200 && status !== 204) {
            const responseText = response.text();
            return throwException("An unexpected server error occurred.", status, responseText);
        }
        return Observable.of<any>(<any>null);
    }
}


function throwException(message: string, status: number, response: string, result?: any): Observable<any> {
    if(result !== null && result !== undefined)
        return Observable.throw(result);
    else
        return Observable.throw(new SwaggerException(message, status, response, null));
}
