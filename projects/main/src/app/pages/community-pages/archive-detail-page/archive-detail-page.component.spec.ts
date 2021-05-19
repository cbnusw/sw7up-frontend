import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveDetailPageComponent } from './archive-detail-page.component';

describe('ArchiveDetailPageComponent', () => {
  let component: ArchiveDetailPageComponent;
  let fixture: ComponentFixture<ArchiveDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
