import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffComponent } from './staff/staff/staff.component';
import { DentistComponent } from './dentist/dentist/dentist.component';
import { LoginComponent } from './manage/login/login.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { RegisterComponent } from './manage/register/register.component';
import { DashboardContentComponent } from './dashboard/dashboard-content/dashboard-content.component';
import { authGuard } from './guards/auth.guard';
import { JobListComponent } from './jobs/job-list/job-list.component';
import { JobsComponent } from './jobs/jobs/jobs.component';
import { authReverseGuard } from './guards/auth-reverse.guard';

const routes: Routes = [
  { path: '', component: DashboardContentComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent, canActivate: [authReverseGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [authGuard] },
  { path: 'dentist', component: DentistComponent, canActivate: [authGuard] },
  { path: 'staff', component: StaffComponent, canActivate: [authGuard] },
  { path: 'jobs', component: JobsComponent, canActivate: [authGuard] },
  {
    path: 'dashboard',
    component: DashboardContentComponent,
    canActivate: [authGuard],
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
