import { IDirectoryEntry, IProjectFile, ISelectableFile, TSelectableEntryList } from '../types/project-file';

export function compareTracedEntry(
  e1: IDirectoryEntry | ISelectableFile, e2: IDirectoryEntry | ISelectableFile
): number {
  if ('dirname' in e1) {
    if ('dirname' in e2) {
      return e1.dirname < e2.dirname ? -1 : 1;
    }
    return -1;
  } else {
    if ('dirname' in e2) {
      return 1;
    }
    return e1.file.name < e2.file.name ? -1 : 1;
  }
}

export function flatTracedEntries(entries: TSelectableEntryList, files: Array<IProjectFile | File>): void {
  const cmp = (f1: File, f2: File) => f1.name < f2.name ? -1 : 1;

  entries.forEach(entry => {
    if ('dirname' in entry) {
      flatTracedEntries(entry.entries as TSelectableEntryList, files);
    } else if (entry.selected) {
      files.push(entry.file);
    }
  });

  files.sort(cmp);
}
