import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // <--- เพิ่มบรรทัดนี้


@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.scss']
})
export class GalleryPageComponent {
  images = [
    'assets/image/img21.jpg',
    'assets/image/img22.jpg',
    'assets/image/img23.jpg',
    'assets/image/img24.jpg',
    'assets/image/img25.jpg',
    'assets/image/img27.jpg',
    'assets/image/img28.jpg',
    'assets/image/img29.jpg',
    'assets/image/img30.jpg',
  ];
} 