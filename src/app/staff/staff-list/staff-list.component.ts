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
  APIData: any;
  showModal: boolean = false;
  requiredStaff: any;
  getAllStaffUn: Subscription = new Subscription();
  deleteStaffUn: Subscription = new Subscription();
  previousValue: any;
  constructor(private _StaffService: StaffServiceService) {}

  ngOnInit() {
    this.loadStaffData();
  }

  loadStaffData() {
    this._StaffService.getAllStaff().subscribe(
      (res: any) => {
        console.log(res.data);
        this.dataSource = res.data;
        this.APIData = res.data;
      },
      (err) => console.error(err)
    );
  }
  handleSearch(value: string, searchby: string) {
    if (searchby != 'all') {
      this.dataSource = this.dataSource.filter((data: any) =>
        data[searchby].toLowerCase().includes(value.toLowerCase())
      );
    } else {
      this.dataSource = this.dataSource.filter((data: any) => {
        const loweredValue = value.toLowerCase();
        return (
          data.ssn.toString().includes(loweredValue) ||
          data.name.toLowerCase().includes(loweredValue) ||
          data.email.toLowerCase().includes(loweredValue) ||
          data.phone.toString().includes(loweredValue) ||
          data.gender.toLowerCase().includes(loweredValue) ||
          data.jobTitle.toLowerCase().includes(loweredValue)
        );
      });
    }
  }
  handleDelete(id: string) {
    this._StaffService.deleteStaff(id).subscribe((res) => {
      console.log(res);
      this.loadStaffData();
    });
  }
  ngOnChanges() {
    if (this.searchValue != this.previousValue && this.dataSource) {
      this.dataSource = this.APIData;
      this.handleSearch(this.searchValue, this.searchBy);
      this.searchValue = this.previousValue;
    } else this.loadStaffData();
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
