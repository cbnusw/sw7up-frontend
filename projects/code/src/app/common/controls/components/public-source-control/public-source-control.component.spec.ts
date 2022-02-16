import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSourceControlComponent } from './public-source-control.component';

describe('PublicSourceControlComponent', () => {
  let component: PublicSourceControlComponent;
  let fixture: ComponentFixture<PublicSourceControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicSourceControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicSourceControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
