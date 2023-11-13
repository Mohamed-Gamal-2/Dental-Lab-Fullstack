import { Component, Input } from '@angular/core';
import { StaffServiceService } from '../service/staff-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css'],
})
export class StaffListComponent {
  @Input() searchValue: any;
  @Input() searchBy: any;
  @Input() changer: any;
  successMsg: any;
  failMsg: any = '';
  displayedColumns: string[] = [
    'ssn',
    'name',
    'jobTitle',
    'salary',
    'phone',
    'age',
    'email',
    'gender',
    'Modifying',
  ];
  dataSource: any;
  APIData: any;
  showModal: boolean = false;
  requiredStaff: any;
  getAllStaffUn: Subscription = new Subscription();
  deleteStaffUn: Subscription = new Subscription();
  previousValue: any;
  constructor(private _StaffService: StaffServiceService) {}

  handleDelete(id: string) {
    this._StaffService.deleteStaff(id).subscribe(
      (res: any) => {
        console.log(res);
        this.successMsg = 'Staff Deleted';

        this.loadStaffData();
        setTimeout(() => {
          this.successMsg = '';
          this.failMsg = '';
        }, 4000);
      },
      (err) => {
        this.failMsg = err.error.message + ' Admin only can delete staff';
        setTimeout(() => {
          this.failMsg = '';
        }, 4000);
      }
    );
  }

  handleSearch(value: string, searchby: string) {
    if (searchby != 'all') {
      this.dataSource = this.dataSource.filter(
        (data: any) =>
          (typeof data[searchby] === 'string' &&
            data[searchby].toLowerCase().includes(value.toLowerCase())) ||
          (typeof data[searchby] === 'number' &&
            data[searchby].toString().includes(value))
      );
    } else {
      this.dataSource = this.dataSource.filter((data: any) => {
        const loweredValue = value.toLowerCase();
        const ssnAsNumber = Number(data.ssn);

        return (
          (!isNaN(ssnAsNumber) && ssnAsNumber === Number(value)) ||
          data.name.toLowerCase().includes(loweredValue) ||
          data.email.toLowerCase().includes(loweredValue) ||
          data.phone.toString().includes(loweredValue) ||
          data.salary.toString().includes(loweredValue) ||
          data.age.toString().includes(loweredValue) ||
          data.gender.toLowerCase().includes(loweredValue) ||
          data.jobTitle.toLowerCase().includes(loweredValue)
        );
      });
    }
  }

  loadStaffData() {
    this._StaffService.getAllStaff().subscribe(
      (res: any) => {
        this.dataSource = res.data;
        this.APIData = res.data;
      },
      (err) => console.error(err)
    );
  }
  ngOnChanges() {
    if (
      this.searchValue != this.previousValue &&
      this.dataSource &&
      this.previousValue != undefined
    ) {
      this.dataSource = this.APIData;
      this.handleSearch(this.searchValue, this.searchBy);
      this.previousValue = this.searchValue;
    } else {
      this.previousValue = this.searchValue;
      this.loadStaffData();
    }
  }
  handleOnUpdate(staff: any) {
    this.showModal = true;
    this.requiredStaff = staff;
  }
  handleClose(event: boolean) {
    this.showModal = event;
  }

  ngOnDestroy() {
    this.getAllStaffUn.unsubscribe();
    this.deleteStaffUn.unsubscribe();
  }
}
