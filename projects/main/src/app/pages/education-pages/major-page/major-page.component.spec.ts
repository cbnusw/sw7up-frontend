import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorPageComponent } from './major-page.component';

describe('MajorPageComponent', () => {
  let component: MajorPageComponent;
  let fixture: ComponentFixture<MajorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MajorPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MajorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
