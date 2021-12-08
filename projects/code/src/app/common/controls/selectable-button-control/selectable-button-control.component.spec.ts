import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectableButtonControlComponent } from './selectable-button-control.component';

describe('SelectableButtonControlComponent', () => {
  let component: SelectableButtonControlComponent;
  let fixture: ComponentFixture<SelectableButtonControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectableButtonControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectableButtonControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
