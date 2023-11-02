import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StaffModule } from './staff/staff.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DentistModule } from './dentist/dentist.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { StaffModule } from './staff/staff.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DentistModule,
    BrowserAnimationsModule,
    SharedModule,
    StaffModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
