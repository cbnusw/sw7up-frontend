import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceTreeComponent } from './source-tree.component';

describe('SourceTreeComponent', () => {
  let component: SourceTreeComponent;
  let fixture: ComponentFixture<SourceTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
