import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityPageComponent } from './facility-page.component';

describe('FacilityPageComponent', () => {
  let component: FacilityPageComponent;
  let fixture: ComponentFixture<FacilityPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilityPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
