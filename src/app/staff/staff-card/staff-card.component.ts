import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StaffServiceService } from '../service/staff-service.service';
import { Subscription } from 'rxjs';
import { StaffInterface } from '../interface/staff-interface';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-staff-card',
  templateUrl: './staff-card.component.html',
  styleUrls: ['./staff-card.component.css'],
})
export class StaffCardComponent {
  @Output() showModalChild = new EventEmitter();
  @Input() requiredStaff: StaffInterface = {
    ssn: 0,
    phone: '',
    name: '',
    email: '',
    gender: '',
    age: 0,
    salary: 0,
    jobTitle: '',
  };
  isLoading: boolean = false;
  failMsg: string = '';
  successMsg: string = '';
  updateStaffForm: any;
  updateStaffUn: Subscription = new Subscription();
  constructor(
    private fb: FormBuilder,
    private _staffServices: StaffServiceService
  ) {
    window.addEventListener('keyup', (eve) => {
      if (eve.key == 'Escape') this.handleClose();
    });
  }

  ngOnChanges() {
    this.updateStaffForm = this.fb.group({
      ssn: [
        this.requiredStaff.ssn,
        [Validators.required, Validators.pattern(/^\d{14}$/)],
      ],
      age: [
        this.requiredStaff.age,
        [Validators.required, Validators.min(15), Validators.max(80)],
      ],
      name: [
        this.requiredStaff.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      jobTitle: [
        this.requiredStaff.jobTitle,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      salary: [
        this.requiredStaff.salary,
        [Validators.required, Validators.max(30000)],
      ],
      gender: [
        this.requiredStaff.gender,
        [Validators.required, Validators.pattern(/(male|female)/)],
      ],
      phone: [
        this.requiredStaff.phone,
        [Validators.required, Validators.pattern(/01(0|1|2|5)[0-9]{8}/)],
      ],
      email: [
        this.requiredStaff.email,
        [
          Validators.required,
          Validators.pattern(
            /^[a-z]+([a-z]|[0-9]|_|.)*@(gmail|yahoo|hotmail).com/
          ),
        ],
      ],
    });
  }
  handleClose() {
    this.showModalChild.emit(false);
  }
  handleOnSubmit() {
    this.successMsg = '';
    this.failMsg = '';
    this.isLoading = true;
    const values: any = this.updateStaffForm.value;
    this._staffServices.updateStaff(values, this.requiredStaff._id).subscribe(
      (succ) => {
        this._staffServices.setChanger(Math.random() * 100);
        this.isLoading = false;
        this.successMsg = 'Staff has been updated Successfully';
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
        if (err.error.message == 'no staff for this id ${id}') {
          this.failMsg = ` Please, Login using admin account`;
        } else {
          let key = Object.keys(err.error.message?.keyValue)[0];
          let value = Object.values(err.error.message?.keyValue)[0];
          this.failMsg = `${key} : ${value} is already existing`;
        }
      }
    );
  }
  ngOnDestroy() {
    this.updateStaffUn.unsubscribe();
  }
}
