import { Injectable } from '@angular/core';
import {dcHttpService} from "@app/services/dcHttpService";

@Injectable()
export class PaymentService {

    constructor(
        private  dcHttpService:dcHttpService,

    ) {}


    getUsersPayment(sorting, maxResultCount, skipCount, walletId?, isRescind?){
        let url = '/api/services/app/CreditCardPayment/GetAllTransactions?';

        if (sorting !== undefined)
            url += "Sorting=" + encodeURIComponent("" + sorting) + "&";
        if (maxResultCount !== undefined)
            url += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
        if (skipCount !== undefined)
            url += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
        if (walletId !== undefined)
            url += "walletId=" + encodeURIComponent("" + walletId) + "&";
        if (isRescind !== undefined)
            url += "isRescind=" + encodeURIComponent("" + true) + "&";
        console.log(url);
        return this.dcHttpService.httpCall(url, "get");
    }

    getUsersPaymentNew(sortingObj, walletId?, isRescind?){
        let url = '/api/services/app/CreditCardPayment/GetAllTransactions?';

        if (sortingObj.sorting !== undefined)
            url += "Sorting=" + encodeURIComponent("" + sortingObj.sorting) + "&";
        if (sortingObj.maxResultCount !== undefined)
            url += "MaxResultCount=" + encodeURIComponent("" + sortingObj.maxResultCount) + "&";
        if (sortingObj.skipCount !== undefined)
            url += "SkipCount=" + encodeURIComponent("" + sortingObj.skipCount) + "&";
        if (walletId !== undefined)
            url += "walletId=" + encodeURIComponent("" + walletId) + "&";
        if (isRescind !== undefined)
            url += "isRescind=" + encodeURIComponent("" + true) + "&";
        console.log(url);
        return this.dcHttpService.httpCall(url, "get");
    }
    getUpdatedPeyments(){
        return this.dcHttpService.httpCall('/api/services/app/CreditCardPayment/GetAllTransactions?MaxResultCount=10&SkipCount=0&', "get");
    }
   deletePayment(data){
        return this.dcHttpService.httpCall('/api/services/app/CreditCardPayment/RescindCommitment', "post", data);
    }


}
