import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PressReleaseFormPageComponent } from './press-release-form-page.component';

describe('PressReleaseFormPageComponent', () => {
  let component: PressReleaseFormPageComponent;
  let fixture: ComponentFixture<PressReleaseFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PressReleaseFormPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PressReleaseFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
