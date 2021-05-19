import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveListPageComponent } from './archive-list-page.component';

describe('ArchiveListPageComponent', () => {
  let component: ArchiveListPageComponent;
  let fixture: ComponentFixture<ArchiveListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
