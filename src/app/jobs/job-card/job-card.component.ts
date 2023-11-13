import { Component, Input } from '@angular/core';
import { JobsService } from '../service/jobs.service';
import { FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css'],
})
export class JobCardComponent {
  @Input() showPopup = false;
  @Input() itemUpdated: any;
  isLoading:boolean =false
  currentStep: string = '';
    successMsg:string = '';
    failMsg:string = '';
  teethNum: number = 0;
  updateJobForm: any;
  steps = [{ label: 'cast' }, { label: 'build' }, { label: 'finish' }];
  constructor(private _jobServive: JobsService, private _fb: FormBuilder) {}
  accordionItems: any;

  OnSubmit() {
    this.isLoading =true
       this.successMsg = '';
       this.failMsg = '';
        const values: any = this.updateJobForm.value;  
        console.log(values);
              
        this._jobServive.updateJob(values, this.itemUpdated._id).subscribe(
          (succ) => {
            this.isLoading = false;
            this.successMsg = 'Job has been updated Successfully';
            setTimeout(()=>{
              this.successMsg =''
            },3000)
          },
          (err) => {
            this.isLoading = false;          
              this.failMsg = err.error.message;
            setTimeout(() => {
              this.failMsg = '';
            }, 3000);
          }
        );

  }

  ngOnChanges() {
    this.updateJobForm = this._fb.group({
      pationName: [
        this.itemUpdated?.pationName,
        [
          Validators.required,
          Validators.maxLength(40),
          Validators.pattern(/^[a-zA-Z\s()]+$/),
        ],
      ],
      serial: [
        this.itemUpdated?.serial,
        [Validators.required, Validators.minLength(1)],
      ],
      doctorId: [this.itemUpdated?.doctorId, [Validators.required]],
      typeOfWork: [
        this.itemUpdated?.typeOfWork,
        [Validators.required, Validators.pattern(/(PFM|Zircon)/)],
      ],
      teethNumber: [
        this.itemUpdated?.teethNumber,
        [Validators.required],
      ],
      shade: [this.itemUpdated?.shade, [Validators.required]],
      deadLine: [this.itemUpdated?.deadLine, [Validators.required]],
      price: [this.itemUpdated?.price, [Validators.required]],
      tryIn: [this.itemUpdated?.tryIn],
      status: [
        this.itemUpdated?.status,
        [Validators.required, Validators.pattern(/(cast|build|finish)/)],
      ],
      comments: [this.itemUpdated?.comments],
    });
  }

  totlePrice() {
    this.teethNum = this.itemUpdated.teethNumber.length;
    if (this.updateJobForm.value.typeOfWork && this.teethNum == 0) {
      if (this.updateJobForm.value.typeOfWork === 'PFM') {
        this.updateJobForm.controls.price.setValue(600);
      } else if (this.updateJobForm.value.typeOfWork === 'Zircon') {
        this.updateJobForm.controls.price.setValue(1200);
      }
    } else {
      if (this.updateJobForm.value.typeOfWork === 'PFM') {
        this.updateJobForm.controls.price.setValue(600 * this.teethNum);
      } else if (this.updateJobForm.value.typeOfWork === 'Zircon') {
        this.updateJobForm.controls.price.setValue(1200 * this.teethNum);
      }
    }
  }
  closePopup() {
    this.showPopup = false;
  }
  handleStatus(status: any) {
    this.updateJobForm.controls.status.setValue(status);
    this.currentStep = status;
  }
}
