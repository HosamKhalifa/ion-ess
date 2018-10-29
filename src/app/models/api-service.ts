import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{ConnSettings} from './connsettings';
import 'rxjs/add/operator/map';
import {Employee} from './employee';
import{AlertController} from 'ionic-angular';
import {Http} from '@angular/http';
import { Storage } from '@ionic/storage';
import * as Constants from './constants';

export class ApiService implements OnInit{
  ngOnInit(): void {
    
    this.connSettings= new ConnSettings();
    this.storage.get(Constants.SETTINGS_URL).then((val) => {
      console.log('Stored Url:  ', val);
      this.connSettings.Url=val;    
    });
    this.storage.get(Constants.SETTINGS_USERID).then((val) =>{
      console.log('Stored User ID:',val);
      this.connSettings.UserId=val;
    }); 
    this.storage.get(Constants.SETTINGS_USERPWD).then((val) => {
      console.log('Stored User Pwd : ',val);
      this.connSettings.UserPwd = val;
    });  
    
  }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private http:Http,
              private alertCtrl:AlertController,
              private storage: Storage) {
  }

  
  connSettings:ConnSettings=new ConnSettings(); 
  
  
 
  getEmployee(connSettings:ConnSettings,emp:Employee){
   
  
       let fullURL:string = `${connSettings.Url}/employees/${connSettings.UserId}`;
        console.log(`URL : ${fullURL}`);

        this.http.get(fullURL).map(res => res.json()).subscribe(data => {
    
            emp=data;  
                     
         
           })


       
}



}
