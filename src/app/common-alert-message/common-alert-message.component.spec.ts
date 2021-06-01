import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonAlertMessageComponent } from './common-alert-message.component';

describe('CommonAlertMessageComponent', () => {
  let component: CommonAlertMessageComponent;
  let fixture: ComponentFixture<CommonAlertMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonAlertMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonAlertMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
