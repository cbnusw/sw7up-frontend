import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sw-grid-buttons',
  templateUrl: './grid-buttons.component.html',
  styleUrls: ['./grid-buttons.component.scss']
})
export class GridButtonsComponent implements OnInit {

  buttonGroups = [
    [
      { name: 'E-헬프데스크', description: 'E-Help Desk', link: '/community/e-help' },
      { name: '뉴스레터', description: 'Newsletter', link: '/community/newsletter' },
    ],
    [
      { name: '포토갤러리', description: 'Photo Gallery', link: '/community/gallery' },
      { name: '자료실', description: 'Archive', link: '/community/archive' },
    ]
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
