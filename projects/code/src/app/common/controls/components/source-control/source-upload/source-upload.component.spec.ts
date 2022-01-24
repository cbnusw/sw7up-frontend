import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceUploadComponent } from './source-upload.component';

describe('SourceUploadComponent', () => {
  let component: SourceUploadComponent;
  let fixture: ComponentFixture<SourceUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
