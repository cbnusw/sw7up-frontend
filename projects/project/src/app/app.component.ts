import { Component } from '@angular/core';
import { HeaderService } from './common/main/services';

@Component({
  selector: 'sw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public headerService: HeaderService
  ) {
  }
}
