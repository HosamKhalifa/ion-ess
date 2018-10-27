import { DateTime } from "ionic-angular";



export class LeaveApp {
    constructor( ) { }
    public RecId:number;
    public ApplicationId:string;
    public CreatedDateTime:Date;
    public LeaveApplicationType:string; //UI RO Always=Leave
    public DefaultLeaveCode:string; //UI  
    public AdminStatus:string;
    public LeaveEncashment:string;//UI
    public EmplId:string; //UI RO
    public EmplName:string; //UI RO
    public BranchName:string; //UI RO
    public RequestedBy:number; 
    public ScheduledLeaveDate:Date; //UI 
    public ScheduledReturnDate:Date;//UI
    public Days:number; 
    public ApprovalStatus:string; 
    public TicketReservationRequired:string;	//UI
    public NeedExitVisa:string; //UI
    public ExitVisaType:string;
    public Comments:string; //UI
    public CommentsApproval:string;
    
    


}