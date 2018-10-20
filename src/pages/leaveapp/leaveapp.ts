import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LeaveApp} from '../../app/models/leaveapp';
import {Employee} from '../../app/models/employee';
import * as Constants from '../../app/models/constants';
import {Http} from '@angular/http';
import { Storage } from '@ionic/storage';
import{AlertController} from 'ionic-angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ConnSettings } from '../../app/models/connsettings';
import { LoadingController,Loading } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-leaveapp',
  templateUrl: 'leaveapp.html',
})
export class LeaveappPage implements OnInit{
  ngOnInit(): void {
   
    this.storage.get(Constants.SETTINGS_URL).then((val)=>{
      this.connSettings.Url=val;

        this.storage.get(Constants.SETTINGS_EMPL).then((employeeObj)=>{
          this.emp=employeeObj;    
          
          this.getLeaves(this.emp);//Calling API
          });

    });
   

  }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private http:Http,
              private alertCtrl:AlertController,
              private storage: Storage,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveappPage Employee name:',this.emp.Name);
    
    
  }
  emp:Employee=new Employee();
  emplId:string="";
  connSettings:ConnSettings=new ConnSettings();
  empList:Array<LeaveApp>;
  loader:Loading = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 3000
  });
    
  onItemClicked( item:LeaveApp){
    console.log(`Id :${item.ApplicationId} was clicked`);
    this.presentConfirm();
  }

 getLeaves(_empl:Employee){
   
  let fullURL:string = `${this.connSettings.Url}/leaves?emplid=${_empl.PersonnelNumber}&includeSubordinates=false`;
  console.log(`URL : ${fullURL}`);
  this.loader.present( );
  this.http.get(fullURL)
      .map(res => res.json())
      .subscribe(data => {
         
        this.empList=data;
        this.empList.forEach(item => {
          console.log(`Id:${item.ApplicationId} \n Empl:${item.ScheduledLeaveDate}`);
        });
        console.log(`Data returned from API:\n ${this.empList}`);
        },err =>{
        console.log(`Error happend when calling API :\n ${err}\n 
                     URL: ${this.connSettings.Url} \n 
                     EmplId:${_empl.PersonnelNumber} \n
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
        placeholder:"Approcal comments"
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

}
