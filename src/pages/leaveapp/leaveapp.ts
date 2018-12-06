import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime } from 'ionic-angular';
import {LeaveApp} from '../../app/models/leaveapp';
import {Employee} from '../../app/models/employee';
import * as Constants from '../../app/models/constants';
import {Http,Headers} from '@angular/http';
import { Storage } from '@ionic/storage';
import{AlertController} from 'ionic-angular';
import{GlobalProvider} from '../../providers/global/global';

import { ConnSettings } from '../../app/models/connsettings';
import {CrudApiProvider } from '../../providers/crud-api/crud-api';
import { LoadingController,Loading } from 'ionic-angular';
import { AppType,AppStatus,VisaType } from '../../app/models/enums';
import {LeaveappLinePage} from '../leaveapp-line/leaveapp-line';
import { LeaveCode } from '../../app/models/leavecode';
import { text } from '@angular/core/src/render3/instructions';
import { ApproveLine } from '../../app/models/ApproveLine';



@IonicPage()
@Component({
  selector: 'page-leaveapp',
  templateUrl: 'leaveapp.html',
})
export class LeaveappPage implements OnInit{
  ngOnInit(): void {
   
    this.connSettings = this.global.connSettings;
    this.getLeaves(this.global.CURR_EMPLOYEE);//Calling API
    //this.crudApi.getLeaveCodes(this.leaveCodeList,this.global.URL);

   

  }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private http:Http,
              private alertCtrl:AlertController,
              private storage: Storage,
              public loadingCtrl: LoadingController,
              public crudApi:CrudApiProvider,
              public global:GlobalProvider) {
  }

  ionViewDidLoad() {
    
    console.log(`Global EmplId : ${this.global.EMPL_ID}\nGlobal LeaveCodes: ${this.global.LeaveCodes}`);
    
  }
  //Enums stings array
  appType:Array<string>=AppType.ToStr();
  
  appStatus:Array<string>=AppStatus.ToStr();

  visaType:Array<string>=VisaType.ToStr();
  selectedVisaType:string=VisaType.None;

  emp:Employee=new Employee();
  emplId:string="";
  connSettings:ConnSettings=new ConnSettings();
  empList:Array<LeaveApp>;
  leaveCodeList:Array<LeaveCode>;
  loader:Loading = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 30000
  });
    
  onItemClicked( item:LeaveApp){
    console.log(`Id :${item.ApplicationId} was clicked`);
    this.presentActionListConfirm(item);
  }
  onAddItemClicked(){
    
    let  newItem:LeaveApp=new LeaveApp();
    //Initalization
    newItem.EmplId                = this.global.EMPL_ID;
    newItem.CreatedDateTime       = new Date();
    newItem.ApprovalStatus        = AppStatus.Open;
    newItem.LeaveApplicationType  = AppType.Leave;
    newItem.ExitVisaType          = VisaType.None;
    newItem.ScheduledLeaveDate    = new Date();
    newItem.ScheduledReturnDate   = new Date();
    this.leaveCodeList            = this.global.LeaveCodes;
    console.log(`Create new leave : ${newItem} \n New leave CodesList: ${this.leaveCodeList}`);
    this.navCtrl.push(LeaveappLinePage,{
      Operation:"NEW",
      Item:newItem,
      LeaveCodeList:this.leaveCodeList
      });
  }

 getLeaves(_empl:Employee){
   
  let fullURL:string = `${this.global.URL}/leaves?emplid=${_empl.EmplId}&includeSubordinates=false`;
  console.log(`URL : ${fullURL}`);
  this.loader.present( );
  let headers = new Headers();
  headers.append('Authorization', 'Basic ' + btoa(`${this.global.connSettings.UserId}:${this.global.connSettings.UserPwd}`));
  this.http.get(fullURL,{headers:headers})
      .map(res => res.json())
      .subscribe(data => {
         
        this.empList=data;
        this.empList.forEach(item => {
          console.log(`Id:${item.ApplicationId} \n Empl:${item.EmplName}`);
        });
        console.log(`Data returned from API:\n ${this.empList}`);
        },err =>{
        console.log(`Error happend when calling API :\n ${err}\n 
                     URL: ${this.connSettings.Url} \n 
                     EmplId:${_empl.EmplId} \n
                     Name: ${_empl.Name}`);    
     
       });
       this.loader.dismiss();
       



 }
 //Approve or reject 
 presentConfirm() {
  let alert = this.alertCtrl.create({
    title: `<ion-label color="danger">Approve leave application</ion-label>`,
    message: 'Please approve or reject this leave application ,You can write comments for selected action?',
    inputs:[
      {
        name:"commentsapproval",
        placeholder:"Approver comments"
      }
    ],
    buttons: [
      
      {
        text: 'Approve',
        handler: () => {
          console.log('Approve leave clicked');
        }
      },
      {
        text: 'Reject',
        handler: () => {
          console.log('Reject leave clicked');
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  
  alert.present();
} 

presentActionListConfirm(leaveApp:LeaveApp){

  let appAction:ApproveLine=new ApproveLine();
  appAction.WFLineId = leaveApp.WFLineId;

         

  let alert = this.alertCtrl.create({
    title: `<ion-label color="danger">Approve leave application</ion-label>`,
    message: 'Please approve or reject this leave application ,You can write comments for selected action?',
    inputs:[
      {
        name:"commentsapproval",
        placeholder:"Approver comments"
      }
    ],
    buttons: [
   
    ]
  });
  
  let actList:string[]=leaveApp.WFActionList.split(" ");
  actList.forEach(element => {
  if(element === "Approving" || element === "Rejected" || element === "ReportAsReady"){
    alert.addButton({
      text:element,
      handler:(data)=>{
                          console.log(`${element} was selected`);
                          appAction.Comments = data.commentsapproval;
                          appAction.UserStatusSelection=element;
                          appAction.WFLineId = leaveApp.WFLineId;
                          
                           this.putAction(appAction,leaveApp);
    
      }
    });
  }
 

  }); 

  alert.addButton({
    text:"Cancel",
    role:"cancel",
    handler:(data)=>{
      console.log("Canceled !!!");
    }
  });
alert.present();

}

putAction(appAction:ApproveLine,leaveApp:LeaveApp){
  
 
        
  console.log('Put new:',appAction); 
  var url = `${this.global.URL}/leaves?id=${leaveApp.RecId}`;
  console.log('Target URL using HttpPut:',url);
  
  let headers = new Headers();
  headers.append('Authorization', 'Basic ' + btoa(`${this.global.connSettings.UserId}:${this.global.connSettings.UserPwd}`));
  this.http.put(url,appAction,{headers:headers}).subscribe(data =>
    {
      console.log("Put new approve action:",data);
    });
}

}
