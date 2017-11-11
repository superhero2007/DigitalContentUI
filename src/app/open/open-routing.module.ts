import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path : '',
                children: [{
                    path: 'main',
                    component: LandingComponent,
                }]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class OpenRoutingModule { }
