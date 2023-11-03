import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DentistServiceService } from '../service/dentist-service.service';
import { DentistInterface } from '../interface/dentist-interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dentist-card',
  templateUrl: './dentist-card.component.html',
  styleUrls: ['./dentist-card.component.css'],
})
export class DentistCardComponent {
  @Output() showModalChild = new EventEmitter();
  @Input() requiredDentist: DentistInterface = {
    type: '',
    phone: '',
    name: '',
    email: '',
    address: '',
  };
  isLoading: boolean = false;
  failMsg: string = '';
  successMsg: string = '';
  updateDentistForm: any;
  updateDentistUn: Subscription = new Subscription();
  constructor(
    private fb: FormBuilder,
    private _dentistServices: DentistServiceService
  ) {}

  ngOnChanges() {
    this.updateDentistForm = this.fb.group({
      type: [
        this.requiredDentist.type,
        [
          Validators.required,
          Validators.pattern(/(Indvidual|Hospital|Clinic)/),
        ],
      ],
      name: [
        this.requiredDentist.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      phone: [
        this.requiredDentist.phone,
        [Validators.required, Validators.pattern(/01(0|1|2|5)[0-9]{8}/)],
      ],
      address: [this.requiredDentist.address, [Validators.minLength(4)]],
      email: [
        this.requiredDentist.email,
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
    const values: any = this.updateDentistForm.value;
    this._dentistServices
      .updateDentist(values, this.requiredDentist._id)
      .subscribe(
        (succ) => {
          this._dentistServices.setChanger(Math.random() * 100);
          this.isLoading = false;
          this.successMsg = 'Client has been updated Successfully';
        },
        (err) => {
          this.isLoading = false;
          this.failMsg = err;
        }
      );
  }
  ngOnDestroy() {
    this.updateDentistUn.unsubscribe();
  }
}
