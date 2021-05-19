import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationService } from './core/services/navigation.service';

@Component({
  selector: 'sw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // animations: [
  //   trigger('fadeInOut', [
  //     transition(':enter', [   // :enter is alias to 'void => *'
  //       style({ opacity: 0 }),
  //       animate(1000, style({ opacity: 1 }))
  //     ]),
  //     transition(':leave', [   // :leave is alias to '* => void'
  //       animate(1000, style({ opacity: 0 }))
  //     ])
  //   ])
  // ]
})
export class AppComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  open = true;

  constructor(private navigation: NavigationService) {
  }

  ngOnInit(): void {
    this.subscription = this.navigation.open$.subscribe(open => this.open = open);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
