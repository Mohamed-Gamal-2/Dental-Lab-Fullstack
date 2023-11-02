import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dentist-form',
  templateUrl: './dentist-form.component.html',
  styleUrls: ['./dentist-form.component.css'],
})
export class DentistFormComponent {
  constructor(private fb: FormBuilder) {}
  addDentistForm = this.fb.group({
    type: [
      '',
      [Validators.required, Validators.pattern(/(Indvidual|Hospital|Clinic)/)],
    ],
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    phone: [
      '',
      [Validators.required, Validators.pattern(/01(0|1|2|5)[0-9]{8}/)],
    ],
    address: ['', [Validators.required, Validators.minLength(4)]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^[a-z]+([a-z]|[0-9]|_|.)*@(gmail|yahoo|hotmail).com/
        ),
      ],
    ],
  });

  handleOnSubmit() {
    console.log(this.addDentistForm.value);
  }
}
