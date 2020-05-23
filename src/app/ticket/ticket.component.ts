import { Component, OnInit, ViewChild, Inject, Optional } from '@angular/core';
import { TicketService } from '../service/ticket.service';
import { Ticket } from '../service/ticket.service';
import {  MatTable } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'ticket-component',
  templateUrl: 'ticket.component.html'
})
export class TicketComponent implements OnInit {
  constructor(private rs : TicketService, public dialog: MatDialog) { }

  columns = ["Ticket Id","Ticket Owner","Ticket Subject", "Ticket Message"];
  index = ["support_ticket_id", "userId", "ticket_subject", "ticket_description"];

  tickets : Ticket[] = [];

  ngOnInit(): void {
     this.rs.getTicket().subscribe((response)=> {this.tickets = response;},(error) => console.log(error))
  }
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
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
    var d = new Date();
    this.tickets.push({
      ticketId:d.getTime(),
      ticketOwner:row_obj.ticketOwner,
      ticketSubject:row_obj.ticketSubject,
      ticketMessage:row_obj.ticketMessage
    });
    this.table.renderRows();
    
  }
  updateRowData(row_obj){
    this.tickets = this.tickets.filter((value,key)=>{
      if(value.ticketId == row_obj.ticketId){
        value.ticketOwner = row_obj.ticketOwner;
        value. ticketSubject = row_obj. ticketSubject;
        value.ticketMessage = row_obj.ticketMessage;
      }
      return true;
    });
  }
  deleteRowData(row_obj){
    this.tickets = this.tickets.filter((value,key)=>{
      return value.ticketId != row_obj.ticketId;
    });
  }  
}

@Component({
  selector: 'add-ticket-section',
  templateUrl: 'dialog-box.component.html',
})
export class DialogBoxComponent {
  action:string;
  local_data:any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Ticket) {
    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;
  }
  doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
} 