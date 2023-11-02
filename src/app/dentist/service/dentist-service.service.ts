import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DentistInterface } from '../interface/dentist-interface';

@Injectable({
  providedIn: 'root',
})
export class DentistServiceService {
  constructor(private _http: HttpClient) {}

  getAllDentists() {
    const token: any = localStorage.getItem('token');
    return this._http.get('http://localhost:3000/dentist/all', {
      headers: { token },
    });
  }
  getOneDentist(id: string) {
    const token: any = localStorage.getItem('token');
    return this._http.get(`http://localhost:3000/dentist/${id}`, {
      headers: { token },
    });
  }
  addDentist(addDentistData: DentistInterface) {
    const token: any = localStorage.getItem('token');
    return this._http.post(
      `http://localhost:3000/dentist/add`,
      addDentistData,
      {
        headers: { token },
      }
    );
  }
  updateDentist(updatedData: any, id: string) {
    const token: any = localStorage.getItem('token');
    return this._http.patch(
      `http://localhost:3000/dentist/${id}`,
      updatedData,
      {
        headers: { token },
      }
    );
  }
  deleteDentist(id: string) {
    const token: any = localStorage.getItem('token');
    return this._http.delete(`http://localhost:3000/dentist/${id}`, {
      headers: { token },
    });
  }
}
