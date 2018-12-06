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
import{SetupPageModule}from '../pages/setup/setup.module';
import {LeaveappPageModule} from '../pages/leaveapp/leaveapp.module';
import{LeaveappLinePageModule} from '../pages/leaveapp-line/leaveapp-line.module';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GlobalProvider } from '../providers/global/global';
import {LeaveBalPageModule} from '../pages/leave-bal/leave-bal.module'
import { TakePicPageModule } from '../pages/take-pic/take-pic.module';

import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage   
    
  ],
  imports: [
    BrowserModule,
    HttpModule,    
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    LeaveBalPageModule,
    LeaveappPageModule,
    LeaveappLinePageModule,
    SetupPageModule,
    TakePicPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SingletonService,
    {provide:CrudApiProvider, useClass:CrudApiProvider },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalProvider,
    Camera,
    FileTransfer,File,FilePath,Transfer
    
  ]
})
export class AppModule {}
