import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {GlobalProvider} from '../providers/global/global';
import {ConnSettings} from '../app/models/connsettings';
import { Storage } from '@ionic/storage';
import * as Constants from '../app/models/constants';
import{CrudApiProvider} from '../providers/crud-api/crud-api';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SetupPage } from '../pages/setup/setup';
import { LeaveappPage }from '../pages/leaveapp/leaveapp';
import {ERequestPage} from '../pages/e-request/e-request';
import {OvertimePage} from '../pages/overtime/overtime';
import {HoursleavePage} from '../pages/hoursleave/hoursleave';
import { LeaveBalPage } from '../pages/leave-bal/leave-bal';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any,icon:string,color:string}>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              public global:GlobalProvider,
              public crudApi:CrudApiProvider,
              public storage:Storage ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage ,icon:'home',color:"amber"},
      { title: 'My Leave balance', component: LeaveBalPage ,icon:'list-box',color:"primary"},
      
      {title:'My Leaves',component:LeaveappPage,icon:'log-out',color:"vodafone"},
      {title:'General Purpose E-Request',component:ERequestPage,icon:'browsers',color:"secondary"},
      {title:'Overtime',component:OvertimePage,icon:'clock',color:"dark"},
      {title:'Hours Leave Request',component:HoursleavePage,icon:'ios-appstore',color:"teal"},
      {title:'Setup',component:SetupPage,icon:'build',color:'vodafone'}
    ];

  }
  connSettings:ConnSettings;

  loadSettings(){
    console.log('Starting to read saved settings into Global\n===============================================\n===============================================');
    this.connSettings= new ConnSettings();
    this.storage.get(Constants.SETTINGS).then((val) => {
      console.log('Stored Connection settings :  ', val);
      this.connSettings=val;    
      this.global.connSettings=this.connSettings;
      this.crudApi.getLeaveCodes(this.global.URL);//This method will save output on Global.leavCodes
     
    });

    this.storage.get(Constants.SETTINGS_EMPL).then((val)=>{
      console.log('Sotred Employee',val);
      this.global.CURR_EMPLOYEE=val;
    });
     
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      //Reading saved settings and load it on singleton service to be avilable to all pages
      console.log('APP initialization starting ...');
      this.loadSettings();

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
