import { Component, OnInit } from '@angular/core';
import {DashboardService} from "@app/admin/dashboard/dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

    data : any;
    rates : any;

    constructor(
        public dashboardService : DashboardService
    ) {}

    ngOnInit() {

        this.dashboardService.getData();
        this.dashboardService.getRates();

        this.rates = this.dashboardService.rates;
        this.data = this.dashboardService.data;

    }

}
