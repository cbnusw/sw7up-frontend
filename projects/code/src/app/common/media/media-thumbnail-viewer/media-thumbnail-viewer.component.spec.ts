import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaThumbnailViewerComponent } from './media-thumbnail-viewer.component';

describe('MediaThumbnailViewerComponent', () => {
  let component: MediaThumbnailViewerComponent;
  let fixture: ComponentFixture<MediaThumbnailViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaThumbnailViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaThumbnailViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
