import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipEBookPageComponent } from './internship-e-book-page.component';

describe('InternshipEBookPageComponent', () => {
  let component: InternshipEBookPageComponent;
  let fixture: ComponentFixture<InternshipEBookPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternshipEBookPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternshipEBookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
