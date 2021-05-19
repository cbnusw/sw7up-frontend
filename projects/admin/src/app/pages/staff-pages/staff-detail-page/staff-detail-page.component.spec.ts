import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffDetailPageComponent } from './staff-detail-page.component';

describe('StaffDetailPageComponent', () => {
  let component: StaffDetailPageComponent;
  let fixture: ComponentFixture<StaffDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
