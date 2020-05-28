import { Component, OnInit, ViewChild, Inject, Optional } from '@angular/core';
import { TicketService } from '../service/ticket.service';
import { Ticket } from '../service/ticket.service';
import {  MatTable, MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { isDataSource } from '@angular/cdk/collections';

@Component({
  selector: 'ticket-component',
  templateUrl: 'ticket.component.html'
})
export class TicketComponent implements OnInit {
  constructor(private ticketService : TicketService, public dialog: MatDialog) { }

  public columns = ["support_ticket_id", "userId", "ticket_subject", "ticket_description", "action"];

  tickets : Ticket[] = [];

  ngOnInit(): void {
     this.ticketService.getTicket().subscribe((response)=> {this.tickets = response as Ticket[];},(error) => console.log(error))
  }
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '500px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }
  addRowData(row_obj){
    
    this.tickets.push({
      support_ticket_id:row_obj,
      userId:row_obj,
      ticket_subject:row_obj,
      ticket_description:row_obj
    });
    this.table.renderRows();
    
  }
  updateRowData(row_obj){
    this.tickets = this.tickets.filter((value,key)=>{
      if(value.support_ticket_id == row_obj.support_ticket_id){
        value.userId = row_obj.userId;
        value. ticket_subject = row_obj. ticket_subject;
        value.ticket_description = row_obj.ticket_description;
      }
      return true;
    });
  }
  deleteRowData(row_obj){
    this.tickets = this.tickets.filter((value,key)=>{
      return value.support_ticket_id != row_obj.support_ticket_id;
    });
  }  
}

@Component({
  selector: 'add-ticket-section',
  templateUrl: 'dialog-box.component.html',
})
export class DialogBoxComponent {
  action:string;
  tickets:any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Ticket){
    console.log(data);
    this.tickets = {...data};
    this.action = this.tickets.action;
  }
  doAction(){
    this.dialogRef.close({event:this.action,data:this.tickets});
  }
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
} 