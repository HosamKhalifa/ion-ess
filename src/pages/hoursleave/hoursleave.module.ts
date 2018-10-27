import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HoursleavePage } from './hoursleave';

@NgModule({
  declarations: [
    HoursleavePage,
  ],
  imports: [
    IonicPageModule.forChild(HoursleavePage),
  ],
})
export class HoursleavePageModule {}
