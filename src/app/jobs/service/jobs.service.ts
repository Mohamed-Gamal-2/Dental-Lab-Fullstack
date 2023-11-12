import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  constructor(private _http: HttpClient) {}

  getAllJobs() {
    const token: any = localStorage.getItem('token');
    return this._http.get('https://dentech.onrender.com/jobs/all', {
      headers: { token },
    });
  }

  addJob(addJobData: any) {
    const token: any = localStorage.getItem('token');
    return this._http.post(`https://dentech.onrender.com/job/add`, addJobData, {
      headers: { token },
    });
  }

  deleteJob(id: string) {
    const token: any = localStorage.getItem('token');
    return this._http.delete(`https://dentech.onrender.com/job/${id}`, {
      headers: { token },
    });
  }

  updateJob(updatedData: any, id: any) {
    const token: any = localStorage.getItem('token');
    return this._http.patch(
      `https://dentech.onrender.com/job/${id}`,
      updatedData,
      {
        headers: { token },
      }
    );
  }
}
