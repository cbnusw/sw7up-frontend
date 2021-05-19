import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PressDetailPageComponent } from './press-detail-page.component';

describe('PressDetailPageComponent', () => {
  let component: PressDetailPageComponent;
  let fixture: ComponentFixture<PressDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PressDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PressDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
