import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandableMenuItemComponent } from './expandable-menu-item.component';

describe('ExpandableMenuItemComponent', () => {
  let component: ExpandableMenuItemComponent;
  let fixture: ComponentFixture<ExpandableMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandableMenuItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandableMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
