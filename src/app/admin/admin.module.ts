import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ModalModule, TabsModule, TooltipModule, PopoverModule } from 'ngx-bootstrap';
import { FileUploadModule } from '@node_modules/ng2-file-upload';
import { AdminRoutingModule } from './admin-routing.module'
import { UtilsModule } from '@shared/utils/utils.module'
import { AppCommonModule } from '@app/shared/common/app-common.module'
import { NgDatepickerModule } from 'ng2-datepicker';
import { UsersComponent } from './users/users.component'
import { PermissionComboComponent } from '@app/shared/permission-combo.component';
import { RoleComboComponent } from '@app/shared/role-combo.component';
import { CreateOrEditUserModalComponent } from './users/create-or-edit-user-modal.component'
import { EditUserPermissionsModalComponent } from './users/edit-user-permissions-modal.component';
import { PermissionTreeComponent } from '@app/shared/permission-tree.component';
import { FeatureTreeComponent } from '@app/shared/feature-tree.component';
import { WorkFlowDesigner } from './designer/designer.component';
import { RolesComponent } from './roles/roles.component'
import { CreateOrEditRoleModalComponent } from './roles/create-or-edit-role-modal.component'
import { ImpersonationService } from './users/impersonation.service';
import { TokenSalesServices } from './token-sale/token-sales.services';
import { LanguagesComponent } from './languages/languages.component';
import { LanguageTextsComponent } from './languages/language-texts.component';
import { CreateOrEditLanguageModalComponent } from './languages/create-or-edit-language-modal.component';
import { EditTextModalComponent } from './languages/edit-text-modal.component';
import { EditionComboComponent } from '@app/shared/edition-combo.component';
import {CalendarModule, DataTableModule, RadioButtonModule} from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { EditorModule } from 'primeng/primeng';
import { FileUploadModule as PrimeNgFileUploadModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { InputMaskModule } from 'primeng/primeng';
import { TokenSaleComponent } from './token-sale/token-sale.component';
import { UserPaymentComponent } from './user-payment/user-payment.component';
import {PaymentService} from "@app/admin/user-payment/payment.service";
import { InfoModalComponent } from "@app/admin/user-payment/payment-modal.component";
import {PaymentModalServices} from "@app/admin/user-payment/payment-modal.service";
import { StripePaymentFormComponent } from "@app/admin/stripe-payment-form/stripe-payment-form.component";
import { StripePaymentService } from "@app/admin/stripe-payment-form/stripe-payment-form.service";
import { TokenSalePaymentComponent } from "@app/admin/token-sale-payment/token-sale-payment.component";
import { dcHttpService } from "@app/services/dcHttpService";
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService } from "@app/admin/dashboard/dashboard.service";
import { QuillModule } from "ngx-quill";
import { TosEditorComponent } from './tos-editor/tos-editor.component';
import { TosEditorService } from "@app/admin/tos-editor/tos-editor.service";
import { RoadmapBuilderComponent } from './roadmap-builder/roadmap-builder.component';
import { RoadMapService } from "@app/admin/roadmap-builder/roadmap-builder.service";
import { RoadmapFormComponent } from './roadmap-builder/roadmap-form/roadmap-form.component';
import { GeneralLedgerComponent } from './general-ledger/general-ledger.component';
import { GeneralLedgerService } from "@app/admin/general-ledger/general-ledger.service";
import { AccountChartsComponent } from "@app/admin/accounts-charts/accounts-charts.component";
import { AccountChartsService } from "@app/admin/accounts-charts/accounts-charts.service";
import { TenantsComponent } from "@app/admin/tenants/tenants.component";
import {CreateTenantModalComponent} from "@app/admin/tenants/create-tenant-modal.component";
import {TenantFeaturesModalComponent} from "@app/admin/tenants/tenant-features-modal.component";
import {EditTenantModalComponent} from "@app/admin/tenants/edit-tenant-modal.component";
import {TenantSettingsComponent} from "@app/admin/settings/tenant-settings.component";
import {HostSettingsComponent} from "@app/admin/settings/host-settings.component";
import {CurrencyManagementComponent} from "@app/admin/currency-management/currency-management.component";
import {CurrencyManagementService} from "@app/admin/currency-management/currency-management.service";
import {TabMenuModule, TabViewModule, ConfirmDialogModule, ConfirmationService} from 'primeng/primeng';
import {ToggleButtonModule} from "primeng/components/togglebutton/togglebutton";
import { IcoManagerComponent } from './ico-manager/ico-manager.component';
import {IcoService} from "@app/admin/ico-manager/ico-manager.service";

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        FileUploadModule,
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
        PopoverModule.forRoot(),
        AdminRoutingModule,
        UtilsModule,
        AppCommonModule,
        DataTableModule,
        PaginatorModule,
        PrimeNgFileUploadModule,
        AutoCompleteModule,
        EditorModule,
        InputMaskModule,
        CalendarModule,
        RadioButtonModule,
        QuillModule,
        NgDatepickerModule,
        TabMenuModule,
        TabViewModule,
        ConfirmDialogModule,
        ToggleButtonModule

    ],
    declarations: [
        UsersComponent,
        PermissionComboComponent,
        RoleComboComponent,
        CreateOrEditUserModalComponent,
        EditUserPermissionsModalComponent,
        FeatureTreeComponent,
        RolesComponent,
        CreateOrEditRoleModalComponent,
        LanguagesComponent,
        LanguageTextsComponent,
        CreateOrEditLanguageModalComponent,
        CreateOrEditLanguageModalComponent,
        EditTextModalComponent,
        EditionComboComponent,
        WorkFlowDesigner,
        TokenSaleComponent,
        StripePaymentFormComponent,
        TokenSalePaymentComponent,
        UserPaymentComponent,
        InfoModalComponent,
        DashboardComponent,
        TosEditorComponent,
        RoadmapBuilderComponent,
        RoadmapFormComponent,
        GeneralLedgerComponent,
        AccountChartsComponent,
        TenantsComponent,
        TenantFeaturesModalComponent,
        EditTenantModalComponent,
        CreateTenantModalComponent,
        TenantSettingsComponent,
        HostSettingsComponent,
        PermissionTreeComponent,
        CurrencyManagementComponent,
        IcoManagerComponent
    ],
    exports: [],
    providers: [
        ImpersonationService,
        TokenSalesServices,
        StripePaymentService,
        dcHttpService,
        PaymentService,
        PaymentModalServices,
        DashboardService,
        TosEditorService,
        RoadMapService,
        GeneralLedgerService,
        AccountChartsService,
        CurrencyManagementService,
        ConfirmationService,
        IcoService


    ]
})
export class AdminModule {}
