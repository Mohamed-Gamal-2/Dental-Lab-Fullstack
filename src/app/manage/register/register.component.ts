import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  selectedTab = 'admin';
  
  adminForm: FormGroup;
  managerForm: FormGroup;
  successMessage!: string;

  constructor(private fb: FormBuilder) {
      this.adminForm = fb.group({
        userName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required
          ]
        ],
        rePassword: ['', Validators.required]
      }, {
        validator: this.passwordMatchValidator
      });
      this.managerForm = fb.group({
        userName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required
          ]
        ],
        rePassword: ['', Validators.required]
      }, {
        validator: this.passwordMatchValidator
      });
    }

    
    passwordMatchValidator(control: AbstractControl) {
      const password = control.get('password')?.value;
      const rePassword = control.get('rePassword')?.value;
  
      if (password !== rePassword) {
        // Mark the confirmPassword control as invalid
        if (control.get('rePassword')) {
          control.get('rePassword')?.setErrors({ passwordMismatch: true });
        } else {
          // Reset the validity of the confirmPassword control
          if (control.get('rePassword')) {
            control.get('rePassword')?.setErrors(null);
          }
        }
      }
      return null;
    }
  
    submitRegisterAdmin() {
      if (this.adminForm.valid) {
        const formData = this.adminForm.value; // Get the form values
  
        // Access the email and password from the form data
        const email = formData.email;
        const password = formData.password;
  
        console.log('Email:', email);
        console.log('Password:', password);
  
        this.successMessage = 'success';
      } else {
        console.log('invalid: ', this.adminForm);
      }
    }
    submitRegisterManager() {
      if (this.managerForm.valid) {
        const formData = this.managerForm.value; // Get the form values
  
        // Access the email and password from the form data
        const email = formData.email;
        const password = formData.password;
  
        console.log('Email:', email);
        console.log('Password:', password);
  
        this.successMessage = 'success';
      } else {
        console.log('invalid: ', this.managerForm);
      }
    }





    toggleAdminManager(role:string){
    if (this.selectedTab==role){
        return
      }
    this.selectedTab=role
        if(this.selectedTab== "admin"){
            this.adminForm = this.fb.group({
          userName: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          password: [
            '',
            [
              Validators.required
            ]
          ],
          rePassword: ['', Validators.required]
        }, {
          validator: this.passwordMatchValidator
        });
        }else if (this.selectedTab== "manager"){
           this.managerForm = this.fb.group({
            userName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: [
              '',
              [
                Validators.required
              ]
            ],
            rePassword: ['', Validators.required]
          }, {
            validator: this.passwordMatchValidator
          });
        }
    }
}
