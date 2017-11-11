import { AppConsts } from '@shared/AppConsts';
import { UrlHelper } from './shared/helpers/UrlHelper';
import { LocalizedResourcesHelper } from './shared/helpers/LocalizedResourcesHelper';
import * as _ from 'lodash';
import { SubdomainTenancyNameFinder } from '@shared/helpers/SubdomainTenancyNameFinder';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Type, CompilerOptions, NgModuleRef } from '@angular/core';
import { UtilsService } from '@abp/utils/utils.service';
import { AppAuthService } from '@app/shared/common/auth/app-auth.service';
import { environment } from './environments/environment';

declare var moment;

export class AppPreBootstrap {

    static run(callback: () => void): void {

        let subdomainTenancyNameFinder = new SubdomainTenancyNameFinder();
        let tenancyName = subdomainTenancyNameFinder.getCurrentTenancyNameOrNull(environment.baseUrl);

        AppConsts.appBaseUrlFormat = environment.baseUrl;
        AppConsts.remoteServiceBaseUrl = environment.api;


        if (tenancyName == null) {
            AppConsts.appBaseUrl = environment.baseUrl.replace(AppConsts.tenancyNamePlaceHolderInUrl + ".", "");
        } else {
            AppConsts.appBaseUrl = environment.baseUrl.replace(AppConsts.tenancyNamePlaceHolderInUrl, tenancyName);
        }

        const queryStringObj = UrlHelper.getQueryParameters();

        if (queryStringObj.redirect && queryStringObj.redirect === "TenantRegistration") {
            if (queryStringObj.forceNewRegistration) {
                new AppAuthService().logout();
            }

            location.href = AppConsts.appBaseUrl + '/account/select-edition';
        }

        else if (queryStringObj.impersonationToken) {
            AppPreBootstrap.impersonatedAuthenticate(queryStringObj.impersonationToken, queryStringObj.tenantId, () => { AppPreBootstrap.getUserConfiguration(callback); });
        } else if (queryStringObj.switchAccountToken) {
            AppPreBootstrap.linkedAccountAuthenticate(queryStringObj.switchAccountToken, queryStringObj.tenantId, () => { AppPreBootstrap.getUserConfiguration(callback); });
        } else {
            AppPreBootstrap.getUserConfiguration(callback);
        }

        abp.ajax({
            url: environment.api + '/api/TokenAuth/GetTenant',
            method: 'GET',
        }).done(result => {
            if(result && result.tenantId) abp.multiTenancy.setTenantIdCookie(result.tenantId);
            if(result && result.logoUrl) AppConsts.logo = result.logoUrl;

        });
    }

    static bootstrap<TM>(moduleType: Type<TM>, compilerOptions?: CompilerOptions | CompilerOptions[]): Promise<NgModuleRef<TM>> {
        return platformBrowserDynamic().bootstrapModule(moduleType, compilerOptions);
    }

    private static getCurrentClockProvider(currentProviderName: any): abp.timing.IClockProvider {
        if (currentProviderName === "unspecifiedClockProvider") {
            return abp.timing.unspecifiedClockProvider;
        }

        if (currentProviderName === "utcClockProvider") {
            return abp.timing.utcClockProvider;
        }

        return abp.timing.localClockProvider;
    }

    private static impersonatedAuthenticate(impersonationToken: string, tenantId: number, callback: () => void): JQueryPromise<any> {

        abp.multiTenancy.setTenantIdCookie(tenantId);
        const cookieLangValue = abp.utils.getCookieValue("Abp.Localization.CultureName");
        return abp.ajax({
            url: environment.api + '/api/TokenAuth/ImpersonatedAuthenticate?impersonationToken=' + impersonationToken,
            method: 'POST',
            headers: {
                '.AspNetCore.Culture': ('c=' + cookieLangValue + '|uic=' + cookieLangValue),
                'Abp.TenantId': abp.multiTenancy.getTenantIdCookie()
            }
        }).done(result => {
            abp.auth.setToken(result.accessToken);
            AppPreBootstrap.setEncryptedTokenCookie(result.encryptedAccessToken);
            location.search = '';
            callback();
        });
    }

    private static linkedAccountAuthenticate(switchAccountToken: string, tenantId: number, callback: () => void): JQueryPromise<any> {
        abp.multiTenancy.setTenantIdCookie(tenantId);
        const cookieLangValue = abp.utils.getCookieValue("Abp.Localization.CultureName");
        return abp.ajax({
            url: environment.api + '/api/TokenAuth/LinkedAccountAuthenticate?switchAccountToken=' + switchAccountToken,
            method: 'POST',
            headers: {
                '.AspNetCore.Culture': ('c=' + cookieLangValue + '|uic=' + cookieLangValue),
                'Abp.TenantId': abp.multiTenancy.getTenantIdCookie()
            }
        }).done(result => {
            abp.auth.setToken(result.accessToken);
            AppPreBootstrap.setEncryptedTokenCookie(result.encryptedAccessToken);
            location.search = '';
            callback();
        });

    }

    private static getUserConfiguration(callback: () => void): JQueryPromise<any> {
        const cookieLangValue = abp.utils.getCookieValue("Abp.Localization.CultureName");
        return abp.ajax({
            url: environment.api + '/AbpUserConfiguration/GetAll',
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + abp.auth.getToken(),
                '.AspNetCore.Culture': ('c=' + cookieLangValue + '|uic=' + cookieLangValue),
                'Abp.TenantId': abp.multiTenancy.getTenantIdCookie()
            }
        }).done(result => {
            $.extend(true, abp, result);

            abp.clock.provider = this.getCurrentClockProvider(result.clock.provider);

            moment.locale(abp.localization.currentLanguage.name);
            (window as any).moment.locale(abp.localization.currentLanguage.name);

            if (abp.clock.provider.supportsMultipleTimezone) {
                moment.tz.setDefault(abp.timing.timeZoneInfo.iana.timeZoneId);
                (window as any).moment.tz.setDefault(abp.timing.timeZoneInfo.iana.timeZoneId);
            }

            abp.event.trigger('abp.dynamicScriptsInitialized');

            AppConsts.recaptchaSiteKey = abp.setting.get("Recaptcha.SiteKey");
            AppConsts.subscriptionExpireNootifyDayCount = parseInt(abp.setting.get("App.TenantManagement.SubscriptionExpireNotifyDayCount"));

            LocalizedResourcesHelper.loadResources(callback);
        });
    }

    private static setEncryptedTokenCookie(encryptedToken: string) {
        new UtilsService().setCookieValue(AppConsts.authorization.encrptedAuthTokenName,
            encryptedToken,
            new Date(new Date().getTime() + 365 * 86400000), //1 year
            abp.appPath
        );
    }
}
