import { StaffInterface } from './../interface/staff-interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaffServiceService {
  constructor(private _HttpClient: HttpClient) {}
  getAllStaff() {
    const token: any = localStorage.getItem('token');
    return this._HttpClient.get(
      `http://localhost:3000/staff/all?page=1&limit=5`,
      {
        headers: { token },
      }
    );
  }
  getOneStaff(id: string) {
    const token: any = localStorage.getItem('token');
    return this._HttpClient.get(`http://localhost:3000/staff/${id}`, {
      headers: { token },
    });
  }
  addStaff(staffData: StaffInterface) {
    const token: any = localStorage.getItem('token');
    return this._HttpClient.post(`http://127.0.0.1:3000/staff/add`, staffData, {
      headers: { token },
    });
  }
  updateStaff(updateData: any, id: string) {
    const token: any = localStorage.getItem('token');
    return this._HttpClient.patch(
      `http://localhost:3000/staff/${id}`,
      updateData,
      {
        headers: { token },
      }
    );
  }
  deleteStaff(id: string) {
    const token: any = localStorage.getItem('token');
    return this._HttpClient.delete(`http://localhost:3000/staff/${id}`, {
      headers: { token },
    });
  }
}
