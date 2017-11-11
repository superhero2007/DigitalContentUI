import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';
import { Injectable, Inject, Optional, OpaqueToken } from '@angular/core';
import { Http  } from '@angular/http';
import { AppConsts } from "../../../shared/AppConsts";
import { dcHttpService } from "@app/services/dcHttpService";
declare var swal;
export const API_BASE_URL = new OpaqueToken('API_BASE_URL');

@Injectable()
export class IcoService {
    private http: Http;
    private baseUrl: string;
    protected jsonParseReviver: (key: string, value: any) => any = undefined;
    _supportedCurrencies: any = {};
    _currencies: any = {};
    _icoData: any = {};

    constructor( private dcHttpService:dcHttpService,
                 @Inject(Http) http: Http,
                 @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = AppConsts.remoteServiceBaseUrl ? AppConsts.remoteServiceBaseUrl : "";
    }

    get supportedCurrencies() {
        return this._supportedCurrencies;
    }

    get currencies() {
        return this._currencies;
    }

    get icoData() {
        return this._icoData;
    }

    getSupportedCurrencies() {
        this.dcHttpService.httpCall("/api/services/app/Currencies/GetSupportedCurrencies", "get").subscribe(resp => {
            Object.assign(this._supportedCurrencies, resp);
        });
    }

    updateIcoData(data: any) {
        this.dcHttpService.httpCall("/api/services/app/Currencies/SaveICO", "post", data).subscribe(resp => {
            swal('ICO data updated!', '', 'success');
        });
    }

    getIcoData() {
        this.dcHttpService.httpCall("/api/services/app/Currencies/GetICO", "get").subscribe(resp => {
            Object.assign(this._icoData, resp);
        });
    }

    getCurrencies(params : any) {
        this.dcHttpService.httpCall("/api/services/app/Currencies/GetAvailableCurrencies", "get", params).subscribe(resp => {
            Object.assign(this._currencies, resp);
        });
    }

    addNewSupportedCurrency(data : any) {
        return this.dcHttpService.httpCall("/api/services/app/Currencies/AddSupportedCurrency", "post", data);
    }

    removeSupportedCurrency(id : any) {
        return this.dcHttpService.httpCall("/api/services/app/Currencies/RemoveSupportedCurrency", "delete", {id : id}).subscribe(()=> {
            this.getSupportedCurrencies();
        });
    }

}



