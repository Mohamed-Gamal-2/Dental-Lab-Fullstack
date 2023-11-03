import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StaffServiceService } from '../service/staff-service.service';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.css'],
})
export class StaffFormComponent {
  constructor(private _StaffService: StaffServiceService) {}
  isLoading: boolean = false;
  successMsg: string = '';
  errorMessage: string = '';
  staffForm: FormGroup = new FormGroup({
    ssn: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\d{14}$/),
    ]),
    age: new FormControl(null, [
      Validators.required,
      Validators.min(15),
      Validators.max(60),
    ]),
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(10),
    ]),
    jobTitle: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    salary: new FormControl(null, [Validators.required, Validators.max(20000)]),
    gender: new FormControl(null, [
      Validators.required,
      Validators.pattern(/(male|female)/),
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/01(0|1|2|5)[0-9]{8}/),
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[a-z]+([a-z]|[0-9]|_|.)*@(gmail|yahoo|hotmail).com/),
    ]),
  });
  handleAddStaff() {
    this.isLoading = true;
    const vales: any = this.staffForm.value;
    this._StaffService.addStaff(vales).subscribe(
      (add) => {
        console.log(add);
        this.isLoading = false;
        this.successMsg = 'Staff Added successfully';
      },
      (err) => {
        this.isLoading = false;
        this.errorMessage = err.error.message;
      }
    );
  }
}
