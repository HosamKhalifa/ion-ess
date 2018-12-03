import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpModule } from '@angular/http';
import{HttpClientModule} from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage';
import {CrudApiProvider} from '../providers/crud-api/crud-api';
import { SingletonService } from '../services/singleton/singleton';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import{SetupPage}from '../pages/setup/setup';
import {LeaveappPage} from '../pages/leaveapp/leaveapp';
import{LeaveappLinePage} from '../pages/leaveapp-line/leaveapp-line';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GlobalProvider } from '../providers/global/global';
import { LeaveBalPage } from '../pages/leave-bal/leave-bal';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SetupPage,
    LeaveappPage,
    LeaveappLinePage,
    LeaveBalPage
    
    
  ],
  imports: [
    BrowserModule,
    HttpModule,    
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SetupPage,
    LeaveappPage,
    LeaveappLinePage,
    LeaveBalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SingletonService,
    {provide:CrudApiProvider, useClass:CrudApiProvider },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalProvider,
    Camera,
    FileTransfer,File
    
  ]
})
export class AppModule {}
