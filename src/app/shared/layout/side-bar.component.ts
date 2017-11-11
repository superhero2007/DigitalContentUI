import { Component, Injector } from '@angular/core';
import { SideBarMenu } from './side-bar-menu';
import { SideBarMenuItem } from './side-bar-menu-item';
import { AppAuthService } from '@app/shared/common/auth/app-auth.service';

import { PermissionCheckerService } from '@abp/auth/permission-checker.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AppSessionService } from '@shared/common/session/app-session.service';

@Component({
    templateUrl: './side-bar.component.html',
    selector: 'side-bar'
})
export class SideBarComponent extends AppComponentBase {

    constructor(
        injector: Injector,
        public permission: PermissionCheckerService,
        public AppAuthService : AppAuthService,
        private _appSessionService: AppSessionService) {
        super(injector);
    }

    menu: SideBarMenu = new SideBarMenu("MainMenu", "MainMenu", [

        new SideBarMenuItem("Token Sale", "", "icon-globe", "/app/admin/token-sale"),
        new SideBarMenuItem("Dashboard ", "", "icon-briefcase", "/app/admin/dashboard"),
        // new SideBarMenuItem("General Ledger", "", "icon-briefcase", "/app/admin/ledger"),
        new SideBarMenuItem("Commitments", "Pages.Administration.Users", "icon-people", "/app/admin/payment"),
        new SideBarMenuItem("Administration", "", "icon-wrench", "", [
            new SideBarMenuItem("Roles", "Pages.Administration.Roles", "icon-briefcase", "/app/admin/roles"),
            new SideBarMenuItem("Users", "Pages.Administration.Users", "icon-people", "/app/admin/users"),
            new SideBarMenuItem("Tenants", "Pages.Tenants", "icon-globe", "/app/admin/tenants"),
            new SideBarMenuItem("Languages", "Pages.Administration.Languages", "icon-flag", "/app/admin/languages"),
            new SideBarMenuItem("Workflows", "Pages.Administration.Host.Dashboard", "icon-grid", "/app/admin/designer"),
            // new SideBarMenuItem("Roadmap Builder", "Pages.Administration.Users", "icon-map", "/app/admin/roadmap"),
            new SideBarMenuItem("ICO", "Pages.Administration.Roles", "icon-grid", "/app/admin/ico"),
            new SideBarMenuItem("Manage ToS", "Pages.Administration.Host.Dashboard", "icon-grid", "/app/admin/tos")
        ])

        // new SideBarMenuItem("Notifications", "", "icon-bell", "/app/notifications"),
    ]);

    logout(): void {
        this.AppAuthService.logout();
    }

    checkChildMenuItemPermission(menuItem): boolean {

        for (let i = 0; i < menuItem.items.length; i++) {
            let subMenuItem = menuItem.items[i];

            if (subMenuItem.permissionName && this.permission.isGranted(subMenuItem.permissionName)) {
                return true;
            }

            if (subMenuItem.items && subMenuItem.items.length) {
                return this.checkChildMenuItemPermission(subMenuItem);
            } else if (!subMenuItem.permissionName) {
                return true;
            }
        }

        return false;
    }

    showMenuItem(menuItem): boolean {
        if (menuItem.permissionName === 'Pages.Administration.Tenant.SubscriptionManagement' && this._appSessionService.tenant && !this._appSessionService.tenant.edition) {
            return false;
        }

        if (menuItem.permissionName) {
            return this.permission.isGranted(menuItem.permissionName);
        }

        if (menuItem.items && menuItem.items.length) {
            return this.checkChildMenuItemPermission(menuItem);
        }

        return true;
    }

}
