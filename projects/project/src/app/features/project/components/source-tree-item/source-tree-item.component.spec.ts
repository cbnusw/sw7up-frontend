import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceTreeItemComponent } from './source-tree-item.component';

describe('SourceTreeItemComponent', () => {
  let component: SourceTreeItemComponent;
  let fixture: ComponentFixture<SourceTreeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceTreeItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceTreeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
