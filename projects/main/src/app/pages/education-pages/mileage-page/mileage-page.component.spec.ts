import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MileagePageComponent } from './mileage-page.component';

describe('MileagePageComponent', () => {
  let component: MileagePageComponent;
  let fixture: ComponentFixture<MileagePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MileagePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MileagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
