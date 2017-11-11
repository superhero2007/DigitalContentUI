import {Component, Input} from '@angular/core';
import {StripePaymentService} from "@app/admin/stripe-payment-form/stripe-payment-form.service";
import {NgForm} from '@angular/forms';


@Component({
    selector: 'app-stripe-payment-form',
    templateUrl: './stripe-payment-form-component.html',
    styleUrls: ['./stripe-payment-form.scss'],
    // directives: [REACTIVE_FORM_DIRECTIVES]
})
export class StripePaymentFormComponent {
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvc: string;
    message: string;
    amount: any;

    firstName:string;
    lastName:string;
    address1:string;
    // address2:string;
    city:string;
    // country:string;
    state:string;
    zipCode:string;
    phone:string;
    nameCard:string;

    @Input() userPaymentData:any;


    constructor(private stripePaymentService: StripePaymentService){

    }

    getToken(value) {
        console.log(value);
        this.message = 'Loading...';
        (<any>window).Stripe.setPublishableKey('pk_test_jxLxJgPLkigUTs2G6L8IJH8A');
        console.log( (<any>window).Stripe);
        (<any>window).Stripe.card.createToken({

            number: value.cardNumber,
            exp_month: value.expiryMonth,
            exp_year: value.expiryYear,
            cvc: value.cvc

        }, (status: number, response: any) => {
            if (status === 200) {
                const req = {
                      userData:this.getUserData(value, this.userPaymentData),
                      paymentData:response
                };

                this.stripePaymentService.sentPaymentData(req)
                    .finally(() => {
                    })
                    .subscribe((result) => {
                        alert('Payment is successed');
                    });

            }
        });


    }

    getUserData(value, userPaymentData){
        userPaymentData.currentType = (userPaymentData.currentType == 'dcnt') ? 'usd' : userPaymentData.currentType;
        return  {
            firstName:value.firstName,
            lastName:value.lastName,
            address1:value.address1,
            // address2:value.address2,
            city:value.city,
            // country:value.country,
            state:value.state,
            zipCode:value.zipCode,
            phoneNumber:value.phone,
            nameCard:value.nameCard,
            userPaymentData:userPaymentData
        }
    }
    sentPayment(cardId){
        this.stripePaymentService.sentPaymentData(cardId).subscribe(response =>{
            console.log(response);
        }, error =>{
            console.log(error)
        });
    }

}


