import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StaffModule } from './staff/staff.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DentistModule } from './dentist/dentist.module';
import { SharedModule } from './shared/shared.module';
import { ManageModule } from './manage/manage.module';
import { NgChartsModule } from 'ng2-charts';
import { JobsModule } from './jobs/jobs.module';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DentistModule,
    BrowserAnimationsModule,
    SharedModule,
    StaffModule,
    ManageModule,
    NgChartsModule,
    JobsModule,
    DashboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
