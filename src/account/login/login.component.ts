import {Component, Injector, OnInit, TemplateRef, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { UpdateUserSignInTokenOutput } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LoginService, ExternalLoginProvider } from './login.service';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AbpSessionService } from '@abp/session/abp-session.service';
import { UrlHelper } from 'shared/helpers/UrlHelper';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Subscription } from 'rxjs/Subscription';
import {SessionServiceProxy} from "@shared/service-proxies/session.service";

declare var swal;

@Component({
    templateUrl: './login.component.html',
    animations: [accountModuleAnimation()]
})
export class LoginComponent extends AppComponentBase implements OnInit {
    submitting: boolean = false;
    @ViewChild('scrollRef') private scrollContainer: ElementRef;
    public hiddenFilled : boolean = false;
    currentUrlSilver:boolean;
    constructor(
        injector: Injector,
        public loginService: LoginService,
        private _router: Router,
        private _sessionService: AbpSessionService,
        private _sessionAppService: SessionServiceProxy,
        private modalService: BsModalService
    ) {
        super(injector);
        // this.currentUrlSilver =this._router.url.includes(' ') ;
    }

    get multiTenancySideIsTeanant(): boolean {
        return this._sessionService.tenantId > 0;
    }

    get isSelfRegistrationAllowed(): boolean {
        if (!this._sessionService.tenantId) {
            return false;
        }

        return this.setting.getBoolean('App.UserManagement.AllowSelfRegistration');
    }

    ngOnInit(): void {

        if (this._sessionService.userId > 0 && UrlHelper.getReturnUrl() && UrlHelper.getSingleSignIn()) {
            this._sessionAppService.updateUserSignInToken()
                .subscribe((result: UpdateUserSignInTokenOutput) => {
                    let initialReturnUrl = UrlHelper.getReturnUrl();
                    let returnUrl = initialReturnUrl + (initialReturnUrl.indexOf('?') >= 0 ? '&' : '?') +
                        'accessToken=' + result.signInToken +
                        '&userId=' + result.encodedUserId +
                        '&tenantId=' + result.encodedTenantId;

                });
        }

        setTimeout(()=>this.hiddenFilled=true,500);
    }

    login(): void {
        this.submitting = true;
        this.loginService.authenticate(() => {});
    }

    externalLogin(provider: ExternalLoginProvider) {
        this.loginService.externalAuthenticate(provider);
    }
}
