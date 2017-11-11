import { Injectable, Inject, Optional, OpaqueToken } from '@angular/core';
import { AppConsts } from "@shared/AppConsts";
import {dcHttpService} from "@app/services/dcHttpService";

export const API_BASE_URL = new OpaqueToken('API_BASE_URL');

@Injectable()
export class TosModalService {
    private baseUrl: string;
    protected jsonParseReviver: (key: string, value: any) => any = undefined;

    constructor( private dcHttpService:dcHttpService,
                 @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.baseUrl = AppConsts.remoteServiceBaseUrl ? AppConsts.remoteServiceBaseUrl : "";
    }

    accept(){
        return this.dcHttpService.httpCall("/api/services/app/Session/UpdateUSerTosVersion", "put");
    }

}



