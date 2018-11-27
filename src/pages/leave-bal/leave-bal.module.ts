import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaveBalPage } from './leave-bal';

@NgModule({
  declarations: [
    LeaveBalPage,
  ],
  imports: [
    IonicPageModule.forChild(LeaveBalPage),
  ],
})
export class LeaveBalPageModule {}
