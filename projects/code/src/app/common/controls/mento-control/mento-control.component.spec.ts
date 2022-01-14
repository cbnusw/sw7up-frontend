import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentoControlComponent } from './mento-control.component';

describe('MentoControlComponent', () => {
  let component: MentoControlComponent;
  let fixture: ComponentFixture<MentoControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentoControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentoControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
