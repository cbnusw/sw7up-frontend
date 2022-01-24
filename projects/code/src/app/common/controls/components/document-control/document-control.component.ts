import { Component, forwardRef, Input, OnInit, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ProjectService } from '../../../../services/project.service';
import { IProjectDocument } from '../../../../types/project';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DocumentControlComponent),
  multi: true,
};

@Component({
  selector: 'sw-document-control',
  templateUrl: './document-control.component.html',
  styleUrls: ['./document-control.component.scss'],
  providers: [VALUE_ACCESSOR],
})
export class DocumentControlComponent implements ControlValueAccessor, OnInit {

  @Input() projectId: string;
  value: IProjectDocument[] = [];
  uplodingIndex = -1;

  private onChange: any;
  private onTouch: any;

  constructor(private projectService: ProjectService) {
  }

  addDocument(): void {
    this.value.push({ name: null, file: null });
    this._change();
  }

  async changeFile(index: number, files: File[]): Promise<void> {
    const f = files[0];
    if (!f || !this.projectId) {
      return;
    }
    this.uplodingIndex = index;
    try {
      const { data: file } = await this.projectService.uploadProjectDocument(this.projectId, f).toPromise();
      this.value[index].file = file;
    } catch (e) {
      alert('파일 업로드 실패');
    }
    this.uplodingIndex = -1;
    this._change();
  }

  changeName(document: IProjectDocument, name: string): void {
    document.name = name;
    this._change();
  }

  remove(index: number): void {
    this.value.splice(index, 1);
    this._change();
  }

  removeFile(document: IProjectDocument): void {
    document.file = null;
    this._change();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: IProjectDocument[]): void {
    this.value = value || [];
  }

  ngOnInit(): void {
  }

  private _change(): void {
    if (this.onChange) {
      this.onChange(this.value);
    }
  }
}
