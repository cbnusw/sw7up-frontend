import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService, ProjectService } from 'shared';

@Component({
  selector: 'sw-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  totalProjects: number;

  constructor(private auth: AuthService,
              private projectService: ProjectService,
              private router: Router) {
  }

  get projectButtonLabel(): string {
    if (this.auth.isStudent) {
      return '내 프로젝트 관리하기';
    } else if (this.auth.isOperator) {
      return '프로젝트 관리';
    } else {
      return '프로젝트 보러가기';
    }
  }

  moveProjectPage(): boolean {
    if (this.auth.isStudent) {
      this.router.navigateByUrl('/project/me');
    } else {
      this.router.navigateByUrl('/project/list');
    }
    return false;
  }

  ngOnInit(): void {
    this.projectService.countProjects().subscribe(
      res => this.totalProjects = res.data
    );
  }
}
