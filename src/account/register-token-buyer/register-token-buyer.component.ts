import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountServiceProxy, PasswordComplexitySetting, ProfileServiceProxy } from '@shared/service-proxies/service-proxies'
import { AppComponentBase } from '@shared/common/app-component-base';
import { LoginService } from '../login/login.service';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AppConsts } from '@shared/AppConsts';

@Component({
    templateUrl: './register-token-buyer.component.html',
    animations: [accountModuleAnimation()],
    styleUrls: ['./register-token.buyer.scss']
})
export class RegisterTokenBuyerComponent extends AppComponentBase implements OnInit {

    model: any = {
        userType : "tokenBuyer",
        firstName : "",
        lastName : ""
    };

    passwordComplexitySetting: PasswordComplexitySetting = new PasswordComplexitySetting();
    recaptchaSiteKey: string = AppConsts.recaptchaSiteKey;
    step : number = 1;
    hiddenFilled : boolean = false;
    saving: boolean = false;
    all1: boolean = false;
    all2: boolean = false;
    constructor(
        injector: Injector,
        private _accountService: AccountServiceProxy,
        private _router: Router,
        private readonly _loginService: LoginService,
        private _profileService: ProfileServiceProxy
    ) {
        super(injector);
    }

    ngOnInit() {
        this._profileService.getPasswordComplexitySetting().subscribe(result => {
            this.passwordComplexitySetting = result.setting;
        });

        setTimeout(()=>this.hiddenFilled=true,200);
    }

    get useCaptcha(): boolean {
        return this.setting.getBoolean('App.UserManagement.UseCaptchaOnRegistration');
    }

    save(): void {


        this.saving = true;
        this._accountService.registerBuyer(this.model)
            .finally(() => { this.saving = false; })
            .subscribe((result) => {

                if (!result.canLogin) {
                    this.notify.success(this.l('SuccessfullyRegistered'));
                    this._router.navigate(['account/login']);
                    return;
                }

                // this.step = 5;
                //Autheticate
                this.saving = true;
                this._loginService.authenticateModel.userNameOrEmailAddress = this.model.emailAddress;
                this._loginService.authenticateModel.password = this.model.password;
                this._loginService.authenticate(() => { this.saving = false; });
            });
    }

    captchaResolved(captchaResponse: string): void {
        this.model.captchaResponse = captchaResponse;
    }

    countryes: string[] = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas"
        ,"Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands"
        ,"Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica"
        ,"Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea"
        ,"Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana"
        ,"Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India"
        ,"Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia"
        ,"Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania"
        ,"Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia"
        ,"New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal"
        ,"Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles"
        ,"Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan"
        ,"Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia"
        ,"Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)"
        ,"Yemen","Zambia","Zimbabwe"];
    states:string[] =['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois',
        'Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York',
        'North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia',
        'Washington','West Virginia','Wisconsin','Wyoming'];
    filteredStates: any[];
    filteredBrands: any[];

    currentCountry: string;
    selectCurrentState:string;

    filterBrands(event) {
        this.filteredBrands = [];
        for(let i = 0; i < this.countryes.length; i++) {
            let country = this.countryes[i];
            if(country.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredBrands.push(country);

            }
        }
        console.log(this.currentCountry);
    }
    filterStates(event) {
        this.filteredStates = [];
        for(let i = 0; i < this.states.length; i++) {
            let country = this.states[i];
            if(country.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredStates.push(country);

            }
        }
        console.log(this.currentCountry);
    }
    selectCurrentCountry(event){
        this.currentCountry = event ;
        console.log(this.currentCountry);
    }

}
