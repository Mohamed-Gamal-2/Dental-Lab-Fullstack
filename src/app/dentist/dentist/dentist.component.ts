import { Component } from '@angular/core';
import { DentistServiceService } from '../service/dentist-service.service';

@Component({
  selector: 'app-dentist',
  templateUrl: './dentist.component.html',
  styleUrls: ['./dentist.component.css'],
})
export class DentistComponent {
  view: boolean = true;
  searchBy: string = 'all';
  searchValue: string = '';
  changer: number = 0;
  constructor(private _dentistService: DentistServiceService) {}
  viewClients() {
    this.view = true;
  }
  addClient() {
    this.view = false;
  }
  ngOnInit() {
    this._dentistService.getChanger().subscribe((data) => {
      this.changer = data;
    });
  }
}
