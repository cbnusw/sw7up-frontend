import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicturesControlComponent } from './pictures-control.component';

describe('PicturesControlComponent', () => {
  let component: PicturesControlComponent;
  let fixture: ComponentFixture<PicturesControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicturesControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PicturesControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
