import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobCardComponent } from './job-card/job-card.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobFormComponent } from './job-form/job-form.component';



@NgModule({
  declarations: [
    JobCardComponent,
    JobListComponent,
    JobFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class JobsModule { }
