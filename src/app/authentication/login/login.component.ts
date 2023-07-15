import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  emailInvalid: boolean = true;
  passwordInvalid: boolean = true;
  showPassword: boolean = false;

  login() {
    // Reset error flags
    this.emailInvalid = false;
    this.passwordInvalid = false;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.emailInvalid = true;
      return;
    }

    // Validate password length
    if (this.password.length < 8) {
      this.passwordInvalid = true;
      return;
    }

    // Perform login logic
    // ...
  }
  

  submit(){

  }
  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
}
