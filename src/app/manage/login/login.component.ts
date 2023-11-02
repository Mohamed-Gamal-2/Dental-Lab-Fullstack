import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  selectedTab = 'admin'; // Default tab is 'manager'

  changeLoginToManager(){
      this.selectedTab="manager"
    }
    changeLoginToAdmin(){
      this.selectedTab="admin"
    }

  handleFormSubmit(form:any){
console.log(form)

  }

}
