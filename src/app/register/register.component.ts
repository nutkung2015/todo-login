import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  private apiUrl = 'http://192.168.1.134:8000/registerUser'; // แก้ URL

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { 'passwordMismatch': true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const userData = {
        username: this.registerForm.value.username,
        password: this.registerForm.value.password
      };

      console.log(this.registerForm)

      this.http.post(this.apiUrl, userData).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          // this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed', error);
          // Handle error (show error message to user)
        }
      });
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}