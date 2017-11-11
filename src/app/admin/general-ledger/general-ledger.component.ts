import { Component, OnInit } from '@angular/core';
import {GeneralLedgerService} from "@app/admin/general-ledger/general-ledger.service";
@Component({
  selector: 'app-general-ledger',
  templateUrl: 'general-ledger.component.html',
  styleUrls: ['general-ledger.component.scss']
})
export class GeneralLedgerComponent implements OnInit {
    list : Array<any>;
    constructor(public GeneralLedgerService : GeneralLedgerService) {}

    ngOnInit() {
        this.GeneralLedgerService.getData();
        this.list = this.GeneralLedgerService.data;

    }
}
