import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConnSettings } from '../../app/models/connsettings';
import { Employee } from '../../app/models/employee';
import { LeaveCode } from '../../app/models/leavecode';
/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {

  constructor(public http: HttpClient) {
    console.log('Hello GlobalProvider Provider');
  }
  public URL:string = "";
  public USER_ID:string="";
  public EMPL_ID:string="";
  public COMP_ID:string="";
  public PWD:string="";
  public COMP_IMAGE:any=null;
  public CURR_EMPLOYEE:Employee;
  public LeaveCodes:any;

  private _connSettings: ConnSettings;
    public get connSettings(): ConnSettings {
        return this._connSettings;
    }
    public set connSettings(value: ConnSettings) {
        this._connSettings  = value;
        this.URL            = this._connSettings.Url;
        this.COMP_ID        = this._connSettings.CompId;
        this.USER_ID        = this._connSettings.UserId;
        this.PWD            = this._connSettings.UserPwd;
        this.COMP_IMAGE     = this._connSettings.CompImage;
        this.EMPL_ID        = this._connSettings.UserId;

        


    }


}
