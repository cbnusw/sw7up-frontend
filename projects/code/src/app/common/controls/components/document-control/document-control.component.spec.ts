import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentControlComponent } from './document-control.component';

describe('DocumentControlComponent', () => {
  let component: DocumentControlComponent;
  let fixture: ComponentFixture<DocumentControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
