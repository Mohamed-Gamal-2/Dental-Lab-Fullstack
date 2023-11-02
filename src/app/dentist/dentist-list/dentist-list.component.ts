import { Component, ChangeDetectorRef } from '@angular/core';
import { DentistServiceService } from '../service/dentist-service.service';

@Component({
  selector: 'app-dentist-list',
  templateUrl: './dentist-list.component.html',
  styleUrls: ['./dentist-list.component.css'],
})
export class DentistListComponent {
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
  constructor(
    private _dentistService: DentistServiceService,
    private cdRef: ChangeDetectorRef
  ) {}

  getAllData() {
    this._dentistService.getAllDentists().subscribe(
      (res: any) => {
        console.log(res.data);
        this.dataSource = res.data;
      },
      (err) => console.error(err)
    );
  }
  ngOnInit() {
    this.getAllData();
  }
  handleOnDelete(id: string) {
    this._dentistService.deleteDentist(id).subscribe(
      (res) => {
        this.getAllData();
      },
      (err) => console.log(err)
    );
  }
}
