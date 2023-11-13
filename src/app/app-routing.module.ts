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
  {
    path: '',
    component: DashboardContentComponent,
    canActivate: [authGuard],
    title: 'Dashboard',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authReverseGuard],
    title: 'Login',
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [authGuard],
    title: 'Register',
  },
  {
    path: 'dentist',
    component: DentistComponent,
    canActivate: [authGuard],
    title: 'Clients',
  },
  {
    path: 'staff',
    component: StaffComponent,
    canActivate: [authGuard],
    title: 'Staff',
  },
  {
    path: 'jobs',
    component: JobsComponent,
    canActivate: [authGuard],
    title: 'Jobs',
  },
  {
    path: 'dashboard',
    component: DashboardContentComponent,
    canActivate: [authGuard],
    title: 'Dashboard',
  },
  { path: '**', component: NotfoundComponent, title: '404 Not Found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
