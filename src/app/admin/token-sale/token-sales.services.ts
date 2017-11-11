import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';
import { Injectable, Inject, Optional, OpaqueToken } from '@angular/core';
import { Http, Headers, ResponseContentType, Response } from '@angular/http';
import { SwaggerException } from '../../../shared/service-proxies/service-proxies';
import { AppConsts } from "../../../shared/AppConsts";

import * as moment from 'moment';
import {dcHttpService} from "@app/services/dcHttpService";

export const API_BASE_URL = new OpaqueToken('API_BASE_URL');

@Injectable()
export class TokenSalesServices {
    protected jsonParseReviver: (key: string, value: any) => any = undefined;

    paymentData:any = {};

    constructor( private dcHttpService:dcHttpService,
        @Inject(Http) http: Http,
                @Optional() @Inject(API_BASE_URL) baseUrl?: string) {

    }

    getGetBtcEthValue(){
        return this.dcHttpService.httpCall("/api/services/app/Wallet/GetBtcEthValue", "get");
    }

    postPurchaseTokens(data){
        return this.dcHttpService.httpCall("/api/services/app/Wallet/purchaseTokens", "post", data);
    }

}



