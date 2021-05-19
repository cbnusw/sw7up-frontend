import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QnaListPageComponent } from './qna-list-page.component';

describe('QnaListPageComponent', () => {
  let component: QnaListPageComponent;
  let fixture: ComponentFixture<QnaListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QnaListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QnaListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
