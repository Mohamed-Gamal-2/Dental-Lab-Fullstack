import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DentistInterface } from '../interface/dentist-interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DentistServiceService {
  private Changer = new BehaviorSubject(0);
  constructor(private _http: HttpClient) {}

  getAllDentists() {
    const token: any = localStorage.getItem('token');
    return this._http.get('https://dentech.onrender.com/dentist/all', {
      headers: { token },
    });
  }
  getOneDentist(id: string) {
    const token: any = localStorage.getItem('token');
    return this._http.get(`https://dentech.onrender.com/dentist/${id}`, {
      headers: { token },
    });
  }
  addDentist(addDentistData: DentistInterface) {
    const token: any = localStorage.getItem('token');
    return this._http.post(
      `https://dentech.onrender.com/dentist/add`,
      addDentistData,
      {
        headers: { token },
      }
    );
  }
  updateDentist(updatedData: any, id: any) {
    const token: any = localStorage.getItem('token');
    return this._http.patch(
      `https://dentech.onrender.com/dentist/${id}`,
      updatedData,
      {
        headers: { token },
      }
    );
  }
  deleteDentist(id: string) {
    const token: any = localStorage.getItem('token');
    return this._http.delete(`https://dentech.onrender.com/dentist/${id}`, {
      headers: { token },
    });
  }

  getChanger() {
    return this.Changer.asObservable();
  }
  setChanger(number: number) {
    this.Changer.next(number);
  }
}
