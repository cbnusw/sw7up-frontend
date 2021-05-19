import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QnaDetailPageComponent } from './qna-detail-page.component';

describe('QnaDetailPageComponent', () => {
  let component: QnaDetailPageComponent;
  let fixture: ComponentFixture<QnaDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QnaDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QnaDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
