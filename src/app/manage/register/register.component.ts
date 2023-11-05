import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { LoginRegisterAPIService } from '../login-register-api.service';

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
  failureMessage!: string;

  constructor(private fb: FormBuilder, private lR: LoginRegisterAPIService) {
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
// end of constructor
    
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
  




resetForms(){
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





    toggleAdminManager(role:string){
    if (this.selectedTab==role){
        return
      }
    this.selectedTab=role
      this.resetForms()
    }

    submitRegisterAdmin(){
      if (this.adminForm.valid) {
        console.log(this.adminForm)
        const formData = this.adminForm.value;
        const userName = formData.userName;
        const email = formData.email;
        const password = formData.password;
  
        // Updated to use .subscribe with next and error callbacks
        this.lR.registerAdmin(userName, password, email)
          .subscribe({
            next: (response) => {
              console.log('Registration success:', response);
              this.successMessage = 'Registration successful';
              this.failureMessage = ''
              this.resetForms()
              setTimeout(() => {
                this.failureMessage=''
                this.successMessage=''
              }, 2000);
            },
            error: (error) => {
              console.error('Registration error:', error);
              this.successMessage = ''
              this.failureMessage = 'Registration error'
              setTimeout(() => {
                this.failureMessage=''
                this.successMessage=''
              }, 2000);
            }
          });
      } else {
        console.log('Invalid: Admin Form');
        this.successMessage = ''
        this.failureMessage = 'Invalid: Admin Form'
        setTimeout(() => {
          this.failureMessage=''
          this.successMessage=''
        }, 2000);
      }
    }



    submitRegisterManager(){
      if (this.managerForm.valid) {
        const formData = this.managerForm.value;
        const userName = formData.userName;
        const email = formData.email;
        const password = formData.password;
  
        // Updated to use .subscribe with next and error callbacks
        this.lR.registerManager(userName, password, email)
          .subscribe({
            next: (response) => {
              console.log('Registration success:', response);
              this.successMessage = 'Registration successful';
              this.failureMessage = ''
              this.resetForms()
              setTimeout(() => {
                this.failureMessage=''
                this.successMessage=''
              }, 2000);
            },
            error: (error) => {
              console.error('Registration error:', error);
              this.successMessage = ''
              this.failureMessage = 'Registration error'
              setTimeout(() => {
                this.failureMessage=''
                this.successMessage=''
              }, 2000);
            }
          });
      } else {
        console.log('Invalid: Manager Form');
        this.failureMessage = 'Invalid: Manager Form'
        setTimeout(() => {
          this.failureMessage=''
          this.successMessage=''
        }, 2000);
      }

    }


}
