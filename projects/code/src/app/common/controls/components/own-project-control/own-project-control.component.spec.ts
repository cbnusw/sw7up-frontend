import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnProjectControlComponent } from './own-project-control.component';

describe('OwnProjectControlComponent', () => {
  let component: OwnProjectControlComponent;
  let fixture: ComponentFixture<OwnProjectControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnProjectControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnProjectControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
