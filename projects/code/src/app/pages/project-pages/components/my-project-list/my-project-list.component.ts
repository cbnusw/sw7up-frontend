import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractSearchDirective, IListResponse, IParams, IProject, ProjectService } from 'shared';
import { LayoutService } from 'ui';
import { RegisterProjectsDialogComponent } from '../../dialogs/register-projects-dialog/register-projects-dialog.component';

@Component({
  selector: 'sw-my-project-list',
  templateUrl: './my-project-list.component.html',
  styleUrls: ['./my-project-list.component.scss']
})
export class MyProjectListComponent extends AbstractSearchDirective<IProject> implements AfterViewInit {

  columns: string[] = ['no', 'name', 'repository', 'size', 'owner', 'members', 'createdAt', 'updatedAt'];
  limitOptions: number[] = [10, 20, 30, 50];

  @ViewChild(MatSort) sort: MatSort;

  constructor(public layout: LayoutService,
              private projectService: ProjectService,
              private dialog: MatDialog,
              route: ActivatedRoute,
              router: Router) {
    super({ limit: 10, sort: '-updatedAt' }, ['repository', 'name', 'owner', 'members'], route, router);
  }

  changePage(event: PageEvent): void {
    this.limit = event.pageSize;
    super.pagination(event.pageIndex + 1);
  }

  addProjects(): void {
    this.dialog.open(RegisterProjectsDialogComponent, {
      width: '800px'
    }).afterClosed().subscribe(
      res => {
        if (res) {
          this.search();
        }
      }
    );
  }

  protected requestObservable(params: IParams | undefined): Observable<IListResponse<IProject>> {
    return this.projectService.getMyProjects(params);
  }

  ngAfterViewInit(): void {
    this.addSubscriptions(
      this.sort.sortChange
        .subscribe(event => {
          this.params.sort = `${event.direction === 'asc' ? '' : '-'}${event.active}`;
          this.search(this.page);
        })
    );
  }
}
