import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoPraticeComponent } from './todo-pratice.component';

describe('TodoPraticeComponent', () => {
  let component: TodoPraticeComponent;
  let fixture: ComponentFixture<TodoPraticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoPraticeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoPraticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
