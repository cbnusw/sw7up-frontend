import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeViewerModalComponent } from './code-viewer-modal.component';

describe('CodeViewerModalComponent', () => {
  let component: CodeViewerModalComponent;
  let fixture: ComponentFixture<CodeViewerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeViewerModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeViewerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
