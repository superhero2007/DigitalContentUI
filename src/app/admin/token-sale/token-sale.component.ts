import {Component,OnInit} from '@angular/core';
import { TokenSalesServices } from './token-sales.services';
import { AppSessionService } from '@shared/common/session/app-session.service';
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-token-sale',
  templateUrl: './token-sale.component.html',
  styleUrls: ['./token-sale.component.scss']
})

export class TokenSaleComponent implements OnInit {
    currenciesArr : Array<any>;
    tokensCount : number = 5;
    tokenPrice : number = 17.94;
    purchaseType : string = null;
    selectedCurrency : any;
    usdCount : any;
    selectedAddress : any;
    walletAddress : string = '';
    tokenRate : number = 17.94;
    currencyQuery : string;
    sub : any = [];

    constructor(
      public session: AppSessionService,
      public TokenSalesServices: TokenSalesServices,
      public router: Router,
      public route: ActivatedRoute,
    ) {
        this.selectedCurrency={}
    }

    ngOnInit() {
        this.exchangeRateCall();

        this.sub = this.route
            .queryParams
            .subscribe(params => {
                this.currencyQuery = params["currency"];
                console.log(this.currencyQuery);
            });
    }

    ngOnDesctroy() {
        this.sub.unsubscribe();
    }

    presetTokens(count) {
      this.tokensCount = count;
      this.calculateUSDCount();
    }

    selectCurrencyType(c) {
        this.selectedCurrency = c;
        this.calculateUSDCount();
    }

    purchase(type){

        let _d = {
          "walletId": this.walletAddress,
          "address": '',
          "amount":  '' +this.tokensCount+ '',
          "currencyId": this.selectedCurrency.currency.id,
          "userId" : this.session.userId,
          "currencyCode": this.selectedCurrency.currency.code,
          "currencyUrlImg": this.selectedCurrency.currency.imageUrl,
          "qrCode":'null',
          "instruction":'null'
        };


      this.TokenSalesServices.postPurchaseTokens(_d)
          .finally(() => {})
          .subscribe((result) => {
               _d.address = result.address;
               _d.instruction = result.instruction;
               _d.qrCode = result.qrCode;
                Object.assign(this.TokenSalesServices.paymentData, _d);

              this.router.navigate([`/app/admin/token-sale-payment`]);
              this.purchaseType = type;

          });

    }
    exchangeRateCall(){
        this.TokenSalesServices.getGetBtcEthValue()
            .finally(() => {
            })
            .subscribe((result) => {
                result = result.filter((s => a => !s.has(a.currency.code) && s.add(a.currency.code))(new Set));
                result = result.filter(function(el){
                    return el.currency.code !== "SLVT";
                });

                this.currenciesArr = result.reverse();
                this.selectedCurrency = this.currenciesArr[0];
                // this.tokenPrice = this.selectedCurrency.price;
                this.calculateUSDCount();
                this.setTokenRate();

                if(this.currencyQuery !== undefined) {
                    for(let c of this.currenciesArr) {
                        if(c.currency.code == this.currencyQuery) {
                            this.selectCurrencyType(c);
                        }
                    }
                }


        });


    }
    calculateUSDCount(){
        if(this.selectedCurrency.currency.code == "USD") {
            this.usdCount = ((this.tokensCount * this.tokenRate)).toFixed(2);
        } else{
            this.usdCount = ((this.tokensCount * this.tokenRate)/this.selectedCurrency.price).toFixed(8);
        }
    };

    setTokenRate(){
        const result = this.currenciesArr.filter(function( curr ) {
            return curr.currnecyType == "dcnt";
        });
    }

    removeDublicateFromArr(result){
        return result.filter((s => a => !s.has(a.currency.code) && s.add(a.currency.code))(new Set));
    }
}


