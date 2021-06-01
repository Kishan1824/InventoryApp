import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModelDialogComponent } from './common-model-dialog.component';

describe('CommonModelDialogComponent', () => {
  let component: CommonModelDialogComponent;
  let fixture: ComponentFixture<CommonModelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonModelDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonModelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
