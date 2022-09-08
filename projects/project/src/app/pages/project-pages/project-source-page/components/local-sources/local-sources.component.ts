import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { from } from 'rxjs';
import { finalize, map, mergeMap, retry, timeout } from 'rxjs/operators';
import { SourceTreeComponent } from '../../../../../features/project';
import { ProjectService } from '../../../../../services';
import { INativeFile, TSourceTree } from '../../../../../types';

@Component({
  selector: 'sw-local-sources',
  templateUrl: './local-sources.component.html',
  styleUrls: ['./local-sources.component.scss']
})
export class LocalSourcesComponent implements OnInit {

  @Input() projectId: string;
  @Output() uploadedChange: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild(SourceTreeComponent) sourceTreeComponent?: SourceTreeComponent;

  pending = false;
  uploadTotal: number;
  uploadCount: number;
  sourceTree: TSourceTree | null = null;
  disabled = false;

  constructor(
    private _projectService: ProjectService,
  ) {
  }

  changeSources(entries: TSourceTree): void {
    this.sourceTree = entries;
  }

  setDisabled(disabled: boolean): void {
    this.disabled = disabled;
  }

  cancel(): void {
    this.sourceTree = null;
  }

  upload(): void {
    const files = this.sourceTreeComponent?.selectedFiles || [];
    if (files.length === 0) {
      alert('업로드할 소스파일을 선택해주십시오.');
      return;
    }

    this.uploadTotal = files.length;
    this.uploadCount = 0;
    this.pending = true;

    from(files).pipe(
      map(file => (file as INativeFile).file),
      mergeMap(file => {
        const chunks = file.webkitRelativePath.split('/');
        const path = chunks.slice(0, chunks.length - 1).join('/');
        return this._projectService
          .uploadSourceFile(this.projectId, path, file)
          .pipe(
            timeout(5000),
            retry(5),
          );
        }, 5
      ),
      finalize(() => this.pending = false)
    ).subscribe({
      next: () => this.uploadCount++,
      error: err => alert(`업로드에 실패했습니다.\nError: ${err?.error?.code || err?.message}`),
      complete: () => {
        this._projectService.applyUploadSourceFiles(this.projectId).subscribe({
          next: () => {
            this.sourceTree = null;
            this.uploadedChange.emit();
            alert('업로드를 완료하였습니다.');
          },
          error: err => alert(`Error: ${err?.error?.code || err?.message}`)
        });
      },
    });
  }

  ngOnInit(): void {
  }
}
