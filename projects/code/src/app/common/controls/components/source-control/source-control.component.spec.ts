import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceControlComponent } from './source-control.component';

describe('SourceControlComponent', () => {
  let component: SourceControlComponent;
  let fixture: ComponentFixture<SourceControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
