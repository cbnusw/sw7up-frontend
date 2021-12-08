import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProjectListPageComponent } from './my-project-list-page.component';

describe('MyProjectListPageComponent', () => {
  let component: MyProjectListPageComponent;
  let fixture: ComponentFixture<MyProjectListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyProjectListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProjectListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
