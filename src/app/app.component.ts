import { Component, OnInit } from '@angular/core';
import { TestRequestRestService } from './test-request-rest.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private apiService: TestRequestRestService) { }

  email: string = '';
  password: string = '';

  title = 'todo-login';

  ngOnInit(): void {
    this.testAPI();
    this.testAPI_2();
  }

  onSubmit() {
    if (this.email && this.password.length >= 6) {
      console.log('Form Submitted!', { email: this.email, password: this.password });
    }
  }

  testAPI() {
    this.apiService.loginUser().subscribe({
      next: (response) => {
        console.log('✅ API Success:', response);
      },
      error: (error) => {
        console.error('❌ API Error:', error);
      }
    });
  }

  testAPI_2() {
    this.apiService.GetItems().subscribe({
      next: (response) => {
        console.log('✅ API Success:', response);
      },
      error: (error) => {
        console.error('❌ API Error:', error);
      }
    });
  }

}
