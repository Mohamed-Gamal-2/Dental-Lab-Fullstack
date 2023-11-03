import { Component } from '@angular/core';

@Component({
  selector: 'app-dentist',
  templateUrl: './dentist.component.html',
  styleUrls: ['./dentist.component.css'],
})
export class DentistComponent {
  view: boolean = true;
  searchBy: string = 'all';
  searchValue: string = '';
  viewClients() {
    this.view = true;
  }
  addClient() {
    this.view = false;
  }
}
