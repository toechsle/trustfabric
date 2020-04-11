import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';

import { HomeComponent } from './home/home.component';

import { ConsultantsComponent } from './consultants/consultants.component';
import { ClientsComponent } from './clients/clients.component';
import { NoAccessComponent } from './auth/no-access/no-access.component';

import { AdminClientComponent } from './admin-client/admin-client.component';
import { AdminConsultantComponent } from './admin-consultant/admin-consultant.component';
import { AdminNetworkComponent } from './admin-network/admin-network.component';



const routes: Routes = [
  
  { path: '', component: HomeComponent },

  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard, RoleGuard], data: {expectedRole: 'Client'} },
  { path: 'consultants', component: ConsultantsComponent, canActivate: [AuthGuard, RoleGuard], data: {expectedRole: 'Consultant'} },
  { path: 'admin-clients', component: AdminClientComponent, canActivate: [AuthGuard, RoleGuard], data: {expectedRole: 'ClientAdmin'} },
  { path: 'admin-consultants', component: AdminConsultantComponent, canActivate: [AuthGuard, RoleGuard], data: {expectedRole: 'ConsultantAdmin'} },
  { path: 'network-admin', component: AdminNetworkComponent, canActivate: [AuthGuard, RoleGuard], data: {expectedRole: 'NetworkAdmin'} },
  { path: 'no-access', component: NoAccessComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: '' }

];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: [AuthGuard, RoleGuard]
})
export class AppRoutingModule { }
