import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { JobsService } from '../service/jobs.service';
import { DentistServiceService } from 'src/app/dentist/service/dentist-service.service';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css'],
})
export class JobFormComponent {
  arrayOfNames: any[] = [];
  currentStep: string = '';
  isDisabled: boolean = true;
  isLoading: boolean = false;
  successMsg = '';
  failMsg = '';
  teethAry: Array<string> = [];
  teethNum: number = 0;
  Totleprice: number = 0;
  DentistsData: any[] = [];
  steps = [{ label: 'cast' }, { label: 'build' }, { label: 'finish' }];
  constructor(
    private _fb: FormBuilder,
    private _JobService: JobsService,
    private _dentistService: DentistServiceService
  ) {}

  addJobForm = this._fb.group({
    pationName: ['', [Validators.required]],
    serial: ['', [Validators.required, Validators.minLength(1)]],
    doctorId: ['', [Validators.required]],
    typeOfWork: ['', [Validators.required, Validators.pattern(/(PFM|Zircon)/)]],
    teethNumber: [
      [''],
      [Validators.required, Validators.min(1), Validators.max(32)],
    ],
    shade: ['', [Validators.required]],
    deadLine: [null, [Validators.required]],
    price: [0, [Validators.required]],
    tryIn: [false],
    status: [
      '',
      [Validators.required, Validators.pattern(/(cast|build|finish)/)],
    ],
    comments: [''],
  });

  OnSubmit() {
    this.successMsg = '';
    this.failMsg = '';
    this.isLoading = true;
    const values: any = this.addJobForm.value;
   if (this.addJobForm.value.comments === '') this.addJobForm.value.comments = "none"
    this._JobService.addJob(values).subscribe(
      (succ) => {
        this.isLoading = false;
        this.successMsg = 'Job has been added Successfully';
        this.addJobForm.reset();
        this.teethNum = 0

      },
      (err) => {
        this.isLoading = false;
        let msg = err.error.message.writeErrors[0].err.errmsg;
        msg = msg.slice(msg.indexOf('{') + 2, -2);
        this.failMsg = msg + ` is alerady existing`;
      }
    );
  }

  totlePrice() {
    if (this.addJobForm.value.typeOfWork && this.teethNum == 0) {
      if (this.addJobForm.value.typeOfWork === 'PFM') {
        this.addJobForm.controls.price.setValue(600);
      } else if (this.addJobForm.value.typeOfWork === 'Zircon') {
        this.addJobForm.controls.price.setValue(1200);
      }
    } else {
      if (this.addJobForm.value.typeOfWork === 'PFM') {
        this.addJobForm.controls.price.setValue(600 * this.teethNum);
      } else if (this.addJobForm.value.typeOfWork === 'Zircon') {
        this.addJobForm.controls.price.setValue(1200 * this.teethNum);
      }
    }
  }
  setteeth(teethnum: string) {
    const flag = this.teethAry.includes(teethnum);
    if (!flag) {
      this.teethAry.push(teethnum);
      this.addJobForm.controls.teethNumber.setValue(this.teethAry);
      this.teethNum = this.teethAry.length;
      if (this.addJobForm.value.typeOfWork === 'PFM') {
        this.addJobForm.controls.price.setValue(600 * this.teethNum);
      } else if (this.addJobForm.value.typeOfWork === 'Zircon') {
        this.addJobForm.controls.price.setValue(1200 * this.teethNum);
      }
    } else {
    }
  }

  removeteeth(teethnum: string) {
    const foundTeeth = this.teethAry.indexOf(teethnum);
    if (foundTeeth !== -1) {
      this.teethAry.splice(foundTeeth, 1);
      this.addJobForm.controls.teethNumber.setValue(this.teethAry);
      this.teethNum = this.teethAry.length;
      if (this.addJobForm.value.typeOfWork === 'PFM') {
        this.addJobForm.controls.price.setValue(600 * this.teethNum);
      } else if (this.addJobForm.value.typeOfWork === 'Zircon') {
        this.addJobForm.controls.price.setValue(1200 * this.teethNum);
      }
    }
  }

  handledoctorId() {
    this._dentistService.getAllDentists().subscribe(
      (res: any) => {
        this.DentistsData = res.data;
        this.DentistsData.forEach((element: any) => {
          this.arrayOfNames.push({ name: element.name, id: element._id });
        });
      },
      (err) => {
        this.failMsg = ` There is not Doctor Founded `;
      }
    );
  }

  handleSerial() {
    let serialNum;
    let doctorId = this.addJobForm.value.doctorId;
    let DentistFouned = this.DentistsData.find(
      (element) => element._id == doctorId
    );
    if (DentistFouned) {
      serialNum = DentistFouned.cases.length + 1;
      this.addJobForm.controls.serial.setValue(serialNum);
    }
  }
  ngOnInit() {
    this.handledoctorId();
  }
  handelstatus(status: any) {
    this.addJobForm.controls.status.setValue(status);
    this.currentStep = status;
  }
}




//  "serial": 60 ,
//     "doctorId": "654a81ba77359b9da0f50708" ,
//     "typeOfWork": "PFM",
//     "pationName":"mohamed Rmdn",
//     "teethNumber": ["10","9"],
//     "shade": "A3.5/A2",
//     "deadLine": "2023-10-26",
//     "price": 500,
//     "tryIn": false,
//     "status":"build",
//     "comments": "mhavdjva"


// Comments: '';
// deadLine: '2023-11-30';
// doctorId: '654a81ba77359b9da0f50708';
// pationName: 'حماده ';
// price: 600;
// serial: 20;
// shade: 'A2';
// status: 'cast';
// teethNumber: ['11'];
// tryIn: false;
// typeOfWork: 'PFM';
