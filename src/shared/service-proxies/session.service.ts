import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';
import { Injectable, Inject, Optional, OpaqueToken } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import {dcHttpService} from "@app/services/dcHttpService";
import {AppConsts} from "@shared/AppConsts";
import {
    GetCurrentLoginInformationsOutput, UpdateUserSignInTokenOutput,
    SwaggerException
} from "@shared/service-proxies/service-proxies";
import {environment} from "../../environments/environment";

//import * as moment from 'moment-timezone';
declare var moment;

export const API_BASE_URL = new OpaqueToken('API_BASE_URL');
@Injectable()
export class SessionServiceProxy {
    private http: Http;
    private baseUrl: string;
    protected jsonParseReviver: (key: string, value: any) => any = undefined;

    constructor(
        public dcHttp: dcHttpService,
        @Inject(Http) http: Http, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : environment.api;
    }

    /**
     * @return Success
     */
    getCurrentLoginInformations(): Observable<GetCurrentLoginInformationsOutput> {
        let url_ = this.baseUrl + "/api/services/app/Session/GetCurrentLoginInformations";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = "";

        let options_ = {
            body: content_,
            method: "get",
            headers: new Headers({
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json; charset=UTF-8"
            })
        };

        return this.http.request(url_, options_).flatMap((response_) => {
            return this.processGetCurrentLoginInformations(response_);
        }).catch((response_: any) => {
            if (response_ instanceof Response) {
                try {
                    return this.processGetCurrentLoginInformations(response_);
                } catch (e) {
                    return <Observable<GetCurrentLoginInformationsOutput>><any>Observable.throw(e);
                }
            } else
                return <Observable<GetCurrentLoginInformationsOutput>><any>Observable.throw(response_);
        });
    }

    getCurrentTenant(): any {
        return this.dcHttp.httpCall('/api/TokenAuth/GetTenant', 'get');
    }

    protected processGetCurrentLoginInformations(response: Response): Observable<GetCurrentLoginInformationsOutput> {
        const status = response.status;

        if (status === 200) {
            const responseText = response.text();
            let result200: GetCurrentLoginInformationsOutput = null;
            let resultData200 = responseText === "" ? null : JSON.parse(responseText, this.jsonParseReviver);
            result200 = resultData200 ? GetCurrentLoginInformationsOutput.fromJS(resultData200) : new GetCurrentLoginInformationsOutput();
            return Observable.of(result200);
        } else if (status !== 200 && status !== 204) {
            const responseText = response.text();
            return throwException("An unexpected server error occurred.", status, responseText);
        }
        return Observable.of<GetCurrentLoginInformationsOutput>(<any>null);
    }

    /**
     * @return Success
     */
    updateUserSignInToken(): Observable<UpdateUserSignInTokenOutput> {
        let url_ = this.baseUrl + "/api/services/app/Session/UpdateUserSignInToken";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = "";

        let options_ = {
            body: content_,
            method: "put",
            headers: new Headers({
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json; charset=UTF-8"
            })
        };

        return this.http.request(url_, options_).flatMap((response_) => {
            return this.processUpdateUserSignInToken(response_);
        }).catch((response_: any) => {
            if (response_ instanceof Response) {
                try {
                    return this.processUpdateUserSignInToken(response_);
                } catch (e) {
                    return <Observable<UpdateUserSignInTokenOutput>><any>Observable.throw(e);
                }
            } else
                return <Observable<UpdateUserSignInTokenOutput>><any>Observable.throw(response_);
        });
    }

    protected processUpdateUserSignInToken(response: Response): Observable<UpdateUserSignInTokenOutput> {
        const status = response.status;

        if (status === 200) {
            const responseText = response.text();
            let result200: UpdateUserSignInTokenOutput = null;
            let resultData200 = responseText === "" ? null : JSON.parse(responseText, this.jsonParseReviver);
            result200 = resultData200 ? UpdateUserSignInTokenOutput.fromJS(resultData200) : new UpdateUserSignInTokenOutput();
            return Observable.of(result200);
        } else if (status !== 200 && status !== 204) {
            const responseText = response.text();
            return throwException("An unexpected server error occurred.", status, responseText);
        }
        return Observable.of<UpdateUserSignInTokenOutput>(<any>null);
    }
}

function throwException(message: string, status: number, response: string, result?: any): Observable<any> {
    if(result !== null && result !== undefined)
        return Observable.throw(result);
    else
        return Observable.throw(new SwaggerException(message, status, response, null));
}
