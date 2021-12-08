import { Component } from '@angular/core';
import { AuthService } from 'shared';

@Component({
  selector: 'sw-local-project-management-page',
  templateUrl: './local-project-management-page.component.html',
  styleUrls: ['./local-project-management-page.component.scss']
})
export class LocalProjectManagementPageComponent {

  constructor(public auth: AuthService) {
  }
}
