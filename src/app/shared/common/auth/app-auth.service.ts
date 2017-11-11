import { Injectable } from '@angular/core';

@Injectable()
export class AppAuthService {

    logout(reload?: boolean, returnUrl?: string): void {

        abp.auth.clearToken();

        abp.multiTenancy.setTenantIdCookie(null);

        location.href = document.location.origin + '/account/login';
    }
}
