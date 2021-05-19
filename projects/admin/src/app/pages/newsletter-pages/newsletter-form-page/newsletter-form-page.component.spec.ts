import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterFormPageComponent } from './newsletter-form-page.component';

describe('NewsletterFormPageComponent', () => {
  let component: NewsletterFormPageComponent;
  let fixture: ComponentFixture<NewsletterFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsletterFormPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
