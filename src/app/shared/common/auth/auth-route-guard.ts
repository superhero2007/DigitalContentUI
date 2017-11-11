import { Injectable } from '@angular/core';
import { PermissionCheckerService } from "@abp/auth/permission-checker.service";
import { AppSessionService } from '@shared/common/session/app-session.service';

import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
    } from '@angular/router';

@Injectable()
export class AppRouteGuard implements CanActivate, CanActivateChild {

    constructor(
        private _permissionChecker: PermissionCheckerService,
        private _router: Router,
        private _sessionService: AppSessionService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this._sessionService.user) {
            this._router.navigate(['/account/login']);
            return false;
        } else {
            return true;
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    selectBestRoute(): string {

        if (!this._sessionService.user) {
            return '/account/login';
        }

        if (this._permissionChecker.isGranted('Pages.Tenant.Dashboard')) {
            return '/app/admin/dashboard';
        }

        if (this._permissionChecker.isGranted('Pages.Tenants')) {
            return '/app/admin/tenants';
        }

        if (this._permissionChecker.isGranted('Pages.Administration.Users')) {
            return '/app/admin/users';
        }

        if (this._permissionChecker.isGranted('Pages.Administration.Payment')) {
            return '/app/admin/payment';
        }



        return '/app/admin/token-sale';
    }
}
