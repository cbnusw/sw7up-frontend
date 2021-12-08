import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProjectPageComponent } from './public-project-page.component';

describe('PublicProjectPageComponent', () => {
  let component: PublicProjectPageComponent;
  let fixture: ComponentFixture<PublicProjectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicProjectPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicProjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
