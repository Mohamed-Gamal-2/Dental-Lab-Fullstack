import { Component } from '@angular/core';
import { JobsService } from '../service/jobs.service';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css'],
})
export class JobCardComponent {
  constructor(private _jobServive: JobsService) {}
  accordionItems = [
    {
      createdAt: '',
      createdBy: '',
      deadLine: '',
      doctorId: '',
      materialOfPorcelain: '',
      pationName: '',
      price: 0,
      serial: 0,
      shade: '',
      teethNumber: [],
      tryIn: false,
      typeOfWork: '',
      updatedAt: '',
      __v: 0,
      _id: '',
    },
  ];

  isAccordionOpen: boolean[] = [];
  ngOnInit() {
    this._jobServive.getAllJobs().subscribe(
      (succ: any) => {
        this.accordionItems = succ.getallJobs;
        this.isAccordionOpen = Array(this.accordionItems.length).fill(false);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  toggleAccordion(index: number): void {
    this.isAccordionOpen[index] = !this.isAccordionOpen[index];
  }
}
