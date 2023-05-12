import { Component, OnInit } from '@angular/core';
import { URLS } from '../../../../constants/urls';

@Component({
  selector: 'sw-grid-buttons',
  templateUrl: './grid-buttons.component.html',
  styleUrls: ['./grid-buttons.component.scss']
})
export class GridButtonsComponent implements OnInit {

  stepUpLink = URLS.EDUCATION.STEP_UP;

  buttonGroups = [
    [
      { name: 'E-헬프데스크', description: 'E-Help Desk', link: URLS.COMMUNITY.E_HELP },
      { name: '뉴스레터', description: 'Newsletter', link: URLS.COMMUNITY.NEWSLETTER },
    ],
    [
      { name: '포토갤러리', description: 'Photo Gallery', link: URLS.COMMUNITY.GALLERY },
      { name: '자료실', description: 'Archive', link: URLS.COMMUNITY.ARCHIVE },
    ]
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
