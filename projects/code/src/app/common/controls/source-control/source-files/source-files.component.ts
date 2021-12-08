import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDirectoryEntry, ISelectableFile, TSelectableEntryList } from '../../../../types/project-file';

@Component({
  selector: 'sw-source-files',
  templateUrl: './source-files.component.html',
  styleUrls: ['./source-files.component.scss']
})
export class SourceFilesComponent implements OnInit {

  @Input() value: TSelectableEntryList;
  @Output() valueChange: EventEmitter<TSelectableEntryList> = new EventEmitter<TSelectableEntryList>();

  constructor() {
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

  toggleOpened(entry: IDirectoryEntry): void {
    entry.opened = !entry.opened;
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

    this.valueChange.emit(this.value);
  }

  changeValue(event: TSelectableEntryList): void {
    this.valueChange.emit(this.value);
  }

  ngOnInit(): void {
  }
}
