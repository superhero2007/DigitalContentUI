
import { Injectable, Inject, Optional, OpaqueToken } from '@angular/core';
import { Http} from '@angular/http';

import {dcHttpService} from "@app/services/dcHttpService";

export const API_BASE_URL = new OpaqueToken('API_BASE_URL');

@Injectable()
export class PaymentModalServices {
    protected jsonParseReviver: (key: string, value: any) => any = undefined;
    paymentData:any;

    constructor( private dcHttpService:dcHttpService,
                 @Inject(Http) http: Http,
                 @Optional() @Inject(API_BASE_URL) baseUrl?: string) {

    }


    getPaymentByWallet(walletId){
        let url = '/api/services/app/CreditCardPayment/GetAllTransactions?WalletId='+walletId;
        return this.dcHttpService.httpCall(url, "get");
    }

    updateTransaction(data){
        return this.dcHttpService.httpCall("/api/services/app/Payment/CreatePaymentManually", "post", data);
    }

}
