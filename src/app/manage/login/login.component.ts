import { Component } from '@angular/core';
import { LoginRegisterAPIService } from '../login-register-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  selectedTab = 'admin'; // Default tab is 'manager'

  successMessage: string = '';
  failureMessage: string = '';

  constructor(private lR: LoginRegisterAPIService, private router: Router) {}
  changeLoginToManager() {
    this.selectedTab = 'manager';
  }
  changeLoginToAdmin() {
    this.selectedTab = 'admin';
  }

  handleFormSubmit(form: any) {
    console.log(form);
  }

  loginAdmin(form: any) {
    // Call the loginAdmin method from the service
    console.log(form);
    console.log('form valid', form.valid);
    if (form.valid) {
      this.lR
        .loginAdmin(form.value.adminUsername, form.value.adminPassword)
        .subscribe({
          next: (response: any) => {
            console.log('Admin Login Success:', response);
            localStorage.setItem('token', response.token);
            this.failureMessage = '';
            this.successMessage = 'Admin logged in successfully';
            localStorage.removeItem('isManager');
            setTimeout(() => {
              this.failureMessage = '';
              this.successMessage = '';
              this.router.navigate(['']);
              location.reload();
            }, 2000);
            // Handle the successful login response
          },
          error: (error) => {
            console.error('Admin Login Error:', error);
            this.successMessage = '';
            this.failureMessage = 'Admin Login Error';
            setTimeout(() => {
              this.failureMessage = '';
              this.successMessage = '';
            }, 2000);
            // Handle the login error
          },
        });
    } else {
      console.log('error logging in');
      this.successMessage = '';
      this.failureMessage = 'Invalid form';
    }
  }

  loginManager(form: any) {
    // Call the loginManager method from the service
    console.log(form);
    console.log('form valid', form.valid);
    if (form.valid) {
      this.lR
        .loginManager(form.value.managerUsername, form.value.managerPassword)
        .subscribe({
          next: (response: any) => {
            console.log('Manager Login Success:', response);
            localStorage.setItem('token', response.token);
            this.failureMessage = '';
            this.successMessage = 'Manager logged in successfully';
            localStorage.setItem('isManager', 'true');
            setTimeout(() => {
              this.failureMessage = '';
              this.successMessage = '';
              this.router.navigate(['']);
              location.reload();
            }, 2000);
            // Handle the successful login response
          },
          error: (error) => {
            console.error('Manager Login Error:', error);
            this.successMessage = '';
            this.failureMessage = 'Manager Login Error';
            setTimeout(() => {
              this.failureMessage = '';
              this.successMessage = '';
            }, 2000);
            // Handle the login error
          },
        });
    } else {
      console.log('error logging in');
      this.successMessage = '';
      this.failureMessage = 'Invalid form';
    }
  }
}
