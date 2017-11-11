import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { LandingComponent } from './landing/landing.component';
import { OpenRoutingModule } from './open-routing.module';


@NgModule({
  imports: [
      CommonModule,
      OpenRoutingModule
  ],
  declarations: [
      // LandingComponent
  ]
})
export class OpenModule { }
