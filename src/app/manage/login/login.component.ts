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

  isLoading: boolean = false;
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
    this.isLoading=true
    console.log(form);
    console.log('form valid', form.valid);
    if (form.valid) {
      this.lR
        .loginAdmin(form.value.adminUsername, form.value.adminPassword)
        .subscribe({
          next: (response: any) => {
            this.isLoading=false
            console.log('Admin Login Success:', response);
            localStorage.setItem('token', response.token);
            this.failureMessage = '';
            this.successMessage = response.message;
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
            this.isLoading=false
            console.error('Admin Login Error:', error);
            this.successMessage = '';
            this.failureMessage = error.error.message;
            setTimeout(() => {
              this.failureMessage = '';
              this.successMessage = '';
            }, 2000);
            // Handle the login error
          },
        });
    } else {
      this.isLoading=false
      console.log('error logging in');
      this.successMessage = '';
      this.failureMessage = 'Invalid form';
    }
  }

  loginManager(form: any) {
    // Call the loginManager method from the service
    this.isLoading=true
    console.log(form);
    console.log('form valid', form.valid);
    if (form.valid) {
      this.lR
        .loginManager(form.value.managerUsername, form.value.managerPassword)
        .subscribe({
          next: (response: any) => {
            this.isLoading=false
            console.log('Manager Login Success:', response);
            localStorage.setItem('token', response.token);
            this.failureMessage = '';
            this.successMessage = response.message;
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
            this.isLoading=false
            console.error('Manager Login Error:', error);
            this.successMessage = '';
            this.failureMessage = error.error.message;
            setTimeout(() => {
              this.failureMessage = '';
              this.successMessage = '';
            }, 2000);
            // Handle the login error
          },
        });
    } else {
      this.isLoading=false
      console.log('error logging in');
      this.successMessage = '';
      this.failureMessage = 'Invalid form';
    }
  }
}
