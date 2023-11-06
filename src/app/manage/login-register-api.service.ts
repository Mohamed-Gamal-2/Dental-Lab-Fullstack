import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterAPIService {
  private loginManagerApi: string = 'https://dentech.onrender.com/manager/signin';
  private registerManagerApi: string = 'https://dentech.onrender.com/manager/add';
  private loginAdminApi: string = 'https://dentech.onrender.com/admin/signin';
  private registerAdminApi: string = 'https://dentech.onrender.com/admin/add';


  constructor(private http: HttpClient) { }

  loginManager(userName: string, password: string) {
    const requestBody = { userName, password };
    return this.http.post(this.loginManagerApi, requestBody);
  }

  registerManager(userName: string, password: string, email: string) {
    const options = {
      headers: {
        'token': `${localStorage.getItem('token')}`
      }
    }
    const requestBody = { userName, password, email };
    return this.http.post(this.registerManagerApi, requestBody,options);
  }

  loginAdmin(userName: string, password: string) {
    const requestBody = { userName, password };
    return this.http.post(this.loginAdminApi, requestBody);
  }

  registerAdmin(userName: string, password: string, email: string) {
    const options = {
      headers: {
        'token': `${localStorage.getItem('token')}`
      }
    }
    const requestBody = { userName, password, email };
    return this.http.post(this.registerAdminApi, requestBody,options);
  }

}
