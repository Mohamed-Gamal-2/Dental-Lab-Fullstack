import { Component, Input } from '@angular/core';
import { DentistServiceService } from '../service/dentist-service.service';

@Component({
  selector: 'app-dentist-list',
  templateUrl: './dentist-list.component.html',
  styleUrls: ['./dentist-list.component.css'],
})
export class DentistListComponent {
  @Input() searchValue: any;
  @Input() searchBy: any;
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
  constructor(private _dentistService: DentistServiceService) {}

  getAllData() {
    this._dentistService.getAllDentists().subscribe(
      (res: any) => {
        console.log(res.data);
        this.APIData = res.data;
        this.dataSource = res.data;
      },
      (err) => console.error(err)
    );
  }
  ngOnInit() {
    this.getAllData();
  }
  ngOnChanges() {
    this.dataSource = this.APIData;
    if (this.dataSource) this.handleSearch(this.searchValue, this.searchBy);
  }

  handleOnDelete(id: string) {
    this._dentistService.deleteDentist(id).subscribe(
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
}
