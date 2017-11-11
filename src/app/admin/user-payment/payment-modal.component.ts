import {Component, Input, Output, OnInit, ViewChild, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {PaymentModalServices} from "@app/admin/user-payment/payment-modal.service";

import {RadioButtonModule} from 'primeng/primeng';
import {PaymentService} from "@app/admin/user-payment/payment.service";


@Component({
    selector: 'app-info-modal',
    templateUrl: './payment-modal.component.html'
})
export class InfoModalComponent implements OnInit {
    transactionEditForm;
    date:any;
    dateFull;
    timer;
    myForm:any;
    walletAddress:string;
    currencyOptionFiat:string;
    paymentType: string;
    selectedValue: string;
    currentRecord:any;
    @ViewChild(ModalDirective) public lgModal:ModalDirective;
    @Output() tableShouldUpdate = new EventEmitter(false);
    constructor(public paymentModalServices: PaymentModalServices,private  paymentService: PaymentService) {
        this.transactionEditForm={};

    }

    ngOnInit() {
        this.selectedValue = 'val1';
    }
    showInfoModal(record):void {
        this.currentRecord = record;
        console.log(record);
        console.log('records');
        if(record === undefined){
            this.transactionEditForm = Object.assign({},record);
            this.date = '';
            this.dateFull = '';
            this.timer = '';
            this.lgModal.show();
        }else{
        this.transactionEditForm = Object.assign({},record);
        this.date = new Date(this.transactionEditForm.creationTime);
        this.dateFull = (this.date.getMonth() + 1) + '/' + this.date.getDate() + '/' +  this.date.getFullYear();
        this.timer = this.date.toTimeString().slice(0,5);
        this.lgModal.show();
        }
    };

    receiveSearch(){

        if(this.walletAddress !== undefined){
            this.paymentModalServices.getPaymentByWallet(this.walletAddress)
                .finally(() => {})
                .subscribe((result) => {
                    console.log(result);
                    alert(result);
                });
        }
    }
    updateTransaction(data){
        data.paymentReceivedTime = '0001-01-01T00:00:00';
        data.trackingNumber = "0";
        data.currencyId = this.currentRecord.currency.id;
        data.transactionId  = this.currentRecord.id;
        console.log("Data save");
        console.log(data);

            this.paymentModalServices.updateTransaction(data)
                .finally(() => {})
                .subscribe((data) => {
                    console.log(data);
                    this.tableShouldUpdate.emit();
                    this.lgModal.hide();
                });
    }
}
