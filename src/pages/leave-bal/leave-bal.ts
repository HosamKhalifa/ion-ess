import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Employee } from '../../app/models/employee';
import{GlobalProvider} from '../../providers/global/global';
import { LoadingController,Loading } from 'ionic-angular';
import {Http,Headers} from '@angular/http';
/**
 * Generated class for the LeaveBalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leave-bal',
  templateUrl: 'leave-bal.html',
})
export class LeaveBalPage implements OnInit{
  ngOnInit(): void {
    this.getLeaveBal(this.global.EMPL_ID);
  }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              private http:Http,
              public global:GlobalProvider
              ) {
  }
  leaveBal:any;
  loader:Loading = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 30000
  });
  getLeaveBal(emplId:string){
   
    let fullURL:string = `${this.global.URL}/LeaveBal/${emplId}`;
    console.log(`URL : ${fullURL}`);
    this.loader.present( );
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(`${this.global.connSettings.UserId}:${this.global.connSettings.UserPwd}`));
    this.http.get(fullURL,{headers:headers})
        .map(res => res.json())
        .subscribe(data => {
           this.leaveBal = Math.trunc( data );
            
           console.log('Leave balance:',data);
           this.loader.dismiss();
       
         });
       
         
  
  
  
   }

}
