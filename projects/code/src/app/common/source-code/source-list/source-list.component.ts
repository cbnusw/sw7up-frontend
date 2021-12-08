import { Component, Input, OnInit } from '@angular/core';
import { IDirectoryEntry, TEntryList } from '../../../types/project-file';

@Component({
  selector: 'sw-source-list',
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.scss']
})
export class SourceListComponent implements OnInit {

  @Input() source: TEntryList;

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleOpened(entry: IDirectoryEntry): void {
    entry.opened = !entry.opened;
  }
}
