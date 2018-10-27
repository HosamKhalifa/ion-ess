import {HttpClient} from '@angular/common/http';

import { Injectable, OnInit } from '@angular/core';
import { LeaveCode } from '../../app/models/leavecode';
//import { Loading } from 'ionic-angular';
import { ConnSettings } from '../../app/models/connsettings';
import { Storage } from '@ionic/storage';
import * as Constants from '../../app/models/constants'
import { Employee } from '../../app/models/employee';


@Injectable()
export class CrudApiProvider implements OnInit{
  ngOnInit(): void {
    
   
  }

  constructor(public http: HttpClient,
              public storage:Storage
             // public connSettings:ConnSettings
             
              ) {
    console.log('Hello CrudApiProvider Provider');
    this.connSettings = new ConnSettings();
    
    this.storage.get(Constants.SETTINGS_URL).then((val)=>{
      console.log(`Crud-Api Constructor : \n Url:  ${val}`);
      
      this.connSettings.Url=val;

        this.storage.get(Constants.SETTINGS_EMPL).then((employeeObj)=>{
          this.emp=employeeObj;    
          this.getLeaveCodes( this.leaveCodes);
         
          });

    });
  }

  connSettings:ConnSettings;
  emp:Employee;
  leaveCodes:Array<LeaveCode>;
  getLeaveCodes(leaveCodes:Array<LeaveCode>,url:string=this.connSettings.Url){
   
    let fullURL:string = `${url}/leavecodes`;
    console.log(`URL : ${fullURL}`);
   // this.loader.present( );
    this.http.get<Array<LeaveCode>>(fullURL)
        .map(res => res)
        .subscribe(data => {
           
          leaveCodes=data;
          data.forEach(leaveCodeLine => {
            console.log(`CodeId:${leaveCodeLine.CodeId}  Description:${leaveCodeLine.Description}`);
          });
          console.log(`Leave code count from API:\n ${data.length}`);
          },err =>{
          console.log(`Error happend when calling API :\n ${err}   `);    
       
         });
         //this.loader.dismiss();
         
  
  
  
   }


}


