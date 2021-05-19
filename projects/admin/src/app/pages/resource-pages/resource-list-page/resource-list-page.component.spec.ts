import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceListPageComponent } from './resource-list-page.component';

describe('ResourceListPageComponent', () => {
  let component: ResourceListPageComponent;
  let fixture: ComponentFixture<ResourceListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
