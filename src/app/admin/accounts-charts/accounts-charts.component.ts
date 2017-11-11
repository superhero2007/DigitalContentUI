import { Component, OnInit } from '@angular/core';
import {AccountChartsService} from "@app/admin/accounts-charts/accounts-charts.service";

@Component({
  selector: 'app-accounts-charts',
  templateUrl: 'accounts-charts.component.html',
  styleUrls: ['accounts-charts.component.scss']
})

export class AccountChartsComponent implements OnInit {
    list : Array<any>;
    constructor(public AccountChartsService : AccountChartsService) {}

    ngOnInit() {
        this.AccountChartsService.getData();
        this.list = this.AccountChartsService.data;

    }
}
