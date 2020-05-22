import { Component, OnInit } from '@angular/core';
import { TicketService } from '../service/ticket.service';
import { Ticket } from '../service/ticket.service';

@Component({
  selector: 'ticket-component',
  templateUrl: 'ticket.component.html'
})
export class TicketComponent implements OnInit {
  constructor(private rs : TicketService) { }

  columns = ["Ticket Id","Ticket Owner","Ticket Subject", "Ticket Message"];
  index = ["support_ticket_id", "userId", "ticket_subject", "ticket_description"];

  tickets : Ticket[] = [];

  ngOnInit(): void {
     this.rs.getTicket().subscribe
     (
       (response)=>
       {
         this.tickets = response;
       },
       (error) => console.log(error)
     )
   }
}