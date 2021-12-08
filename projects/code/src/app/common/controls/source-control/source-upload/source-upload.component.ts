import { Component, Input, OnInit } from '@angular/core';
import { IDirectoryEntry, ISelectableFile, TSelectableEntryList } from '../../../../types/project-file';

@Component({
  selector: 'sw-source-upload',
  templateUrl: './source-upload.component.html',
  styleUrls: ['./source-upload.component.scss']
})
export class SourceUploadComponent implements OnInit {

  @Input() entries: TSelectableEntryList = [];

  constructor() {
  }

  toggleOpened(entry: IDirectoryEntry): void {
    entry.opened = !entry.opened;
  }

  ngOnInit(): void {
  }

  isSelectedDirectory(entry: IDirectoryEntry): boolean {
    function hasSelected(entries: TSelectableEntryList, on: boolean): boolean {
      if (on) {
        return true;
      }

      for (const e of entries) {
        on = 'dirname' in e ? hasSelected(e.entries as TSelectableEntryList, false) : e.selected;
        if (on) {
          return true;
        }
      }

      return false;
    }

    return hasSelected(entry.entries as TSelectableEntryList, false);
  }

  toggleSelected(entry: IDirectoryEntry | ISelectableFile): void {
    function setSelected(entries: TSelectableEntryList, selected: boolean): void {
      entries.forEach(e => {
        if ('dirname' in e) {
          setSelected(e.entries as TSelectableEntryList, selected);
        } else {
          e.selected = selected;
        }
      });
    }


    if ('dirname' in entry) {
      const s = !this.isSelectedDirectory(entry);
      setSelected(entry.entries as TSelectableEntryList, s);
    } else {
      entry.selected = !entry.selected;
    }
  }
}
