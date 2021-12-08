import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { IDirectoryEntry, IDropFilesOptions, ITraceOptions, TSelectableEntryList } from '../../../types/project-file';
import { compareTracedEntry } from '../../../utils/file';

const getFile = (e: any): Promise<File> => new Promise(resolve => e.file(resolve));

const getEntries = (e: any): Promise<any[]> => new Promise(resolve => {
  const reader: any = e.createReader();
  reader.readEntries((entries: any[]) => {
    entries = Array.from(entries);
    resolve(entries);
  });
});

@Directive({
  selector: '[swDropFiles]'
})
export class DropFilesDirective {

  @Input() options: IDropFilesOptions = {};

  @Output() dropChange: EventEmitter<TSelectableEntryList> = new EventEmitter<TSelectableEntryList>();
  @Input() @HostBinding('class.disable') disable = false;
  @HostBinding('class.over') private _over = false;

  constructor() {
  }

  @HostListener('dragover', ['$event']) handleDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this._over = !this.disable;
  }

  @HostListener('dragleave', ['$event']) handleDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this._over = false;
  }

  @HostListener('drop', ['$event'])
  async handleDrop(event: DragEvent): Promise<void> {
    event.preventDefault();
    event.stopPropagation();

    if (this.disable) {
      return;
    }

    const { multiple, type = 'file' } = this.options;
    this._over = false;
    const droppedEntries: Array<any> =
      Array.from(event.dataTransfer?.items ?? []).map(item => item.webkitGetAsEntry());

    if (!multiple && droppedEntries.length > 1) {
      return alert('하나의 파일(또는 디렉토리)만 드래그해주세요.');
    } else if (type === 'directory' && droppedEntries.some(entry => entry.isFile)) {
      return alert('디렉터리만 드래그해주세요.');
    } else if (type === 'file') {
      if (droppedEntries.some(entry => entry.isDirectory)) {
        return alert('파일만 드래그해주세요.');
      }
      if (!await this._validateFiles(droppedEntries)) {
        return alert(`올바르지 않은 형식의 ${multiple ? '파일이 포함되어 있습니다' : '파일입니다'}.`);
      }
    }

    const entries: TSelectableEntryList = [];

    for (const entry of droppedEntries) {
      await traceEntry(entry, entries, this.options);
    }

    this.dropChange.emit(entries);
  }

  private async _validateFiles(entries: any[]): Promise<boolean> {

    const files = await Promise.all(entries.map(entry => getFile(entry)));
    const { mimetypeFilters, exceptMimetypeFilters } = this.options;

    if (mimetypeFilters && files.some(file => !mimetypeFilters.some(filter => filter.test(file.type)))) {
      return false;
    } else if (exceptMimetypeFilters &&
      files.some(file => exceptMimetypeFilters.some(filter => filter.test(file.type)))) {
      return false;
    }

    return true;
  }
}

async function traceEntry(entry: any, tracedEntries: TSelectableEntryList, options: ITraceOptions = {}): Promise<void> {
  if (!entry) {
    return;
  }

  if (entry.isFile) {
    await traceFile(entry, tracedEntries, options);
  } else if (entry.isDirectory) {
    await traceDirectory(entry, tracedEntries, options);
  }

  tracedEntries.sort(compareTracedEntry);
}

async function traceFile(entry: any, tracedEntries: TSelectableEntryList, options: ITraceOptions): Promise<void> {
  const file: File = await getFile(entry);

  if (!validateFile(file, options)) {
    return;
  }
  tracedEntries.push({
    selected: false,
    file
  });
}

async function traceDirectory(entry: any, tracedEntries: TSelectableEntryList, options: ITraceOptions): Promise<void> {
  const { name: dirname } = entry;

  if (!validateDirectory(dirname, options)) {
    return;
  }

  const dirEntry: IDirectoryEntry = { dirname, entries: [] };
  const entries = await getEntries(entry);

  for (const e of entries) {
    await traceEntry(e, dirEntry.entries as TSelectableEntryList, options);
  }
  tracedEntries.push(dirEntry);
}

function validateFile(file: File, options: ITraceOptions): boolean {
  const { filenameFilters, mimetypeFilters, exceptMimetypeFilters, exceptFilenameFilters } = options;

  if (filenameFilters && !filenameFilters.some(filter => filter.test(file.name))) {
    return false;
  }
  if (exceptFilenameFilters && exceptFilenameFilters.some(filter => filter.test(file.name))) {
    return false;
  }
  if (mimetypeFilters && !mimetypeFilters.some(filter => filter.test(file.type))) {
    return false;
  }

  if (exceptMimetypeFilters && exceptMimetypeFilters.some(filter => filter.test(file.type))) {
    return false;
  }

  return true;
}

function validateDirectory(dirName: string, options: ITraceOptions): boolean {
  const { directoryFilters, exceptDirectoryFilters } = options;

  if (directoryFilters && !directoryFilters.some(filter => filter.test(dirName))) {
    return false;
  }

  if (exceptDirectoryFilters && exceptDirectoryFilters.some(filter => filter.test(dirName))) {
    return false;
  }

  return true;
}
