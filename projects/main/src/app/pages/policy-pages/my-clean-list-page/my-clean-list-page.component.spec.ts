import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCleanListPageComponent } from './my-clean-list-page.component';

describe('MyCleanListPageComponent', () => {
  let component: MyCleanListPageComponent;
  let fixture: ComponentFixture<MyCleanListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCleanListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCleanListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
