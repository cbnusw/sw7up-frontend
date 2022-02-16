import { Component, forwardRef, Input, OnInit, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IDirectoryEntry, IProjectFile, TEntryList, TSelectableEntryList } from '../../../../types/project-file';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PublicSourceControlComponent),
  multi: true,
};

@Component({
  selector: 'sw-public-source-control',
  templateUrl: './public-source-control.component.html',
  styleUrls: ['./public-source-control.component.scss'],
  providers: [VALUE_ACCESSOR],
})
export class PublicSourceControlComponent implements ControlValueAccessor, OnInit {

  @Input() cloning: boolean;

  value: TSelectableEntryList = [];

  private onChange: any;
  private onTouch: any;

  constructor() {
  }

  @Input() set source(entries: TEntryList) {
    function convert(dirEntry: IDirectoryEntry, opened = false): IDirectoryEntry {
      const selectableDirEntry: IDirectoryEntry = { dirname: dirEntry.dirname, opened, entries: [] };

      (dirEntry.entries || []).forEach(e =>
        'dirname' in e ?
          selectableDirEntry.entries.push(convert(e)) :
          (selectableDirEntry.entries as TSelectableEntryList).push({ selected: true, file: e })
      );

      return selectableDirEntry;
    }

    this.value = [];

    if (!entries) {
      return;
    }

    entries.forEach(e => {
      'dirname' in e ? this.value.push(convert(e, true)) : this.value.push({ selected: true, file: e });
    });
  }

  changeValue(value: TSelectableEntryList): void {
    this.value = value;
    this.change();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(entries: TEntryList): void {
    // console.log(entries);
    this.source = entries;
  }

  ngOnInit(): void {
  }

  private change(): void {
    function convert(slist: TSelectableEntryList, elist: TEntryList, opened = false): void {
      slist.forEach(e => {
        if ('dirname' in e) {
          const _e: IDirectoryEntry = { dirname: e.dirname, opened, entries: [] };
          convert(e.entries as TSelectableEntryList, _e.entries as TEntryList);
          if (_e.entries.length > 0) {
            elist.push(_e);
          }
        } else {
          if (e.selected) {
            elist.push(e.file as IProjectFile);
          }
        }
      });
    }

    const entries: TEntryList = [];

    convert(this.value || [], entries, true);

    if (this.onChange) {
      this.onChange(entries);
    }
  }
}
