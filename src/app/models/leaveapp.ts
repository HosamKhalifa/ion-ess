import { DateTime } from "ionic-angular";


export class LeaveApp{
    constructor(public RecId:number,
                public ApplicationId:string,
                public LeaveApplicationType:number,
                public EmplId:string,
                public ApprovalStatus:number,
                public DefaultLeaveCode:string,
                public RequestedBy:number,
                public ScheduledLeaveDate:Date,
                public ScheduledReturnDate:Date,
                public ExitVisaType:number,
                public Comments:string,
                public CommentsApproval:string,
                public CreatedDateTime:DateTime,
                public Days:number
                        ){ }
    
                        

}