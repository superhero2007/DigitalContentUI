import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { UserServiceProxy, UserListDto, EntityDtoOfInt64 } from '@shared/service-proxies/service-proxies';
import { NotifyService } from '@abp/notify/notify.service';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { DataTable } from 'primeng/components/datatable/datatable';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import {CreateOrEditUserModalComponent} from "@app/admin/users/create-or-edit-user-modal.component";
import {EditUserPermissionsModalComponent} from "@app/admin/users/edit-user-permissions-modal.component";
import { CurrencyManagementService } from "./currency-management.service";
import {InfoModalComponent} from "@app/admin/user-payment/payment-modal.component";


@Component({
  selector: 'app-currency-management',
  templateUrl: './currency-management.component.html',
  styleUrls: ['./currency-management.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()]
})
export class CurrencyManagementComponent extends AppComponentBase {


    ngOnInit() {

    }

    @ViewChild('createOrEditUserModal') createOrEditUserModal: CreateOrEditUserModalComponent;
    @ViewChild('editUserPermissionsModal') editUserPermissionsModal: EditUserPermissionsModalComponent;
    @ViewChild('dataTable') dataTable: DataTable;
    @ViewChild('paginator') paginator: Paginator;
    @ViewChild(InfoModalComponent)  infoModal : InfoModalComponent;

    //Filters
    advancedFiltersAreShown: boolean = false;
    filterText: string = '';
    selectedPermission: string = '';
    role: number = undefined;
    test:any;
    record: any;

    constructor(
        injector: Injector,
        private _http: Http,
        private _userServiceProxy: UserServiceProxy,
        private _notifyService: NotifyService,
        private _fileDownloadService: FileDownloadService,
        private  currenciesService: CurrencyManagementService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute
    ) {
        super(injector);
        this.filterText = this._activatedRoute.snapshot.queryParams['filterText'] || '';
    }

    getCryptoCurrencies(event?: LazyLoadEvent) {
        const sorting = this.primengDatatableHelper.getSorting(this.dataTable);
        const maxResultCount = this.primengDatatableHelper.getMaxResultCount(this.paginator, event);
        const skipCount = this.primengDatatableHelper.getSkipCount(this.paginator, event);

        this.currenciesService.getCryptoCurrencies(sorting, maxResultCount, skipCount)
            .finally(() => {
            })
            .subscribe((result) => {
            console.log(result);
                this.tableParser(result.items);
                this.primengDatatableHelper.totalRecordsCount = result.totalCount;
                this.primengDatatableHelper.records =  this.tableParser(result.items);
                this.primengDatatableHelper.hideLoadingIndicator();

            });
        this.primengDatatableHelper.showLoadingIndicator();

    }

    unlockUser(record): void {
        this._userServiceProxy.unlockUser(new EntityDtoOfInt64({ id: record.id })).subscribe(() => {
            this.notify.success(this.l('UnlockedTheUser', record.userName));
        });
    }

    getRolesAsString(roles): string {
        var roleNames = '';

        for (var j = 0; j < roles.length; j++) {
            if (roleNames.length) {
                roleNames = roleNames + ', ';
            }
            roleNames = roleNames + roles[j].roleName;
        };
        return roleNames;
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage(), null);;
    }

    exportToExcel(): void {
        this._userServiceProxy.getUsersToExcel()
            .subscribe(result => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }

    createUser(): void {
        this.createOrEditUserModal.show();
    }

    deleteUser(user: UserListDto): void {
        if (user.userName === AppConsts.userManagement.defaultAdminUserName) {
            this.message.warn(this.l("{0}UserCannotBeDeleted", AppConsts.userManagement.defaultAdminUserName));
            return;
        }

        this.message.confirm(
            this.l('UserDeleteWarningMessage', user.userName),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._userServiceProxy.deleteUser(user.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }
    showModal(record) {
        this.infoModal.showInfoModal(record);
        console.log(record);
    }

    tableParser(arrOfItems){
        return arrOfItems;
    }




}
