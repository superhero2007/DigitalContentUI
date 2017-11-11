import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {IcoService} from "@app/admin/ico-manager/ico-manager.service";

@Component({
  selector: 'app-ico-manager',
  templateUrl: './ico-manager.component.html',
  styleUrls: ['./ico-manager.component.scss']
})
export class IcoManagerComponent implements OnInit {

    queryParams : any = {
        Filter: '',
        Parameters : 'crypto',
        Sorting : 'Name',
        MaxResultCount: 10,
        SkipCount : 0
    };

    filterFocused : boolean = false;

    supportedCurrencies : any;
    showAddForm : boolean = false;
    searchRes : any  = [];
    _timeout: any = null;
    newCurrencyWalletId: any;

    icoData : any = {};

    selectedCurrency: any;

    constructor(public _icoSerivce : IcoService) {}

    ngOnInit() {
        this._icoSerivce.getIcoData();
        this.icoData = this._icoSerivce.icoData;
        this._icoSerivce.getSupportedCurrencies();
        this.supportedCurrencies = this._icoSerivce._supportedCurrencies;

        this.searchRes = this._icoSerivce._currencies;
    }

    addNewSC() {
        this.showAddForm = !this.showAddForm;
    }

    getUpdatedCurrencies() {

        abp.ui.setBusy($('#AutoComplete'));
        (window as any).clearTimeout(this._timeout);

        this._timeout = window.setTimeout(() => {
            this._timeout = null;

            this._icoSerivce.getCurrencies(this.queryParams);
            abp.ui.clearBusy($('#AutoComplete'));

        },1000);
    }

    selectCurrency(currency) {
        console.log(currency);
        this.selectedCurrency = currency;
        this.filterFocused = false;
    }

    setFocus(b) {
        if(b) {
            this.filterFocused = b;
        }
    }

    addNewSupportedCurrency() {
        this._icoSerivce.addNewSupportedCurrency({
            id : this.selectedCurrency.id,
            walletId: this.newCurrencyWalletId,
            wiredInstruction :  ''
        }).subscribe(resp => {
            this._icoSerivce.getSupportedCurrencies();
            this.cancelCurrencyAdding();
        })
    }

    removeSupportedCurrency(c: any) {
        this._icoSerivce.removeSupportedCurrency(c.id);
    }

    cancelCurrencyAdding() {
        this.newCurrencyWalletId = null;
        this.selectedCurrency = null;
        this.filterFocused = false;
        this.addNewSC();
    }

    saveUpdateIcoData() {
        this._icoSerivce.updateIcoData(this.icoData);
    }
}
