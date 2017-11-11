import { Injectable, Inject, Optional, OpaqueToken } from '@angular/core';
import { Http} from '@angular/http';

import {dcHttpService} from "@app/services/dcHttpService";

export const API_BASE_URL = new OpaqueToken('API_BASE_URL');

@Injectable()
export class MySettingsModalServices {
    protected jsonParseReviver: (key: string, value: any) => any = undefined;
    paymentData:any;

    constructor( private dcHttpService:dcHttpService,
                 @Inject(Http) http: Http,
                 @Optional() @Inject(API_BASE_URL) baseUrl?: string) {

    }


    getSupportedWallets(){
        let url = '/api/services/app/Currencies/GetSupportedCurrencies';
        return this.dcHttpService.httpCall(url, "get");
    }
    updateSupportedWallets(data){
        let url = '/api/services/app/Currencies/UpdateSupportedCurrencies';
        return this.dcHttpService.httpCall(url, "put", data);
    }

}
