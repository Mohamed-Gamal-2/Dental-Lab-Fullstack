import { Component } from '@angular/core';
import { StaffServiceService } from '../service/staff-service.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
})
export class StaffComponent {
  view: boolean = true;
  searchBy: string = 'all';
  searchValue: string = '';
  changer: number = 0;
  constructor(private _StaffService: StaffServiceService) {}

  viewClients() {
    this.view = true;
  }
  addClient() {
    this.view = false;
  }
  ngOnInit() {
    this._StaffService.getChanger().subscribe((data) => {
      this.changer = data;
    });
  }
}
