import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaveappPage } from './leaveapp';

@NgModule({
  declarations: [
    LeaveappPage,
  ],
  imports: [
    IonicPageModule.forChild(LeaveappPage),
  ],
})
export class LeaveappPageModule {}
