import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PressReleaseListPageComponent } from './press-release-list-page.component';

describe('PressReleaseListPageComponent', () => {
  let component: PressReleaseListPageComponent;
  let fixture: ComponentFixture<PressReleaseListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PressReleaseListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PressReleaseListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
