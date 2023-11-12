import { Component, Input } from '@angular/core';
import { DentistServiceService } from '../service/dentist-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dentist-list',
  templateUrl: './dentist-list.component.html',
  styleUrls: ['./dentist-list.component.css'],
})
export class DentistListComponent {
  @Input() searchValue: any;
  @Input() searchBy: any;
  @Input() changer: any;
  successMsg: any;
  failMsg: any = '';
  displayedColumns: string[] = [
    'ID',
    'Name',
    'Type',
    'Phone',
    'Email',
    'Address',
    'Actions',
  ];

  dataSource: any;
  APIData: any;
  showModal: boolean = false;
  showCases: boolean = false;
  requiredDentist: any;
  getAllDentistUn: Subscription = new Subscription();
  deleteDentistUn: Subscription = new Subscription();
  previousValue: any;
  constructor(private _dentistService: DentistServiceService) {}

  handleOnDelete(id: string) {
    this.deleteDentistUn = this._dentistService.deleteDentist(id).subscribe(
      (res: any) => {
        console.log(res.status);
        console.log(res.message);
        if (res.status !== 'Fail') {
          this.successMsg = 'Client Deleted';
        } else {
          this.failMsg = res.message;
        }
        this.getAllData();
        setTimeout(() => {
          this.successMsg = '';
          this.failMsg = '';
        }, 4000);
      },
      (err) => {
        this.failMsg = err.message;
        setTimeout(() => {
          this.failMsg = '';
        }, 4000);
      }
    );
  }

  handleSearch(value: string, searchby: string) {
    if (searchby != 'all') {
      this.dataSource = this.dataSource.filter((data: any) =>
        data[searchby].toLowerCase().includes(value.toLowerCase())
      );
    } else {
      this.dataSource = this.dataSource.filter(
        (data: any) =>
          data.name.toLowerCase().includes(value.toLowerCase()) ||
          data._id.toLowerCase().includes(value.toLowerCase()) ||
          data.email.toLowerCase().includes(value.toLowerCase()) ||
          data.phone.toLowerCase().includes(value.toLowerCase()) ||
          data.address.toLowerCase().includes(value.toLowerCase())
      );
    }
  }

  getAllData() {
    this.getAllDentistUn = this._dentistService.getAllDentists().subscribe(
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
      this.getAllData();
    }
  }

  handleOnUpdate(dentist: any) {
    this.showModal = true;
    this.requiredDentist = dentist;
  }
  handleClose(event: boolean) {
    this.showModal = event;
  }
  handleCases(dentist: any) {
    this.requiredDentist = dentist;
    this.showCases = true;
  }
  handleCasesClose(event: boolean) {
    this.showCases = event;
  }

  ngOnDestroy() {
    this.getAllDentistUn.unsubscribe();
    this.deleteDentistUn.unsubscribe();
  }
}
