import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pin-page',
  templateUrl: './pin-page.component.html',
  styleUrls: ['./pin-page.component.scss']
})
export class PinPageComponent {
  pin: string = '';
  error: boolean = false;
  readonly correctPin = '2811'; // สามารถเปลี่ยนได้ภายหลัง

  onKey(num: string) {
    if (this.pin.length < 4) {
      this.pin += num;
      if (this.pin.length === 4) {
        this.checkPin();
      }
    }
  }

  onDelete() {
    this.pin = this.pin.slice(0, -1);
    this.error = false;
  }

  checkPin() {
    if (this.pin === this.correctPin) {
      // ไปหน้า home
      window.location.href = '/home';
    } else {
      this.error = true;
      setTimeout(() => {
        this.pin = '';
        this.error = false;
      }, 1000);
    }
  }
} 