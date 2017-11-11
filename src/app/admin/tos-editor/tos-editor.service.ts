import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';
import {Injectable, Inject, Optional, OpaqueToken, Input} from '@angular/core';
import { Http, Headers, ResponseContentType, Response } from '@angular/http';
import { SwaggerException } from '../../../shared/service-proxies/service-proxies';
import { AppConsts } from "../../../shared/AppConsts";

import * as moment from 'moment';
import {dcHttpService} from "@app/services/dcHttpService";

export const API_BASE_URL = new OpaqueToken('API_BASE_URL');

declare var swal;

@Injectable()
export class TosEditorService {
    private http: Http;
    private baseUrl: string;
    protected jsonParseReviver: (key: string, value: any) => any = undefined;
    public _data: any = {};

    constructor( private dcHttpService:dcHttpService,
                 @Inject(Http) http: Http,
                 @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = AppConsts.remoteServiceBaseUrl ? AppConsts.remoteServiceBaseUrl : "";
    }

    @Input('value')
    set data(value) {
        this._data = value;
    }

    get data() {
        return this._data;
    }


    getData(){
        this.dcHttpService.httpCall("/api/services/app/TermsOfServices/GetAndAssignDefaultTosAsync", "get").subscribe(resp => {
            Object.assign(this._data, resp);
        });
    }

    save(data: any) {
        this.dcHttpService.httpCall("/api/services/app/TermsOfServices/CreateOrUpdateTosContentAsync", "post", data).subscribe(resp => {
            if(resp) swal( "Content updated" ,  "" ,  "success" );
        });
    }

    reset() {
        this.dcHttpService.httpCall("/api/services/app/TermsOfServices/ResetDefaultTosContent", "post").subscribe(resp => {
            Object.assign(this._data, resp);
            swal( "Content updated" ,  "" ,  "success" );
        });
    }

}
