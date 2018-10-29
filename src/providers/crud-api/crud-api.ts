import {HttpClient} from '@angular/common/http';

import { Injectable, OnInit } from '@angular/core';
import { LeaveCode } from '../../app/models/leavecode';
//import { Loading } from 'ionic-angular';
//import{SingletonService} from '../../services/singleton/singleton';
import{GlobalProvider} from '../../providers/global/global';


@Injectable()
export class CrudApiProvider implements OnInit{
  ngOnInit(): void {
    
   
  }

  constructor(public http: HttpClient,
              public global:GlobalProvider
              ) {
   
  }

  
  
  getLeaveCodes(url:string=this.global.URL){
    
    let fullURL:string = `${url}/leavecodes`;
    console.log(`CrudApi.getLeaveCodes URL === : ${fullURL}`);
   // this.loader.present( );
    this.http.get<Array<LeaveCode>>(fullURL)
        .map(res => res)
        .subscribe(data => {
           
          let leaveCodes:Array<LeaveCode>=data;
          this.global.LeaveCodes = leaveCodes;
          leaveCodes.forEach(leaveCodeLine => {
          
           console.log(`CodeId:${leaveCodeLine.CodeId}  Description:${leaveCodeLine.Description}`);
          });
          console.log(`Leave code count from API:\n ${data.length}`);
          },err =>{
          console.log(`Error happend when calling API :\n ${err}   `);    
       
         });
         //this.loader.dismiss();
         
  
  
  
   }


}


