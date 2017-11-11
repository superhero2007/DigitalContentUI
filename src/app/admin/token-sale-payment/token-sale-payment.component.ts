import {Component, OnInit} from '@angular/core';
import { AppSessionService } from '@shared/common/session/app-session.service';
import {TokenSalesServices} from "@app/admin/token-sale/token-sales.services";
import {Router} from "@angular/router";
@Component({
    selector: 'app-token-sale-payment',
    templateUrl: './token-sale-payment.component.html',
    styleUrls: ['./token-sale-payment.component.scss']
})
export class TokenSalePaymentComponent implements OnInit {

    paymentTypeDcnt: boolean;
    userPaymentData:any;

    constructor(
        public session: AppSessionService,
        public tokenSalesServices: TokenSalesServices,
        public router: Router
    ) {}


    ngOnInit() {
        this.userPaymentData = this.tokenSalesServices.paymentData;
        if(!this.userPaymentData || !this.userPaymentData.currencyCode){
            this.router.navigate([`/app/admin/token-sale`]);
        }
    }

}



