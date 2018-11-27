import { DateTime } from "ionic-angular";



export class LeaveApp {
    constructor( ) { }
    public RecId:number=0;
    public ApplicationId:string='';
    public CreatedDateTime:Date;
    public LeaveApplicationType:string=''; //UI RO Always=Leave
    public DefaultLeaveCode:string=''; //UI  
    public AdminStatus:string='';
    public LeaveEncashment:boolean=false;//UI
    public EmplId:string=''; //UI RO
    public EmplName:string=''; //UI RO
    public BranchName:string=''; //UI RO
    public RequestedBy:number=0; 
    public ScheduledLeaveDate:Date; //UI 
    public ScheduledReturnDate:Date;//UI
    public Days:number=0; 
    public ApprovalStatus:string=''; 
    public TicketReservationRequired:boolean=false;	//UI
    public NeedExitVisa:boolean=false; //UI
    public ExitVisaType:string='';
    public Comments:string=''; //UI
    public CommentsApproval:string='';
    public WFLineId:number=0;
    public WFActionList:string='';
    


}