import { Component, OnInit } from '@angular/core';
import { MAJORS } from 'shared';
import { ISelectOption, OWN_PROJECT_TYPES, PROJECT_TYPES, SEMESTERS, TOwnProjectType, TProjectType } from '../../../../../types';
import { ProjectManagementQuery, ProjectManagementService } from '../../services/project-management.service';

@Component({
  selector: 'sw-project-filter',
  templateUrl: './project-filter.component.html',
  styleUrls: ['./project-filter.component.scss']
})
export class ProjectFilterComponent implements OnInit {
  collapsed = true;

  createdStart: Date | null = null;
  createdEnd: Date | null = null;
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
    } catch (e) {
      alert(e.message);
    }
  }

  ngOnInit(): void {
    this._convertParams();
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

    this.createdStart = createdStart;
    this.createdEnd = createdEnd;
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
    this.creatorName = creatorName;
    this.creatorNo = creatorNo;
    this.school = school;
    this.departments = departments;
    this.projectType = projectType;
    this.subjectName = subjectName;
    this.ownProjectType = ownProjectType;
    this.professor = professor;
  }
}
