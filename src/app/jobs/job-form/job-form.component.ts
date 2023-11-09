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
  currentStep:string=''
  isDisabled: boolean = true;
  isLoading: boolean = false;
  successMsg = '';
  failMsg = '';
  teethAry: Array<string> = [];
  teethNum: number = 0;
  Totleprice: number = 0;
  typeOfWork: string = '';
  DentistsData: any[] = [];
  steps = [{ label: 'cast' }, { label: 'build' }, { label: 'finish' }];
  constructor(
    private _fb: FormBuilder,
    private _JobService: JobsService,
    private _dentistService: DentistServiceService
  ) {}

  addJobForm = this._fb.group({
    patienName: ['', [Validators.required]],
    serial: ['', [Validators.required, Validators.min(1)]],
    doctorName: ['', [Validators.required]],
    typeOfWork: ['', [Validators.required]],
    teethNumber: [
      '',
      [Validators.required, Validators.min(1), Validators.max(32)],
    ],
    shade: [
      '',
      [
        Validators.pattern(
          '^(A1|A2|A3|A3.5|A4|B1|B2|B3|B4|C1|C2|C3|C4|D2|D3|D4)$'
        ),
      ],
    ],
    deadLine: [null, [Validators.required]],
    price: [null, [Validators.required]],
    tryIn: [false, [Validators.required]],
    status: ['', ],
    
  });

  OnSubmit() {
    this.successMsg = '';
    this.failMsg = '';
    this.isLoading = true;
    const values: any = this.addJobForm.value;
    console.log('values', values);

    //   this._JobService.addJob(values).subscribe(
    //     (succ) => {
    //       this.isLoading = false;
    //       this.successMsg = 'Job has been added Successfully';
    //       this.addJobForm.reset();
    //     },
    //     (err) => {
    //       this.isLoading = false;
    //       let msg = err.error.message.writeErrors[0].err.errmsg;
    //       msg = msg.slice(msg.indexOf('{') + 2, -2);
    //       this.failMsg = msg + ` is alerady existing`;
    //     }
    //   );
  }

  totlePrice() {
    if (this.typeOfWork && this.teethNum == 0) {
      if (this.typeOfWork === 'PFM') {
        this.Totleprice = 600;
      } else if (this.typeOfWork === 'Zircon') {
        this.Totleprice = 1200;
      }
    } else {
      if (this.typeOfWork === 'PFM') {
        this.Totleprice = 600 * this.teethNum;
      } else if (this.typeOfWork === 'Zircon') {
        this.Totleprice = 1200 * this.teethNum;
      }
    }
  }
  setteeth(teethnum: string) {
    const flag = this.teethAry.includes(teethnum);
    if (!flag) {
      this.teethAry.push(teethnum);
      this.teethNum = this.teethAry.length;
      if (this.typeOfWork === 'PFM') {
        this.Totleprice = 600 * this.teethNum;
      } else if (this.typeOfWork === 'Zircon') {
        this.Totleprice = 1200 * this.teethNum;
      }
    } else {
    }
  }

  removeteeth(teethnum: string) {
    const foundTeeth = this.teethAry.indexOf(teethnum);
    if (foundTeeth !== -1) {
      this.teethAry.splice(foundTeeth, 1);
      this.teethNum = this.teethAry.length;
      this.Totleprice = this.Totleprice * this.teethNum;
    }
  }

  handleDoctorName() {
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
    let doctorId = this.addJobForm.value.doctorName;
    let DentistFouned = this.DentistsData.find(
      (element) => element._id == doctorId
    );
    if (DentistFouned) {
      serialNum = DentistFouned.cases.length + 1;
      this.addJobForm.controls.serial.setValue(serialNum);
    }
  }
  ngOnInit() {
    this.handleDoctorName();
  }
  handelstatus(status:any){
    this.addJobForm.controls.status.setValue(status);
    this.currentStep= status
    
  }
}
