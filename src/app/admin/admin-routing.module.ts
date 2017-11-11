import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { LanguagesComponent } from './languages/languages.component';
import { LanguageTextsComponent } from './languages/language-texts.component';
import { WorkFlowDesigner } from './designer/designer.component';
import { TokenSaleComponent } from './token-sale/token-sale.component';
import { TokenSalePaymentComponent } from './token-sale-payment/token-sale-payment.component';
import { DashboardComponent } from "@app/admin/dashboard/dashboard.component";
import { TosEditorComponent } from "@app/admin/tos-editor/tos-editor.component";
import { RoadmapBuilderComponent } from "@app/admin/roadmap-builder/roadmap-builder.component";
import { GeneralLedgerComponent } from "@app/admin/general-ledger/general-ledger.component";
import {AccountChartsComponent} from "@app/admin/accounts-charts/accounts-charts.component";
import { UserPaymentComponent } from "app/admin/user-payment/user-payment.component";
import {TenantsComponent} from "@app/admin/tenants/tenants.component";
import {CurrencyManagementComponent} from "@app/admin/currency-management/currency-management.component";
import {IcoManagerComponent} from "@app/admin/ico-manager/ico-manager.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Administration.Users' } },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' } },
                    { path: 'dashboard', component: DashboardComponent, data: {} },
                    { path: 'tos', component: TosEditorComponent, data: {} },
                    { path: 'roadmap', component: RoadmapBuilderComponent, data: {} },
                    { path: 'ledger', component: GeneralLedgerComponent, data: {} },
                    { path: 'ac', component: AccountChartsComponent, data: {} },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Administration.Roles' } },
                    { path: 'languages', component: LanguagesComponent, data: { permission: 'Pages.Administration.Languages' } },
                    { path: 'languages/:name/texts', component: LanguageTextsComponent, data: { permission: 'Pages.Administration.Languages.ChangeTexts' } },
                    { path: 'designer', component: WorkFlowDesigner, data: { permission: 'Pages.DemoUiComponents' } },
                    { path: 'token-sale', component: TokenSaleComponent, data: { permission: 'Pages.DemoUiComponents'} },
                    { path: 'token-sale-payment', component: TokenSalePaymentComponent, data: { permission: 'Pages.DemoUiComponents' }},
                    { path: 'currency-management', component: CurrencyManagementComponent, data: { permission: 'Pages.DemoUiComponents' }},
                    { path: 'payment', component: UserPaymentComponent, data: { permission: 'Pages.Administration.Users' } },
                    { path: 'ico', component: IcoManagerComponent, data: { permission: 'Pages.Administration.Users' } }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})

export class AdminRoutingModule {

    constructor(private router: Router) {
        router.events.subscribe(() => {
            this.hideOpenDataTableDropdownMenus();
        });
    }

    hideOpenDataTableDropdownMenus(): void {
        let $dropdownMenus = $('.dropdown-menu.tether-element');
        $dropdownMenus.css({
            'display': 'none'
        });
    }

}
