import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeListPageComponent } from './notice-list-page.component';

describe('NoticePageComponent', () => {
  let component: NoticeListPageComponent;
  let fixture: ComponentFixture<NoticeListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticeListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
