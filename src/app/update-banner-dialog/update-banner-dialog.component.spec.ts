import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBannerDialogComponent } from './update-banner-dialog.component';

describe('UpdateBannerDialogComponent', () => {
  let component: UpdateBannerDialogComponent;
  let fixture: ComponentFixture<UpdateBannerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBannerDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBannerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
