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
  itemUpdated: any;
  dropDownflag = true;
  Actionsflag: string = '';
  failMsg: string = '';
  successMsg: string = '';
  AllDentist: any[] = [];
  dentistName: string = '';
  filteredData: any[] = [];
  data:any
  doctorData = [
    {
      id: '',
      name: '',
    },
  ];
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
      comments: '',
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
      doctorName: '',
    },
  ];

  ngOnInit() {
    this.getAllJob();
    this._DentistService.getAllDentists().subscribe((res: any) => {
      this.AllDentist = res.data;
      for (let i = 0; i < this.AllDentist.length; i++) {
        const doctor = {
          id: this.AllDentist[i]._id,
          name: this.AllDentist[i].name,
        };
        this.doctorData.push(doctor);
      }
    });
  }

  getAllJob() {
    this._JobsService.getAllJobs().subscribe(
      (succ: any) => {
        this.accordionItems = succ.getallJobs;
        this.data = succ.getallJobs;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  DeleteJob(itemID: string) {
    this._JobsService.deleteJob(itemID).subscribe(
      (res: any) => {
        if (res.massage === 'Job deleted') {
          this.getAllJob();
          this.successMsg = 'Job Deleted';
          this.closeAll();
          setTimeout(() => {
            this.successMsg = '';
          }, 4000);
        }
      },
      (err) => {
        this.failMsg = err.error.message;
        setTimeout(() => {
          this.failMsg = '';
        }, 4000);
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
    this.getAllJob();
  }

  handleUpdate(id: string) {
    this.showPopup = true;
    this.itemUpdated = this.accordionItems.find((elem) => elem._id === id);
  }

  handleFilter(id: string) {
    if(id == 'all'){
      this.accordionItems = [...this.data]
    }else{

      this.accordionItems = [...this.data]
      this.accordionItems = this.data.filter(
        (job:any) => job.doctorId == id
        );
      
      }
    }
}
