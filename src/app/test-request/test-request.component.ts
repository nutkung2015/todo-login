import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-test-request',

  templateUrl: './test-request.component.html',
  styleUrls: ['./test-request.component.css']
})
export class TestRequestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
