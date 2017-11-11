import { Component, OnInit } from '@angular/core';
import { AppSessionService } from '@shared/common/session/app-session.service';
import { Router } from '@angular/router';
import { SessionServiceProxy } from "@shared/service-proxies/session.service";
import {AppConsts} from "@shared/AppConsts";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
    public shownLoginName: string;
    public user: any;
    public logo: string;

  constructor(
      public _sessionService : AppSessionService,
      public router: Router,
      public session: SessionServiceProxy
  ) {}

    ngOnInit() {
      this.getCurrentLoginInformations();
      this.logo = AppConsts.logo;
    }

    getCurrentLoginInformations(): void {
        this.user = this._sessionService.user;
    }

    go2home() {
      if(this.user && this.user.id) {
          this.router.navigate(['/app/admin/token-sale']);
      } else {
          window.open('http://digitalcontent.com')
      }
    }

    buyTokens() {
      if(this.user && this.user.id) {
          this.router.navigate(['/app/admin/token-sale']);
      } else {
          this.router.navigate(['/account/register-buyer']);
      }
    }
}
