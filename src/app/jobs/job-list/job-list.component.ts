import { Component } from '@angular/core';
import { JobsService } from '../service/jobs.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
})
export class JobListComponent {
  JobsData: any;
  constructor(private _JobsService: JobsService) {}

  getAllData() {
     this._JobsService.getAllJobs().subscribe(
      (res: any) => {
        this.JobsData = res.data;
        console.log(this.JobsData)
      },
      (err) => console.error(err)
    );
  }
}
