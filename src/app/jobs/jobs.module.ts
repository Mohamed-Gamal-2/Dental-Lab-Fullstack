import { NgModule } from '@angular/core';
import { JobCardComponent } from './job-card/job-card.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobFormComponent } from './job-form/job-form.component';
import { JobsComponent } from './jobs/jobs.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    JobCardComponent,
    JobListComponent,
    JobFormComponent,
    JobsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ],
})
export class JobsModule {}
