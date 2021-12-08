import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { from } from 'rxjs';
import { finalize, mergeMap } from 'rxjs/operators';
import { GithubService, IProject, ProjectService } from 'shared';

@Component({
  selector: 'sw-register-projects-dialog',
  templateUrl: './register-projects-dialog.component.html',
  styleUrls: ['./register-projects-dialog.component.scss']
})
export class RegisterProjectsDialogComponent implements OnInit {

  projects: IProject[] = [];
  selectedProjects: IProject[] = [];
  loading: boolean;
  progress = 0;

  constructor(private dialogRef: MatDialogRef<RegisterProjectsDialogComponent>,
              private githubService: GithubService,
              private projectService: ProjectService) {
  }

  isSelected(project: IProject): boolean {
    return this.selectedProjects.map(p => p.fullName).indexOf(project.fullName) !== -1;
  }

  toggleSelect(project: IProject): void {
    const idx = this.selectedProjects.map(p => p.fullName).indexOf(project.fullName);
    if (idx !== -1) {
      this.selectedProjects.splice(idx, 1);
    } else {
      this.selectedProjects.push(project);
    }
  }

  addProjects(): void {
    if (this.selectedProjects.length === 0) {
      alert('선택한 프로젝트가 없습니다.');
      return;
    }

    const yes = confirm('선택한 프로젝트를 등록하시겠습니까?');

    if (!yes) {
      return;
    }

    this.loading = true;

    from(this.selectedProjects).pipe(
      finalize(() => {
        this.loading = false;
        this.progress = 0;
      }),
      mergeMap(project => this.projectService.addProject(project), 2),
    ).subscribe(
      () => this.progress++,
      err => console.error(err),
      () => this.dialogRef.close(true)
    );

  }

  close(): void {
    this.dialogRef.close(false);
  }

  ngOnInit(): void {
    this.loading = true;
    this.projectService.getGithubProjects().pipe(
      finalize(() => this.loading = false)
    ).subscribe(
      res => this.projects = res.data
    );
  }
}
