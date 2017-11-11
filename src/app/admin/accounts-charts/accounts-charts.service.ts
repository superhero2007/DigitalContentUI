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
import { SwaggerException } from '@shared/service-proxies/service-proxies';
import { AppConsts } from "@shared/AppConsts";
import { dcHttpService } from "@app/services/dcHttpService";
import { GLDemoData } from './accounts-charts.demodata'
import * as moment from 'moment';

export const API_BASE_URL = new OpaqueToken('API_BASE_URL');

@Injectable()
export class AccountChartsService {
    private http: Http;
    private baseUrl: string;
    protected jsonParseReviver: (key: string, value: any) => any = undefined;
    _data: any = [];

    constructor( private dcHttpService:dcHttpService,
                 @Inject(Http) http: Http,
                 @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = AppConsts.remoteServiceBaseUrl ? AppConsts.remoteServiceBaseUrl : "";
    }

    get data() {
        return this._data;
    }

    getData(){

        this._data = GLDemoData;

        this._data.map(item => {
            item.date = moment(item.date, 'M/D/YYYY').format('DD MMM YYYY');
        });

        // this.dcHttpService.httpCall("/api/services/app/Wallet/GetBtcEthValue", "get").subscribe();
    }

}



