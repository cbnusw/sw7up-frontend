import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProjectFormPageComponent } from './public-project-form-page.component';

describe('PublicProjectFormPageComponent', () => {
  let component: PublicProjectFormPageComponent;
  let fixture: ComponentFixture<PublicProjectFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicProjectFormPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicProjectFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
