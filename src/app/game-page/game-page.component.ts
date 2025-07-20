import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // <--- เพิ่มบรรทัดนี้

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent {
  // รูปภาพจาก assets 6 คู่ (12 ใบ)
  images = [
    'assets/image/img01.jpg',
    'assets/image/img02.jpg',
    'assets/image/img03.jpg',
    'assets/image/img04.jpg',
    'assets/image/img01.jpg',
    'assets/image/img02.jpg',
    'assets/image/img03.jpg',
    'assets/image/img04.jpg',
  ];
  cards: { img: string, revealed: boolean, matched: boolean }[] = [];
  firstCardIdx: number | null = null;
  lock: boolean = false;
  matchedCount: number = 0;

  constructor() {
    this.resetGame();
  }

  resetGame() {
    // สร้างการ์ดจากรูปภาพและสลับตำแหน่ง
    this.cards = this.images
      .map(img => ({ img, revealed: false, matched: false }))
      .sort(() => Math.random() - 0.5);
    this.firstCardIdx = null;
    this.lock = false;
    this.matchedCount = 0;
  }

  onCardClick(idx: number) {
    if (this.lock || this.cards[idx].revealed || this.cards[idx].matched) return;
    this.cards[idx].revealed = true;
    if (this.firstCardIdx === null) {
      this.firstCardIdx = idx;
    } else {
      this.lock = true;
      setTimeout(() => {
        if (this.cards[idx].img === this.cards[this.firstCardIdx!].img) {
          this.cards[idx].matched = true;
          this.cards[this.firstCardIdx!].matched = true;
          this.matchedCount++;
        } else {
          this.cards[idx].revealed = false;
          this.cards[this.firstCardIdx!].revealed = false;
        }
        this.firstCardIdx = null;
        this.lock = false;
      }, 800);
    }
  }

  isWin() {
    return this.cards.every(card => card.matched);
  }
} 