import { Injectable } from '@angular/core';
import { ConnSettings } from '../../app/models/connsettings';
import { Employee } from '../../app/models/employee';
import { LeaveCode } from '../../app/models/leavecode';

@Injectable()
export class SingletonService {
  public URL:string = "";
  public USER_ID:string="";
  public EMPL_ID:string="";
  public COMP_ID:string="";
  public PWD:string="";
  public COMP_IMAGE:any=null;
  public CURR_EMPLOYEE:Employee;
  public LeaveCodes:Array<LeaveCode>;

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