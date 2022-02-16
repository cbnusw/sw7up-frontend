import { Component, forwardRef, Input, OnInit, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { timeout } from 'rxjs/operators';
import { ProjectService } from '../../../../services/project.service';
import { IDirectoryEntry, TSelectableEntryList, TEntryList, IProjectFile } from '../../../../types/project-file';
import { compareTracedEntry, flatTracedEntries } from '../../../../utils/file';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SourceControlComponent),
  multi: true,
};

@Component({
  selector: 'sw-source-control',
  templateUrl: './source-control.component.html',
  styleUrls: ['./source-control.component.scss'],
  providers: [VALUE_ACCESSOR]
})
export class SourceControlComponent implements ControlValueAccessor, OnInit {

  @Input() projectId: string;

  value: TSelectableEntryList;
  entries: TSelectableEntryList;
  editMode: boolean;
  total = 0;
  count = 0;
  uploading = false;

  private onChange: any;
  private onTouch: any;

  constructor(private projectService: ProjectService) {
  }

  get uploadMode(): boolean {
    return !!this.entries;
  }

  changeDirectory(entries: TSelectableEntryList): void {
    this.entries = entries;
  }

  cancelUpload(): void {
    this.entries = null;
    this.editMode = !this.value;
  }

  async upload(): Promise<void> {
    const yes = confirm(
      '다운로드 받은 외부 라이브러리(node_module, virtual_env 디렉터리) 등은 업로드 대상에서 제외 후 업로드해 주세요.' +
      '\n소스파일을 업로드하시겠습니까?'
    );

    if (!yes) {
      return;
    }

    const files: File[] = [];
    flatTracedEntries(this.entries, files);

    const list: Array<{ uploaded: boolean; file: File }> = files.map(file => ({ uploaded: false, file }));
    const uploadedList: IProjectFile[] = [];

    this.total = list.length;

    this.uploading = true;
    await this.projectService.removeTemporarySources(this.projectId);
    while (!list.every(item => item.uploaded)) {
      for (const item of list) {
        if (item.uploaded) {
          continue;
        }
        const chunks = (item.file as any).webkitRelativePath.split('/');
        chunks.pop();
        const dirPath = chunks.join('/');
        try {
          const { data } = await this.projectService
            .uploadProjectSource(this.projectId, item.file, dirPath)
            .pipe(timeout(2000))
            .toPromise();
          item.uploaded = true;
          this.count++;
          uploadedList.push(data);
        } catch (e) {
        }
      }
    }
    this.count = this.total = 0;
    this.entries = null;
    this.editMode = false;
    this.value = this._convertFilesToSelectableEntryList(uploadedList);
    this._change();
    this.uploading = false;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: TEntryList): void {
    if (value) {
      // convert to TEntryList type
      this.value = this._convertEntryListToSelectableEntryList(value);
    } else {
      this.value = null;
    }
    this.editMode = !this.value;
  }

  ngOnInit(): void {
    this.editMode = !this.value;
  }

  private _change(): void {
    if (this.onChange) {
      const value = this._convertSelectableEntryListToEntryList(this.value);
      this.onChange(value);
    }
  }

  changeValue(value: TSelectableEntryList): void {
    this.value = value;
    this._change();
  }

  private _convertFilesToSelectableEntryList(files: IProjectFile[]): TSelectableEntryList {
    const entries: TSelectableEntryList = [];

    files.forEach(file => {
      const chunks = file.path.split('/');
      const directories = chunks.slice(6, chunks.length - 1);
      let current: TSelectableEntryList = entries;

      for (const dirname of directories) {
        let entry: IDirectoryEntry = current.find(e => 'dirname' in e && e.dirname === dirname) as IDirectoryEntry;
        if (!entry) {
          entry = { dirname, entries: [] };
          current.push(entry);
          current.sort(compareTracedEntry);
        }
        current = entry.entries as TSelectableEntryList;
      }
      current.push({ selected: true, file });
      current.sort(compareTracedEntry);
    });

    return entries;
  }

  private _convertEntryListToSelectableEntryList(entries: TEntryList): TSelectableEntryList {

    function convert(dirEntry: IDirectoryEntry, opened = false): IDirectoryEntry {
      const selectableDirEntry: IDirectoryEntry = { dirname: dirEntry.dirname, opened, entries: [] };

      (dirEntry.entries || []).forEach(e =>
        'dirname' in e ?
          selectableDirEntry.entries.push(convert(e)) :
          (selectableDirEntry.entries as TSelectableEntryList).push({ selected: true, file: e })
      );

      return selectableDirEntry;
    }

    const selectableEntries: TSelectableEntryList = [];
    if (!entries) {
      return selectableEntries;
    }

    entries.forEach(e => {
      'dirname' in e ? selectableEntries.push(convert(e, true)) : selectableEntries.push({ selected: true, file: e });
    });

    return selectableEntries;
  }

  private _convertSelectableEntryListToEntryList(selectableEntries: TSelectableEntryList): TEntryList {

    function convert(slist: TSelectableEntryList, elist: TEntryList): void {
      slist.forEach(e => {
        if ('dirname' in e) {
          const _e: IDirectoryEntry = { dirname: e.dirname, entries: [] };
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

    convert(selectableEntries || [], entries);
    return entries;
  }
}


