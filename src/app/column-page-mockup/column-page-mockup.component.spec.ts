import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnPageMockupComponent } from './column-page-mockup.component';

describe('ColumnPageMockupComponent', () => {
  let component: ColumnPageMockupComponent;
  let fixture: ComponentFixture<ColumnPageMockupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnPageMockupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnPageMockupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
