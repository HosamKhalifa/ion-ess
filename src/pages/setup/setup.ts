import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{ConnSettings} from '../../app/models/connsettings';
import{SingletonService} from '../../services/singleton/singleton';
import 'rxjs/add/operator/map';
import {Employee} from '../../app/models/employee';
import{AlertController} from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import { Storage } from '@ionic/storage';
import * as Constants from '../../app/models/constants';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoadingController,Loading } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { TakePicPage } from '../take-pic/take-pic';

@IonicPage()
@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html',
})
export class SetupPage implements OnInit{
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

    this.storage.get(Constants.SETTINGS_EMPL).then((val)=>{
      console.log('Sotred Employee',val,val.EmplImg);
      this.currentEmployee=val;
    });
    this.storage.get(Constants.SETTINGS_COMP_ID).then((val) =>{
      console.log('Stored Comp ID:',val);
      if(val != null  )this.connSettings.CompId=val; 
      else
      {
        this.connSettings.CompId='dat';
        this.storage.set(Constants.SETTINGS_COMP_ID,'dat');
      } 
    });    
    this.storage.get(Constants.SETTINGS_LOGO).then((val)=>{
      console.log('Stored Company logo ',val);
      if (val != null )this.connSettings.CompImage=val;
      else 
      {
        this.connSettings.CompImage='';
        this.storage.set(Constants.SETTINGS_COMP_ID,'!');        
      }
    });    
    
  }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private http:Http,
              private alertCtrl:AlertController,
              public loadingCtrl: LoadingController,
              private storage: Storage,
              public singleton:SingletonService,
              private camera: Camera,
              private transfer: FileTransfer, 
              private file: File) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetupPage');
  }
  
  connSettings:ConnSettings; 
  currentEmployee:Employee=new Employee();
  loader:Loading = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 30000
  });
  
  Test_onClick(){
    console.log(`Starting test <br> ${this.connSettings.Url} <br> 
                 ${this.connSettings.UserId}`);
    this.TestConn(this.connSettings);
  }
  Save_onClick(){
    console.log(' URL =>',this.connSettings.Url,' UserId =>',this.connSettings.UserId);
    console.log('Employee data Name:',this.currentEmployee.Name);
    this.storage.set(Constants.SETTINGS_URL,this.connSettings.Url).then(()=>{
      this.http.get(`${this.connSettings.Url}/companyinfo/${this.connSettings.CompId}`).map(res => res.toString()).subscribe(data => {
        this.connSettings.CompImage=data;
        this.storage.set(Constants.SETTINGS_LOGO,data);
      })
    });
    this.storage.set(Constants.SETTINGS_USERID,this.connSettings.UserId);
    this.storage.set(Constants.SETTINGS_USERPWD,this.connSettings.UserPwd);
    this.storage.set(Constants.SETTINGS_EMPL,this.currentEmployee).then(() =>
    {
      console.log("Starting upload employee settings to server ...")
      this.upLoadEmplData(this.currentEmployee);
    });
    this.storage.set(Constants.SETTINGS_COMP_ID,this.connSettings.CompId);
    this.storage.set(Constants.SETTINGS_LOGO,this.connSettings.CompImage);

    this.storage.set(Constants.SETTINGS,this.connSettings);
    //Refersh global variables 
    this.singleton.connSettings= this.connSettings;
  }
  TestConn(connSettings:ConnSettings){
    
  
       let fullURL:string = `${connSettings.Url}/employees/${connSettings.UserId}`;
        console.log(`URL : ${fullURL}`);
        this.loader.present( );
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(`${this.connSettings.UserId}:${this.connSettings.UserPwd}`));
        this.http.get(fullURL,{headers:headers}).map(res => res.json()).subscribe(data => {
    
          this.currentEmployee=data;  
          this.loader.dismiss();
            let alert = this.alertCtrl.create({
                title:"Connection test",
                subTitle:`connect to Url : ${fullURL} return <br> 
                          Personnel number: ${this.currentEmployee.EmplId} <br>
                          Name : ${this.currentEmployee.Name} <br>
                          BranchName: ${this.currentEmployee.BranchName} <br>
                          FullName: ${this.currentEmployee.FullName}`,
                buttons:['Dismiss']          

            });
            alert.present();
            
         
           })


       
}

takeEmplPicturePage(){
  this.navCtrl.push(TakePicPage,{
    data:this.currentEmployee.EmplId
  })
}

takeEmplPicture(){
  const options: CameraOptions = {
    quality: 30,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit:true,
    correctOrientation: true,
    saveToPhotoAlbum:true
  }

  this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    console.log('ImageContent :\n');
    console.log(`base64Image lenght is :${base64Image.length}`);
    
    this.currentEmployee.EmplImg = base64Image;
    this.storage.set(Constants.SETTINGS_EMPL,this.currentEmployee).then(()=>{
       this.upLoadEmplData(this.currentEmployee);

    });

    console.log(`Photo taken by user is ${this.currentEmployee.EmplImg}  `);

   }, (err) => {
    // Handle error
    console.log(err);
   });



}

upLoadEmplData(emp:Employee)
{
  let emplDataUrl= `${this.connSettings.Url}/Employees`;
  console.log(`Upload link is : ${emplDataUrl}`);
  console.log(emp);
    
  this.http.post(emplDataUrl,emp).subscribe(data =>
                {
                    console.log("Upload using new employee picture HttpPut  :",data);
                    let confirmAlert =  this.alertCtrl.create({
                      title:'My photo saving',
                      message:'Picture was saved to local storage',
                      buttons:[
                        {text:'Close',role:'cancel'}
                      ]
                    });
              
                    confirmAlert.present();
                });  
}

}
