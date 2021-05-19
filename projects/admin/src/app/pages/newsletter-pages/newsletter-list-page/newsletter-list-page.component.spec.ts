import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterListPageComponent } from './newsletter-list-page.component';

describe('NewsletterListPageComponent', () => {
  let component: NewsletterListPageComponent;
  let fixture: ComponentFixture<NewsletterListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsletterListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
