import { Routes } from '@angular/router';

import { TicketSection } from './ticket/ticket.component';

export const appRoutes: Routes = [
  { path: 'ticket', component: TicketSection },
  { path: '', redirectTo: 'ticket', pathMatch: 'full' }
]