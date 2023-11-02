import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DentistServiceService } from '../service/dentist-service.service';

@Component({
  selector: 'app-dentist-form',
  templateUrl: './dentist-form.component.html',
  styleUrls: ['./dentist-form.component.css'],
})
export class DentistFormComponent {
  displayedColumns: string[] = [
    'ID',
    'Name',
    'Type',
    'Phone',
    'Email',
    'Address',
  ];
  dataSource: any;
  isLoading: boolean = false;
  successMsg = '';
  failMsg = '';
  constructor(
    private fb: FormBuilder,
    private _dentistServices: DentistServiceService
  ) {}
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
    this.successMsg = '';
    this.failMsg = '';
    this.isLoading = true;
    const values: any = this.addDentistForm.value;
    this._dentistServices.addDentist(values).subscribe(
      (succ) => {
        console.log(succ);
        this.isLoading = false;
        this.successMsg = 'Client has been added Successfully';
      },
      (err) => {
        this.isLoading = false;
        let msg = err.error?.message?.writeErrors[0]?.err?.errmsg;
        msg = msg.slice(msg.indexOf('{') + 2, -2);
        this.failMsg = msg + ` is alerady existing`;
      }
    );
  }
}
