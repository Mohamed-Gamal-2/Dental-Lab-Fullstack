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
  isLoading: boolean = false;
  successMsg = '';
  failMsg = '';
  teethAry: Array<string> = [];
  teethNum: number = 0;
  DentistsData: any[] = [];
  steps = [{ label: 'cast' }, { label: 'build' }, { label: 'finish' }];
  statusflag: boolean = false;
  constructor(
    private _fb: FormBuilder,
    private _JobService: JobsService,
    private _dentistService: DentistServiceService
  ) {}

  addJobForm = this._fb.group({
    pationName: [
      '',
      [
        Validators.required,
        Validators.maxLength(40),
        Validators.pattern(/^[a-zA-Z\s()]+$/),
      ],
    ],
    serial: ['', [Validators.required, Validators.minLength(1)]],
    doctorId: ['', [Validators.required]],
    typeOfWork: ['', [Validators.required, Validators.pattern(/(PFM|Zircon)/)]],
    teethNumber: [[''], [Validators.required]],
    shade: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9.]*$/)]],
    deadLine: [null, [Validators.required]],
    price: [0, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
    tryIn: [false, []],
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
    if (this.addJobForm.value.comments === '')
      this.addJobForm.value.comments = 'none';
    this._JobService.addJob(values).subscribe(
      (succ) => {
        this.isLoading = false;
        this.successMsg = 'Job has been added Successfully';
        this.addJobForm.reset();
        this.addJobForm.controls.tryIn.setValue(false);
        this.addJobForm.controls.comments.setValue('');
        this.teethNum = 0;
        this.teethAry = [];
        this.currentStep = '';
        setTimeout(() => {
          this.successMsg = '';
        }, 4000);
      },
      (err) => {
        this.isLoading = false;
        console.log('err', err);
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
    this.statusflag = !this.statusflag;
    if (this.statusflag) {
      this.addJobForm.controls.status.setValue(status);
      this.currentStep = status;
    } else {
      this.addJobForm.controls.status.reset();
      this.currentStep = '';
    }
  }
}





