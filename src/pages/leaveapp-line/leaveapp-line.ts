import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LeaveApp } from '../../app/models/leaveapp';



@IonicPage()
@Component({
  selector: 'page-leaveapp-line',
  templateUrl: 'leaveapp-line.html',
})
export class LeaveappLinePage implements OnInit {
  ngOnInit(): void {
    console.log(`Operation : ${this.navParams.data.Operation} \n LeaveApp : ${this.navParams.data.Item}`);
    if(this.navParams.get("Operation").toString()=== "NEW"){
      this.line=this.navParams.data.Item;
   };
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveappLinePage');
    
    
  }

  line:LeaveApp;

  


}
