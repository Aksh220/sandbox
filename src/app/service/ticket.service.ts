import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Ticket {
  support_ticket_id: number,
  environment_id: string,
  ticket_subject: string,
  ticket_description:string
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  constructor(private http : HttpClient) { }
  url : string = "https://5eb39595974fee0016ecd67c.mockapi.io/demo/tickets"

  getTicket()
  {
    return this.http.get<Ticket[]>(this.url);
  }
}