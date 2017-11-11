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
import {TokenSalesServices} from "@app/admin/token-sale/token-sales.services";

export const API_BASE_URL = new OpaqueToken('API_BASE_URL');

@Injectable()
export class DashboardService {
    private http: Http;
    private baseUrl: string;
    protected jsonParseReviver: (key: string, value: any) => any = undefined;
    _data: any = {};
    public _rates: any = {};

    constructor( private dcHttpService:dcHttpService,
                 @Inject(Http) http: Http,
                 public TokenSalesServices : TokenSalesServices,
                 @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = AppConsts.remoteServiceBaseUrl ? AppConsts.remoteServiceBaseUrl : "";
    }

    get data() {
        return this._data;
    }

    get rates() {
        return this._rates;
    }

    getRates() {
        this.TokenSalesServices.getGetBtcEthValue().subscribe(resp => {
            Object.assign(this._rates, {
                rates : resp.filter(function(el){
                    return el.currency.code !== "DCNT";
                })
            });
        })
    }

    getData(){
        this.dcHttpService.httpCall("/api/services/app/Dashboard/GetDashboardDataForUser", "get").subscribe(resp => {
            Object.assign(this._data, resp);
        });
    }

}



