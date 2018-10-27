import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import{FormBuilder,FormGroup} from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpModule } from '@angular/http';
import{HttpClientModule} from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage';
import {CrudApiProvider} from '../providers/crud-api/crud-api';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import{SetupPage}from '../pages/setup/setup';
import {LeaveappPage} from '../pages/leaveapp/leaveapp';
import{LeaveappLinePage} from '../pages/leaveapp-line/leaveapp-line';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SetupPage,
    LeaveappPage,
    LeaveappLinePage
  ],
  imports: [
    BrowserModule,
    HttpModule,    
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    FormBuilder,
    FormGroup
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SetupPage,
    LeaveappPage,
    LeaveappLinePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    
    {provide:CrudApiProvider, useClass:CrudApiProvider },
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    
  ]
})
export class AppModule {}
