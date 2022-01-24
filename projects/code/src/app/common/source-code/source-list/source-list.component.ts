import { Component, Input, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { IDirectoryEntry, TEntryList } from '../../../types/project-file';

@Component({
  selector: 'sw-source-list',
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.scss']
})
export class SourceListComponent implements OnInit {

  @Input() source: TEntryList;
  code: { name: string; path: string; source: string; };

  constructor(private projectService: ProjectService) {
  }

  showCode(id: string): void {
    this.projectService.getProjectCodeText(id).subscribe(res => this.code = res.data);
  }

  hideCode(): void {
    this.code = null;
  }

  ngOnInit(): void {
  }

  toggleOpened(entry: IDirectoryEntry): void {
    entry.opened = !entry.opened;
  }
}
