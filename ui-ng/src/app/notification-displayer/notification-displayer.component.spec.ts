import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDisplayerComponent } from './notification-displayer.component';

describe('NotificationDisplayerComponent', () => {
  let component: NotificationDisplayerComponent;
  let fixture: ComponentFixture<NotificationDisplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationDisplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
