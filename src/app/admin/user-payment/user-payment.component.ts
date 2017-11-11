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
import { PaymentService } from "./payment.service";
import {InfoModalComponent} from "@app/admin/user-payment/payment-modal.component";
import {ConfirmationService} from "primeng/primeng";

declare var moment;

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.scss'],
    encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()]
})
export class UserPaymentComponent extends AppComponentBase {


    @ViewChild('createOrEditUserModal') createOrEditUserModal: CreateOrEditUserModalComponent;
    @ViewChild('editUserPermissionsModal') editUserPermissionsModal: EditUserPermissionsModalComponent;
    @ViewChild('dataTable') dataTable: DataTable;
    @ViewChild('paginator') paginator: Paginator;
    @ViewChild(InfoModalComponent)  infoModal : InfoModalComponent;

    //Filters
    advancedFiltersAreShown: boolean = false;
    checkedRescinded: boolean = false;
    filterText: string = '';
    selectedPermission: string = '';
    role: number = undefined;
    record: any;
    delId: any;
    filter:any;

    constructor(
        injector: Injector,
        private _http: Http,
        private _userServiceProxy: UserServiceProxy,
        private _notifyService: NotifyService,
        private _fileDownloadService: FileDownloadService,
        private  paymentService: PaymentService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private confirmationService: ConfirmationService
    ) {
        super(injector);
        this.filterText = this._activatedRoute.snapshot.queryParams['filterText'] || '';
    }

    filterByRescinded(){
        this.checkedRescinded ? this.getRescindedPayments() : this.getPayments();
        // if(this.checkedRescinded){
        //     this.getRescindedPayments();
        // }else{
        //     this.getPayments();
        // }
    }
    callGetPayments(data) {
            this.getPayments()
    }
    confirm(item) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            accept: () => {
               console.log(item);
               this.deletePayment({id:item.id})
            }
        });
    }
    getPaymentsByWallet(){
        this.paymentService.getUsersPayment(undefined, undefined, undefined, this.filterText)
            .finally(() => {
            })
            .subscribe((result) => {
                this.tableParser(result.items);
                this.primengDatatableHelper.totalRecordsCount = result.totalCount;
                this.primengDatatableHelper.records =  this.tableParser(result.items);
                this.primengDatatableHelper.hideLoadingIndicator();
            });
    }
    getRescindedPayments(event?: LazyLoadEvent){
        const sorting = this.primengDatatableHelper.getSorting(this.dataTable);
        const maxResultCount = this.primengDatatableHelper.getMaxResultCount(this.paginator, event);
        const skipCount = this.primengDatatableHelper.getSkipCount(this.paginator, event);
        this.primengDatatableHelper.showLoadingIndicator();
        this.paymentService.getUsersPayment(sorting, maxResultCount, skipCount, undefined, 'IsRescind')
            .finally(() => {
            })
            .subscribe((result) => {
                this.tableParser(result.items);
                this.primengDatatableHelper.totalRecordsCount = result.totalCount;
                this.primengDatatableHelper.records =  this.tableParser(result.items);
                this.primengDatatableHelper.hideLoadingIndicator();
            });
    }
    getPayments(event?: LazyLoadEvent) {
        const sorting = this.primengDatatableHelper.getSorting(this.dataTable);
        const maxResultCount = this.primengDatatableHelper.getMaxResultCount(this.paginator, event);
        const skipCount = this.primengDatatableHelper.getSkipCount(this.paginator, event);
        this.primengDatatableHelper.showLoadingIndicator();
        this.paymentService.getUsersPayment(sorting, maxResultCount, skipCount )
            .finally(() => {
            })
            .subscribe((result) => {
                this.tableParser(result.items);
                this.primengDatatableHelper.totalRecordsCount = result.totalCount;
                this.primengDatatableHelper.records =  this.tableParser(result.items);
                this.primengDatatableHelper.hideLoadingIndicator();
            });
    }
    // getPaymentsNew(event?: LazyLoadEvent, walletId?, IsRescind?){
    //     this.filter.sorting = '';
    //     this.filter.maxResultCount = 10;
    //     this.filter.skipCount = 0;
    //     console.log(this.filter);
    //     // const sorting = this.primengDatatableHelper.getSorting(this.dataTable);
    //     // const maxResultCount = this.primengDatatableHelper.getMaxResultCount(this.paginator, event);
    //     // const skipCount = this.primengDatatableHelper.getSkipCount(this.paginator, event);
    //     this.primengDatatableHelper.showLoadingIndicator();
    //     this.paymentService.getUsersPaymentNew(this.filter)
    //         .finally(() => {
    //         })
    //         .subscribe((result) => {
    //             this.tableParser(result.items);
    //             this.primengDatatableHelper.totalRecordsCount = result.totalCount;
    //             this.primengDatatableHelper.records =  this.tableParser(result.items);
    //             this.primengDatatableHelper.hideLoadingIndicator();
    //         });
    // }
    getPaginationData(event?: LazyLoadEvent){
        return {
            sorting : this.primengDatatableHelper.getSorting(this.dataTable),
            maxResultCount : this.primengDatatableHelper.getMaxResultCount(this.paginator, event),
            skipCount : this.primengDatatableHelper.getSkipCount(this.paginator, event),
        }
    }
    buildTable(result){
        this.tableParser(result.items);
        this.primengDatatableHelper.totalRecordsCount = result.totalCount;
        this.primengDatatableHelper.records =  this.tableParser(result.items);
        this.primengDatatableHelper.hideLoadingIndicator();
    }
    deletePayment(data){
        this.paymentService.deletePayment(data)
            .finally(() => {
            })
            .subscribe((result) => {
                this.getPayments();
            });
    }
    unlockUser(record): void {
        this._userServiceProxy.unlockUser(new EntityDtoOfInt64({ id: record.id })).subscribe(() => {
            this.notify.success(this.l('UnlockedTheUser', record.userName));
        });
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
    }

    tableParser(arrOfPayments){
        arrOfPayments.forEach(function(item, i, arr) {
            // item.transactionDate = moment(item.transactionDate).format('DD MMM YYYY hh:mm A');
            item.fullName = item.firstName + " " + item.lastName;
            item.fullPrice = item.amountDue+ " " + item.currency.code.toUpperCase();

            switch (item.transactionStatus) {
                case "notPaid":
                    item.transactionStatus = "Not Paid";
                    break;
                case "paid":
                    item.transactionStatus = "Paid";
                    break;
                case "partiallyPaid":
                    item.transactionStatus = "Partially Paid";
                    break;
            }

        });
        return arrOfPayments;
    }


}
