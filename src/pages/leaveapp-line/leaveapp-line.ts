import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validator, FormBuilder, Validators} from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LeaveApp } from '../../app/models/leaveapp';
import{Http} from '@angular/http';
import { LeaveCode } from '../../app/models/leavecode';
import { AppType,AppStatus,VisaType } from '../../app/models/enums';
import {GlobalProvider} from '../../providers/global/global';




@IonicPage()
@Component({
  selector: 'page-leaveapp-line',
  templateUrl: 'leaveapp-line.html',
})
export class LeaveappLinePage implements OnInit {
  ngOnInit(): void {
    
    this.line = this.navParams.data.Item? this.navParams.data.Item:null;
  
      console.log(`New Line from Params ${this.line}`);
/*
      this.signupform = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(10)]),
        password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
        name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
        email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      });   
      //==========================================================
 */     
      this.tomorrow.setDate( new Date().getDate() + 1);
      this.lineFG =  this.formBuilder.group({
        DefaultLeaveCode:new FormControl('Absence',[Validators.required,Validators.minLength(2)]) ,  //['value',Validators.required],
        CreatedDateTime:new FormControl(new Date().toISOString(),[Validators.required]),//['value',Validators.required],
        ScheduledLeaveDate:new FormControl(this.tomorrow.toISOString(),[Validators.required]),//[this.toDay,Validators.required],
        ScheduledReturnDate:new FormControl(this.tomorrow.toISOString(),[Validators.required]),//['value',Validators.required],
        LeaveEncashment:new FormControl(false,[]),//['value'],
        // EmplId:['value'],
        // EmplName:['value'],
        // BranchName:['value'],
        
        TicketReservationRequired:new FormControl(false,[]),//['value'],
        NeedExitVisa:new FormControl(false,[]),//['value'],
        ExitVisaType:new FormControl(false,[]),//['value'],
        Comments:new FormControl('',[Validators.required,Validators.minLength(5)]) //['value']
      })    ;   
    
    //get leavecodelist
    
    this.leaveCodeList=this.global.LeaveCodes;
    console.log(`LeaveCodeList from Global variable instance ${this.global.LeaveCodes.length} rows`);
   if(this.leaveCodeList){
      this.leaveCodeList.forEach((x)=>{
        console.log(`Leave code list from params: ${x.Description}  `);
      }) ;
    
   }else{console.log('LEAVECODELIST is not passed correctly ');}
    console.log(`Operation : ${this.navParams.data.Operation} \n LeaveApp : ${this.navParams.data.Item.CreatedDateTime}`);
   
   
  
  
  }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder:FormBuilder,
              public http:Http,
              public global:GlobalProvider
              ) {
                
           
       
   
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveappLinePage');
    
    
  }
  //Properties
  lineFG:FormGroup;
  line:LeaveApp;
  tomorrow =new Date();
  leaveCodeList:Array<LeaveCode>;
  post(){
    //Validate all relative fields value
    console.log('Post new:',this.lineFG.value); 
    var url = `${this.global.URL}/leaves`;
    console.log('Target URL:',url);
    let postData = new FormData();
    /*postData.append('LeaveApplicationType',this.line.LeaveApplicationType);
    postData.append('EmplId',this.line.EmplId);
    postData.append('RequestedBy','0');
    postData.append('ScheduledLeaveDate',this.line.ScheduledLeaveDate.toJSON());
    postData.append('ScheduledReturnDate',this.line.ScheduledReturnDate.toJSON());
    postData.append('ApprovalStatus',this.line.ApprovalStatus);
    postData.append('ExitVisaType',this.line.ExitVisaType);
    postData.append('Comments',this.line.Comments);
    postData.append('CommentsApproval',this.line.CommentsApproval);
    postData.append('TicketReservationRequired',(this.line.TicketReservationRequired?'true':'false'));
    postData.append('LeaveEncashment',(this.line.LeaveEncashment?'true':'false'));
    postData.append('NeedExitVisa',(this.line.NeedExitVisa?'true':'false'));*/

    this.http.post(url,this.line).subscribe(data =>
      {
        console.log("Post new leave line result:",data);
      });
    

  }


}
