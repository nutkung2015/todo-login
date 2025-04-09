import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnPageComponent } from './column-page.component';

describe('ColumnPageComponent', () => {
  let component: ColumnPageComponent;
  let fixture: ComponentFixture<ColumnPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
