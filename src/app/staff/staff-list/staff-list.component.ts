import { Component } from '@angular/core';
import { StaffServiceService } from '../service/staff-service.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css'],
})
export class StaffListComponent {
  displayedColumns: string[] = [
    'ssn',
    'name',
    'jobTitle',
    'salary',
    'phone',
    'email',
    'gender',
    'Modifying',
  ];
  dataSource: any;
  constructor(private _StaffService: StaffServiceService) {}

  ngOnInit() {
    this.loadStaffData();
  }

  loadStaffData() {
    this._StaffService.getAllStaff().subscribe(
      (res: any) => {
        console.log(res.data);
        this.dataSource = res.data;
      },
      (err) => console.error(err)
    );
  }

  handleDelete(id: string) {
    this._StaffService.deleteStaff(id).subscribe((res) => {
      console.log(res);
      this.loadStaffData();
    });
  }
}
