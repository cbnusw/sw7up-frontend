import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OssControlComponent } from './oss-control.component';

describe('OssControlComponent', () => {
  let component: OssControlComponent;
  let fixture: ComponentFixture<OssControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OssControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OssControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
