import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff/staff.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffCardComponent } from './staff-card/staff-card.component';
import { StaffFormComponent } from './staff-form/staff-form.component';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    StaffComponent,
    StaffListComponent,
    StaffCardComponent,
    StaffFormComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    ReactiveFormsModule,
  ],
})
export class StaffModule {}
