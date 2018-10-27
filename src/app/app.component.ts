import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SetupPage } from '../pages/setup/setup';
import { LeaveappPage }from '../pages/leaveapp/leaveapp';
import{ERequestPage} from '../pages/e-request/e-request';
import{OvertimePage} from '../pages/overtime/overtime';
import{HoursleavePage} from '../pages/hoursleave/hoursleave';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any,icon:string,color:string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage ,icon:'home',color:"amber"},
      { title: 'My Leave balance', component: ListPage ,icon:'list-box',color:"primary"},
      
      {title:'My Leaves',component:LeaveappPage,icon:'log-out',color:"vodafone"},
      {title:'General Purpose E-Request',component:ERequestPage,icon:'browsers',color:"secondary"},
      {title:'Overtime',component:OvertimePage,icon:'clock',color:"dark"},
      {title:'Hours Leave Request',component:HoursleavePage,icon:'ios-appstore',color:"teal"},
      {title:'Setup',component:SetupPage,icon:'build',color:'vodafone'}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
