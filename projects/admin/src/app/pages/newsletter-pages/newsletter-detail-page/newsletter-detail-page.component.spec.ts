import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterDetailPageComponent } from './newsletter-detail-page.component';

describe('NewsletterDetailPageComponent', () => {
  let component: NewsletterDetailPageComponent;
  let fixture: ComponentFixture<NewsletterDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsletterDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
