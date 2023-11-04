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
  displayedColumns: string[] = [
    'ID',
    'Name',
    'Type',
    'Phone',
    'Email',
    'Address',
    'Modifying',
  ];

  dataSource: any;
  APIData: any;
  showModal: boolean = false;
  requiredDentist: any;
  getAllDentistUn: Subscription = new Subscription();
  deleteDentistUn: Subscription = new Subscription();
  previousValue: any;
  constructor(private _dentistService: DentistServiceService) {}

  handleOnDelete(id: string) {
    this.deleteDentistUn = this._dentistService.deleteDentist(id).subscribe(
      (res) => {
        this.getAllData();
      },
      (err) => console.log(err)
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
    if (this.searchValue != this.previousValue && this.dataSource) {
      this.dataSource = this.APIData;
      this.handleSearch(this.searchValue, this.searchBy);
      this.searchValue = this.previousValue;
    } else this.getAllData();
  }

  handleOnUpdate(dentist: any) {
    this.showModal = true;
    this.requiredDentist = dentist;
  }
  handleClose(event: boolean) {
    this.showModal = event;
  }

  ngOnDestroy() {
    this.getAllDentistUn.unsubscribe();
    this.deleteDentistUn.unsubscribe();
  }
}
