import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'shared';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'sw-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  constructor(private auth: AuthService,
              private projectService: ProjectService,
              private router: Router) {
  }

  ngOnInit(): void {
    this._init();
  }

  private async _init(): Promise<void> {
  }
}
