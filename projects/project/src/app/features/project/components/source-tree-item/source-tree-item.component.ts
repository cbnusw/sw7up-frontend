import { Component, Input, OnInit } from '@angular/core';
import { finalize, map } from 'rxjs/operators';
import { ProjectService } from '../../../../services';
import { IDirectoryEntry, INativeFile, IProjectFile, TSourceTree, TSourceTreeItem } from '../../../../types';

@Component({
  selector: 'sw-source-tree-item',
  templateUrl: './source-tree-item.component.html',
  styleUrls: ['./source-tree-item.component.scss']
})
export class SourceTreeItemComponent implements OnInit {

  @Input() selectable = false;
  @Input() item: TSourceTreeItem;

  code: { name: string; path: string; source: string } | null = null;
  pending = false;

  private _openCodeViewer = false;

  constructor(
    private _projectService: ProjectService
  ) {
  }

  set openCodeViewer(open: boolean) {
    this._openCodeViewer = open;

    if (open) {
      this.pending = true;
      if ('file' in this.item) {
        const path = this.item.file.webkitRelativePath;
        const name = this.item.file.name;
        this.item.file.text().then(
          source => {
            this.code = { name, path, source };
            this.pending = false;
          }
        ).catch(err => {
          alert('소스코드를 가져올 수 없습니다.');
          this._openCodeViewer = false;
        });
      } else {
        this._projectService.getProjectSourceCode((this.item as IProjectFile)._id).pipe(
          map(res => res.data),
          finalize(() => this.pending = false)
        ).subscribe({
          next: code => {
            this.code = code;
          },
          error: err => {
            alert('소스코드를 가져올 수 없습니다.');
            this._openCodeViewer = false;
          },
        });
      }
    }
  }

  get openCodeViewer(): boolean {
    return this._openCodeViewer;
  }

  selectDirectory(): void {
    function setSelection(tree: TSourceTree, selected: boolean): void {
      tree.forEach(item => {
        if ('dirname' in item) {
          setSelection(item.entries, selected);
        } else {
          item.selected = selected;
        }
      });
    }

    setSelection((this.item as IDirectoryEntry).entries, !this.isChecked());
  }

  isChecked(): boolean {
    return this._selectedSequence().every(selected => selected);
  }

  isIndeterminate(): boolean {
    return !this.isChecked() && this._selectedSequence().some(selected => selected);
  }

  private _selectedSequence(): boolean[] {
    const sequence: boolean[] = [];

    function getSequence(tree: TSourceTree, sequnece: boolean[]): void {
      tree.forEach(item => {
        if ('dirname' in item) {
          getSequence(item.entries, sequnece);
        } else {
          sequence.push(!!item.selected);
        }
      });
    }

    getSequence((this.item as IDirectoryEntry).entries, sequence);

    return sequence;
  }

  get isDirectory(): boolean {
    return !!(this.item as IDirectoryEntry)?.dirname;
  }

  get isNativeFile(): boolean {
    return !!(this.item as INativeFile)?.file;
  }

  get directory(): IDirectoryEntry {
    return this.item as IDirectoryEntry;
  }

  get nativeFile(): INativeFile {
    return this.item as INativeFile;
  }

  get projectFile(): IProjectFile {
    return this.item as IProjectFile;
  }

  toggleSelect(): void {
    (this.item as INativeFile | IProjectFile).selected = !(this.item as INativeFile | IProjectFile).selected;
  }

  ngOnInit(): void {
  }
}
