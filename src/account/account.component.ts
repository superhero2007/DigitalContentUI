import { Component, ViewContainerRef, OnInit, Injector, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';

declare var moment;
import * as _ from 'lodash';
import {AppSessionService} from "@shared/common/session/app-session.service";

@Component({
    templateUrl: './account.component.html',
    styleUrls: [
        './account.component.scss'
    ],
    encapsulation: ViewEncapsulation.None
})
export class AccountComponent extends AppComponentBase implements OnInit {

    private viewContainerRef: ViewContainerRef;
    public logo: string;

    currentYear: number = moment().year();
    remoteServiceBaseUrl: string = AppConsts.remoteServiceBaseUrl;
    tenantChangeDisabledRoutes: string[] = ["select-edition", "buy", "upgrade", "extend", "register-tenant"];
    currentUrlLogin: boolean;

    public constructor(
        injector: Injector,
        private _router: Router,
        private _loginService: LoginService,
        viewContainerRef: ViewContainerRef,
        public AppSessionService : AppSessionService
    ) {
        super(injector);
        this.currentUrlLogin =this._router.url.includes('/account') ;
        this.viewContainerRef = viewContainerRef; // We need this small hack in order to catch application root view container ref for modals
    }

    ngOnInit(): void {

        if(this.AppSessionService.user) {
            this._router.navigate(['/app/admin/dashboard']);
        }

        this._loginService.init();
        this.logo = AppConsts.logo;
    }

    goToHome(): void {
        (window as any).location.href = '/';
    }

    private supportsTenancyNameInUrl() {
        return (AppConsts.appBaseUrlFormat && AppConsts.appBaseUrlFormat.indexOf(AppConsts.tenancyNamePlaceHolderInUrl) >= 0);
    }
}
