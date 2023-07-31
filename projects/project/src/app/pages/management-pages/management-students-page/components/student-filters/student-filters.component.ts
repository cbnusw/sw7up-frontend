import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilterContainerComponent } from '../../../../../common/filter/components/filter-container/filter-container.component';
import { MemberFilter } from '../../../../../common/filter/components/member-filter/member-filter.component';
import { ISelectOption } from '../../../../../types';
import { SearchStudentsQueryDto, StudentManagementService } from '../../services/student-management.service';

@Component({
  selector: 'sw-student-filters',
  templateUrl: './student-filters.component.html',
  styleUrls: ['./student-filters.component.scss'],
})
export class StudentFiltersComponent implements OnInit, OnDestroy {
  @ViewChild(FilterContainerComponent) container: FilterContainerComponent;
  params: SearchStudentsQueryDto = {
    department: null,
    professorNo: null,
    professorName: null,
    studentNo: null,
    studentName: null,
  };

  professorFilter: MemberFilter = { name: null, no: null };
  studentFilter: MemberFilter = { name: null, no: null };
  departmentOptions: ISelectOption[] = [{ viewValue: '전체', value: null }];

  private _subscription = new Subscription();

  constructor(private readonly _service: StudentManagementService) {
  }

  changeProfessorFilter(filter: MemberFilter): void {
    this.professorFilter = filter;
    const { name, no } = filter;
    this.params.professorName = name;
    this.params.professorNo = no;
  }

  changeStudentFilter(filter: MemberFilter): void {
    this.studentFilter = filter;
    const { name, no } = filter;
    this.params.studentName = name;
    this.params.studentNo = no;
  }

  initQuery(): void {
    this.params.department = null;
    this.params.professorNo = null;
    this.params.professorName = null;
    this.params.studentNo = null;
    this.params.studentName = null;
    this.search();
  }

  search(): void {
    this._service.search(this.params);
    this.container?.collapse();
  }

  ngOnInit(): void {
    this.params = { ...this.params, ...this._service.params };
    this.professorFilter.name = this.params.professorName;
    this.professorFilter.no = this.params.professorNo;
    this.studentFilter.name = this.params.studentName;
    this.studentFilter.no = this.params.studentNo;

    this.search();
    this._subscribe();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private _subscribe(): void {
    this._subscribeOptions();
  }

  private _subscribeOptions(): void {
    this._subscription.add(
      this._service.departments$.subscribe(departments => {
        this.departmentOptions = [{ viewValue: '전체', value: null }, ...departments.map(value => ({ value }))];
      })
    );
  }
}
