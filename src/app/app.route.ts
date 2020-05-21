import { Routes } from '@angular/router';

import { TicketComponent } from './ticket/ticket.component';

export const appRoutes: Routes = [
  { path: 'ticket', component: TicketComponent },
  { path: '', redirectTo: 'ticket', pathMatch: 'full' }
]