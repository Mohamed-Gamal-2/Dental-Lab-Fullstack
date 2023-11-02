import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.css'],
})
export class StaffFormComponent {
  staffForm: FormGroup = new FormGroup({
    ssn: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\d{9}$/),
    ]),
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
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
}
