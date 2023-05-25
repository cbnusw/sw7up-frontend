import { Component, OnInit } from '@angular/core';
import { filter, take } from 'rxjs/operators';
import { MAJORS } from 'shared';
import { ISelectOption, OWN_PROJECT_TYPES, PROJECT_TYPES, SEMESTERS, TOwnProjectType, TProjectType } from '../../../../../types';
import { ProjectManagementQuery, ProjectManagementService } from '../../services/project-management.service';

@Component({
  selector: 'sw-project-filter',
  templateUrl: './project-filter.component.html',
  styleUrls: ['./project-filter.component.scss']
})
export class ProjectFilterComponent implements OnInit {
  collapsed = false;

  createdStart: Date | string | null = null;
  createdEnd: Date | string | null = null;
  grade: number | null = null;
  performedYearStart: number | null = null;
  performedSemesterStart: number | null = null;
  performedYearEnd: number | null = null;
  performedSemesterEnd: number | null = null;
  creatorName: string | null = null;
  creatorNo: string | null = null;
  school: '충북대학교' | '기타' | null = null;
  departments: string[] = [...MAJORS, '기타'];
  subjectName: string | null = null;
  ownProjectType: TOwnProjectType | null = null;
  professor: string | null = null;

  createdOption: '기간설정' | null = null;
  createdOptions: ISelectOption[] = [{ viewValue: '전체', value: null }, { value: '기간설정' }];

  gradeOptions: ISelectOption[] = [{ viewValue: '전체', value: null }, ...[1, 2, 3, 4, 5, 6].map(grade => ({
    viewValue: `${grade} 학년`,
    value: grade
  }))];

  semesterOptions: ISelectOption[] = SEMESTERS.map((semester, i) => ({ value: i, viewValue: semester }));
  creatorOption = '이름';
  creatorOptions: ISelectOption[] = [
    { value: '이름' },
    { value: '학번' }
  ];

  schoolOptions: ISelectOption[] = [
    { value: null, viewValue: '전체' },
    { value: '충북대학교' },
    { value: '기타' },
  ];

  departmentOptions: ISelectOption[] = [...MAJORS.map(major => ({ value: major })), { value: '기타' }];
  projectType: TProjectType | null = null;
  projectTypeOptions: ISelectOption[] = [{ value: null, viewValue: '전체' }, ...PROJECT_TYPES.map(type => ({ value: type }))];
  ownProjectOptions: ISelectOption[] = [{ value: null, viewValue: '전체' }, ...OWN_PROJECT_TYPES.map(type => ({ value: type }))];

  constructor(
    public readonly service: ProjectManagementService
  ) {
  }

  changeCreatedOption(value: '기간설정' | null): void {
    this.createdStart = this.createdEnd = null;
    this.createdOption = value;
  }

  changeCreatorOption(value: '이름' | '학번'): void {
    this.creatorName = this.creatorNo = null;
    this.creatorOption = value;
  }

  toggleDepartments(event: any): void {
    const { value, checked } = event.target;
    if (checked) {
      this.departments.push(value);
    } else {
      const i = this.departments.indexOf(value);
      this.departments.splice(i, 1);
    }
  }

  changeProjectType(type: TProjectType | null): void {
    this.subjectName = this.ownProjectType = null;
    this.projectType = type;
  }

  search(): void {
    try {
      const query = this._getQuery();
      this.service.search(query);
      this.service.pending$.pipe(
        filter(pending => pending === false),
        take(1)
      ).subscribe(() => this.collapsed = true);
    } catch (e) {
      alert(e.message);
    }
  }

  initQuery(): void {
    this.createdStart = null;
    this.createdEnd = null;
    this.grade = null;
    this.performedYearStart = null;
    this.performedSemesterStart = null;
    this.performedYearEnd = null;
    this.performedSemesterEnd = null;
    this.creatorName = null;
    this.creatorNo = null;
    this.school = null;
    this.departments = [...MAJORS, '기타'];
    this.subjectName = null;
    this.ownProjectType = null;
    this.professor = null;
    this.createdOption = null;
    this.creatorOption = '이름';
    this.projectType = null;

    this.search();
  }

  ngOnInit(): void {
    this._convertParams();
    this.collapsed = this.service.total > 0;
    if (this.service.total === 0) {
      this.search();
    }
  }

  private _getQuery(): ProjectManagementQuery {
    let createdStart = null;
    let createdEnd = null;
    let performedStart = null;
    let performedEnd = null;

    if (this.createdStart) {
      createdStart = new Date(this.createdStart);
      createdStart.setHours(createdStart.getHours() - 9);
    }

    if (this.createdEnd) {
      createdEnd = new Date(this.createdEnd);
      createdEnd.setHours(createdEnd.getHours() - 9);
    }

    if (this.performedYearStart) {
      performedStart = `${this.performedYearStart}-${this.performedSemesterStart ?? 0}`;
    }

    if (this.performedYearEnd) {
      performedEnd = `${this.performedYearEnd}-${this.performedSemesterEnd ?? 3}`;
    }

    if (this.departments.length === 0) {
      throw new Error('소속 학과를 하나 이상 선택해주세요.');
    }

    return {
      createdStart,
      createdEnd,
      grade: this.grade,
      performedStart,
      performedEnd,
      creatorName: this.creatorName,
      creatorNo: this.creatorNo,
      school: this.school,
      departments: this.departments,
      projectType: this.projectType,
      subjectName: this.subjectName,
      ownProjectType: this.ownProjectType,
      professor: this.professor,
    };
  }

  private _convertParams(): void {
    const {
      createdStart,
      createdEnd,
      grade,
      performedStart,
      performedEnd,
      creatorName,
      creatorNo,
      school,
      departments,
      projectType,
      subjectName,
      ownProjectType,
      professor,
    } = this.service.convertParamToQuery();

    if (createdStart || createdEnd) {
      this.createdOption = '기간설정';
    }

    if (createdStart) {
      const date = new Date(createdStart);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      this.createdStart = [year, month, day].join('-');
    }

    if (createdEnd) {
      const date = new Date(createdEnd);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      this.createdEnd = [year, month, day].join('-');
    }

    this.grade = grade ? +grade : null;
    if (performedStart) {
      const [year, semester] = performedStart.split('-');
      this.performedYearStart = +year;
      this.performedSemesterStart = +semester;
    }
    if (performedEnd) {
      const [year, semester] = performedEnd.split('-');
      this.performedYearEnd = +year;
      this.performedSemesterEnd = +semester;
    }
    this.creatorOption = creatorNo ? '학번' : '이름';
    this.creatorName = creatorName;
    this.creatorNo = creatorNo;
    this.school = school;
    this.departments = departments ?? [...MAJORS, '기타'];
    this.projectType = projectType;
    this.subjectName = subjectName;
    this.ownProjectType = ownProjectType;
    this.professor = professor;
  }
}
