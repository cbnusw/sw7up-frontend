import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OssPageComponent } from './oss-page.component';

describe('OssPageComponent', () => {
  let component: OssPageComponent;
  let fixture: ComponentFixture<OssPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OssPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OssPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
