import { Component, Output } from '@angular/core';
import { JobsService } from '../service/jobs.service';
import { DentistServiceService } from 'src/app/dentist/service/dentist-service.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
})
export class JobListComponent {
  
  showPopup = false;
  itemUpdated:any
  dropDownflag = true;
  Actionsflag:string = '';
  failMsg: string = '';
  successMsg: string = '';
  AllDentist: any[] = [];
  constructor(
    private _JobsService: JobsService,
    private _DentistService: DentistServiceService
  ) {}
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
      status: '',
      updatedAt: '',
      __v: 0,
      _id: '',
    },
  ];
  ngOnInit() {
    this.getAllJob();
    this._DentistService.getAllDentists().subscribe((res: any) => {
      this.AllDentist = res.data;
    });
  }
  getAllJob() {
    this._JobsService.getAllJobs().subscribe(
      (succ: any) => {
        this.accordionItems = succ.getallJobs;
        // this.isAccordionOpen = Array(this.accordionItems.length).fill(false);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  DeleteJob(itemID: string) {
    this._JobsService.deleteJob(itemID).subscribe(
      (res: any) => {
        console.log(res);
        if (res.massage === 'Job deleted') {
          this.closeAll();
          this.getAllJob();
          this.successMsg = 'Job Deleted';
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  handleDropdown() {
    this.dropDownflag = !this.dropDownflag;
  }
  handleActions(itemID: string) {
    this.Actionsflag = itemID;
  }
  closeAll() {
    this.Actionsflag = '';
    this.showPopup = false;
    this.getAllJob()
  }
  handleUpdate(id : string) {
    this.showPopup = true;
    this.itemUpdated = this.accordionItems.find((elem) => elem._id === id);
  
  }
}
