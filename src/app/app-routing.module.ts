import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffComponent } from './staff/staff/staff.component';
import { DentistComponent } from './dentist/dentist/dentist.component';
import { LoginComponent } from './manage/login/login.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { RegisterComponent } from './manage/register/register.component';
import { DashboardContentComponent } from './dashboard/dashboard-content/dashboard-content.component';
const routes: Routes = [
  { path: '', component: DashboardContentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dentist', component: DentistComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'dashboard', component: DashboardContentComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
