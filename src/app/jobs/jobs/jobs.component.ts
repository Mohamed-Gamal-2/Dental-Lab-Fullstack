import { Component } from '@angular/core';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent {
  view: boolean = true;
  viewJobs() {
    this.view = true;
  }
  addJobs() {
    this.view = false;
  }
  
}
