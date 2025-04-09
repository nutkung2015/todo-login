import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginErrorDialogComponent } from '../login-error-dialog/login-error-dialog.component';
import { FormsModule, AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { log } from 'console';
// import Validation from './validation';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submitted = false;


  email: string = '';
  password: string = '';

  // ประกาศ case)
  private readonly VALID_EMAIL = 'Testintern@gmail.com';
  private readonly VALID_PASSWORD = 'testinternX10';

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get isFormValid(): boolean {
    return this.form.valid;
  }

  get areFieldsTouched(): boolean {
    return (this.form.get('email')?.touched ?? false) &&
      (this.form.get('password')?.touched ?? false);
  }


  ngOnInit(): void {
    // this.form = this.formBuilder.group(
    //   {
    //     email: ['', [Validators.required, Validators.email]],
    //     password: [
    //       '',
    //       [
    //         Validators.required,
    //         Validators.minLength(6),
    //         Validators.maxLength(40),
    //       ],
    //     ],
    //   },
    //   {
    //     validators: [Validation.match('password', 'confirmPassword')],
    //   }
    // );
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      let errorMessage = '';

      const emailErrors = this.form.get('email')?.errors;
      const passwordErrors = this.form.get('password')?.errors;

      if (emailErrors?.['required'] || passwordErrors?.['required']) {
        errorMessage = 'กรุณากรอกข้อมูลให้ครบถ้วน';
      } else if (emailErrors?.['email']) {
        errorMessage = 'กรุณากรอกอีเมลให้ถูกต้อง';
      } else if (passwordErrors?.['minlength']) {
        errorMessage = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
      }

      this.showErrorDialog(errorMessage);
      return;
    }

    const { email, password } = this.form.value;
    if (email === this.VALID_EMAIL && password === this.VALID_PASSWORD) {
      console.log('เข้าสู่ระบบสำเร็จ!');
    } else {
      this.showErrorDialog('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    }
  }

  checkAndSubmit() {
    const emailValue = this.form.get('email')?.value;
    const passwordValue = this.form.get('password')?.value;
    console.log('emailValue =>',emailValue)
    console.log('passwordValue =>',passwordValue)
    if (!emailValue && !passwordValue) {
      this.showErrorDialog('กรุณากรอกอีเมลและรหัสผ่าน');
      return;
    } else if (!emailValue) {
      this.showErrorDialog('กรุณากรอกอีเมล');
      return;
    } else if (!passwordValue) {
      this.showErrorDialog('กรุณากรอกรหัสผ่าน');
      return;
    }
    console.log(this.form.get('email'));
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
