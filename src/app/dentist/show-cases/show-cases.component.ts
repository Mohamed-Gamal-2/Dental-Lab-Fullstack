import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DentistInterface } from '../interface/dentist-interface';
import { DentistServiceService } from '../service/dentist-service.service';

@Component({
  selector: 'app-show-cases',
  templateUrl: './show-cases.component.html',
  styleUrls: ['./show-cases.component.css'],
})
export class ShowCasesComponent {
  @Output() showCasesChild = new EventEmitter();
  @Input() requiredDentist: DentistInterface = {
    type: '',
    phone: '',
    name: '',
    email: '',
    address: '',
    cases: [{}],
  };
  constructor(private _dentistServices: DentistServiceService) {
    window.addEventListener('keyup', (eve) => {
      if (eve.key == 'Escape') this.handleClose();
    });
  }

  handleClose() {
    this.showCasesChild.emit(false);
  }
}
