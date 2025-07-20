import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginErrorDialogComponent } from '../login-error-dialog/login-error-dialog.component';
import { FormsModule, AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private apiUrl = 'http://192.168.1.134:8000/loginUser';

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submitted = false;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get isFormValid(): boolean {
    return this.form.valid;
  }

  get areFieldsTouched(): boolean {
    return (this.form.get('username')?.touched ?? false) &&
      (this.form.get('password')?.touched ?? false);
  }

  ngOnInit(): void {
    // Check if user is already logged in
    // if (this.authService.isAuthenticated()) {
    //   this.router.navigate(['/banners']);
    // }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      let errorMessage = '';
      const usernameErrors = this.form.get('username')?.errors;
      const passwordErrors = this.form.get('password')?.errors;

      if (usernameErrors?.['required'] || passwordErrors?.['required']) {
        errorMessage = 'กรุณากรอกข้อมูลให้ครบถ้วน';
      } else if (usernameErrors?.['username']) {
        errorMessage = 'กรุณากรอกusernameให้ถูกต้อง';
      } else if (passwordErrors?.['minlength']) {
        errorMessage = 'รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร';
      }

      this.showErrorDialog(errorMessage);
      return;
    }

    const { username, password } = this.form.value;
    this.http.post(`${this.apiUrl}`, { username, password }).subscribe({
      next: (response: any) => {
        console.log('Login response:', response);

        if (response.meta.response_desc === 'success') {  // แก้ไขการเข้าถึง response_desc
          console.log('Login successful');

          const token = response.meta.response_data.token;
          console.log('Token:', token);
          // this.authService.setToken(token);
          // ปิดไว้ก่อนเพราะยังไม่มี token
          this.router.navigate(['/banners'], { skipLocationChange: false })
            .then(() => console.log('Navigation successful'))
            .catch(err => console.error('Navigation failed:', err));
        } else {
          console.log('Login failed');
          this.showErrorDialog('ไม่พบข้อมูลผู้ใช้งาน หรือรหัสผ่านไม่ถูกต้อง');
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.showErrorDialog('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
      }
    });
  }

  checkAndSubmit() {
    const usernameValue = this.form.get('username')?.value;
    const passwordValue = this.form.get('password')?.value;

    if (!usernameValue && !passwordValue) {
      this.showErrorDialog('กรุณากรอก username และรหัสผ่าน');
      return;
    } else if (!usernameValue) {
      this.showErrorDialog('กรุณากรอก username');
      return;
    } else if (!passwordValue) {
      this.showErrorDialog('กรุณากรอกรหัสผ่าน');
      return;
    }

    this.onSubmit();
  }

  private showErrorDialog(message: string): void {
    this.dialog.open(LoginErrorDialogComponent, {
      width: '300px',
      disableClose: false,
      data: { message }
    });
  }
}