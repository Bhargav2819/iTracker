import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  confirmPasswordMismatch = false;

  private apiUrl = 'http://localhost:8080/api/auth/register';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
    // You can add more headers here, such as Authorization headers
  });


  constructor(private formBuilder: FormBuilder, private router:Router, private http : HttpClient) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      mobileNumber: ['', Validators.required]
    });
    const confirmPasswordControl = this.registerForm.get('confirmPassword')!;

    confirmPasswordControl.valueChanges.subscribe((confirmPassword) => {
      const password = confirmPasswordControl.value;
      this.confirmPasswordMismatch = confirmPassword !== password;
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  register(registerForm : FormGroup): void {
    console.log(this.registerForm);
    console.log(this.registerForm.controls?.['password']?.errors?.['required']);
    console.log(this.registerForm.get('password')?.errors?.['required']);
    
    
    // Check if the form is valid and password and confirmPassword match
    if (this.registerForm.valid && !this.confirmPasswordMismatch) {
      // Get form values
      const { firstName, lastName, email, password, mobileNumber } = this.registerForm.value;
  
      this.http.post(this.apiUrl, JSON.stringify(registerForm), { headers: this.headers }).subscribe(
      (response) => {
        console.log('Registration successful:', response);
      },
      (error) => {
        console.error('Registration failed:', error);
        // Handle the error response here, e.g., show an error message
      }
    );
      // Reset the form after successful registration
      this.registerForm.reset();
    } else {
      // Mark all form controls as touched to show validation errors
      this.markAllControlsAsTouched();
    }
  }
  
  markAllControlsAsTouched(): void {
    Object.keys(this.registerForm.controls).forEach((controlName) => {
      const control = this.registerForm.get(controlName);
      control?.markAsTouched(); // Use optional chaining operator
    });
  }

  redirectToLogin(){
    this.router.navigateByUrl('/auth/login');
  }
  
}