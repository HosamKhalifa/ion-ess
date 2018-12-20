
import { Component, OnInit } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import{GlobalProvider} from '../../providers/global/global';
import {Http,Headers} from '@angular/http';
import { LeaveApp } from '../../app/models/leaveapp';
import {LocalNotifications} from '@ionic-native/local-notifications'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  ngOnInit(): void {


  }

  constructor(public navCtrl: NavController,
              public global:GlobalProvider,
              private http:Http,
              private notifiy:LocalNotifications,
              private plt:Platform) {

    this.plt.ready().then((rdy)=>{
      let indx=0;
      const leaveNews = Observable.interval(1000 * 15 );
      leaveNews.subscribe(() => {
        indx+=1;
        console.log(`Notification ${indx} `);
  //************Start of http logic***************** */
  let fullURL:string = `${this.global.URL}/leaves?emplid=${this.global.connSettings.UserId}&includeSubordinates=true`;
  console.log(`URL used by notification logic : ${fullURL}`);
  let empList:Array<LeaveApp>;
  let headers = new Headers();
  headers.append('Authorization', 'Basic ' + btoa(`${this.global.connSettings.UserId}:${this.global.connSettings.UserPwd}`));
  this.http.get(fullURL,{headers:headers})
      .map(res => res.json())
      .subscribe(data => {
         
        empList=data;
        empList.forEach(item => {
          
          this.notifiy.isPresent(item.RecId).then((presented) => {
            if(!presented){
              console.log(`Starting schedule notification for Id:${item.ApplicationId} \n Empl:${item.EmplName}`);
              this.scheduleNotification(item);
            }
          });
        });
        console.log(`Data returned for notification of new leaveApp:\n ${empList}`);
        },err =>{
        console.log(`Error happend when calling API :\n ${err}\n 
                     URL: ${this.global.connSettings.Url} \n 
                     EmplId:${this.global.CURR_EMPLOYEE.EmplId} \n
                     Name: ${this.global.CURR_EMPLOYEE.Name}`);    
     
       });
       
       
  
  
  //************End of http logic****************** */
      } );
  
    }) ;           


  }
scheduleNotification(line:LeaveApp){
  this.notifiy.schedule({
    id:line.RecId,
    title:line.EmplName,
    text:line.Comments,
    data: line 
  })

}


}
