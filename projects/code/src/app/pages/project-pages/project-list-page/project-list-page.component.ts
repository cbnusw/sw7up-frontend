import { Component } from '@angular/core';

@Component({
  selector: 'sw-project-list-page',
  templateUrl: './project-list-page.component.html',
  styleUrls: ['./project-list-page.component.scss']
})
// export class ProjectListPageComponent extends AbstractSearchDirective<ILocalProject> implements AfterViewInit {
export class ProjectListPageComponent {

  // columns: string[] = ['no', 'name', 'repository', 'size', 'owner', 'members', 'createdAt', 'updatedAt'];
  // limitOptions: number[] = [10, 20, 30, 50];
  //
  // @ViewChild(MatSort) sort: MatSort;
  //
  // constructor(private auth: AuthService,
  //             private projectService: ProjectService,
  //             route: ActivatedRoute,
  //             router: Router) {
  //   super({ limit: 10, sort: '-updatedAt' }, ['repository', 'name', 'owner', 'members'], route, router);
  // }
  //
  // changePage(event: PageEvent): void {
  //   this.limit = event.pageSize;
  //   super.pagination(event.pageIndex + 1);
  // }
  //
  // protected requestObservable(params: IParams | undefined): Observable<IListResponse<ILocalProject>> {
  //   return this.projectService.getLocalProjects(params);
  // }
  //
  // ngAfterViewInit(): void {
  //   this.addSubscriptions(
  //     this.sort.sortChange
  //       .subscribe(event => {
  //         this.params.sort = `${event.direction === 'asc' ? '' : '-'}${event.active}`;
  //         this.search(this.page);
  //       })
  //   );
  // }
}
