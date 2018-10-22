


export class AppType{
    static ToStr():Array<string>{
        let ret = Array<string>();

        ret.push(this.Leave);
        ret.push(this.Termination);
        ret.push(this.Resignation);
        
        return ret;
    }
    static readonly Leave:string="Leave";
    static readonly Termination:string="Termination";
    static readonly Resignation:string="Resignation";
    static readonly Escape:string="Escape";
    static readonly Death:string="Death";
}

export class AppStatus
{
    static ToStr():Array<string>{
        let ret = Array<string>();

        ret.push(this.Open);
        ret.push(this.ReportAsReady);
        ret.push(this.Approved);
        ret.push(this.Rejected);
        ret.push(this.Submitted);
        ret.push(this.ChangeRequest);
                
        return ret;
    }
    static readonly Open:string             = "Open";
    static readonly ReportAsReady:string    = "ReportAsReady";
    static readonly Approved:string         = "Approved";
    static readonly Rejected:string         = "Rejected";
    static readonly Submitted:string        = "Submitted"; 
    static readonly ChangeRequest:string    = "ChangeRequest";
  
}
export class VisaType
    {
        static ToStr():Array<string>{
            
            let ret = Array<string>();
    
            ret.push(this.None);
            ret.push(this.ExitReentry);
            ret.push(this.FinalExit);
            ret.push(this.ExitReentryMultiple);
            
            return ret;
        }
        static readonly None= "None";
        static readonly ExitReentry= "ExitReentry";
        static readonly FinalExit= "FinalExit";
        static readonly ExitReentryMultiple= "ExitReentryMultiple"
    
    }
