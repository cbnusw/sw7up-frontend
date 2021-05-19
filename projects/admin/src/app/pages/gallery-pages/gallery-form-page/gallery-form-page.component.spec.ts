import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryFormPageComponent } from './gallery-form-page.component';

describe('GalleryFormPageComponent', () => {
  let component: GalleryFormPageComponent;
  let fixture: ComponentFixture<GalleryFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryFormPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
