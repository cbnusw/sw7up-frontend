import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, forwardRef, Input, OnInit, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { from } from 'rxjs';
import { finalize, mergeMap } from 'rxjs/operators';
import { IFile, UploadService } from 'shared';

const CONTROL_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FileSelectorComponent),
  multi: true,
};

@Component({
  selector: 'sw-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.scss'],
  providers: [CONTROL_ACCESSOR]
})
export class FileSelectorComponent implements ControlValueAccessor, OnInit {

  private onChange: any;
  private onTouched: any;

  files: IFile[] = [];
  loading: boolean;
  dragIndex = -1;

  @Input() multiple: boolean;
  @Input() accept = '*/*';

  constructor(private uploadService: UploadService) {
  }

  drop(e: CdkDragDrop<IFile, any>): void {
    moveItemInArray(this.files, e.previousIndex, e.currentIndex);
    this.change();
  }

  uploadFiles(files: File[]): void {
    this.loading = true;
    from(files).pipe(
      mergeMap(file => this.uploadService.upload(file), 5),
      finalize(() => this.loading = false)
    ).subscribe(
      res => this.files.push(res.data),
      err => console.error(err),
      () => this.change()
    );
  }

  removeFile(index: number): void {
    this.files.splice(index, 1);
    this.change();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: IFile[]): void {
    this.files = obj || [];
  }

  private change(): void {
    if (this.files.length > 0) {
      this.onChange(this.files);
    } else {
      this.onChange(null);
    }
  }

  ngOnInit(): void {
  }
}
