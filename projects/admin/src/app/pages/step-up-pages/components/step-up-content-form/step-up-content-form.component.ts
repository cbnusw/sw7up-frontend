import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractFormDirective, IStepUpContent, PlatformService, UploadService } from 'shared';
import { ErrorMatcher } from '../../../../classes/error-matcher';
import { UploadAdapter } from '../../../../classes/upload-adaptor';
import { StepUpContentService } from '../../services/step-up-content.service';
import { StepUpSubjectService } from '../../services/step-up-subject.service';

@Component({
  selector: 'sw-step-up-content-form',
  templateUrl: './step-up-content-form.component.html',
  styleUrls: ['./step-up-content-form.component.scss']
})
export class StepUpContentFormComponent extends AbstractFormDirective<IStepUpContent, boolean> implements OnInit {
  @Output() readonly closeForm: EventEmitter<void> = new EventEmitter<void>();
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  subjects = '';

  errorMatcher = new ErrorMatcher(this.submitted$, this.submissionError$);
  // CKEditor
  editor: any = null;
  problemConfig = {
    language: 'ko',
    placeholder: '문제 작성'
  };
  solutionConfig = {
    language: 'ko',
    placeholder: '정답 코드 작성'
  };

  constructor(public contentService: StepUpContentService,
              private _subjectService: StepUpSubjectService,
              private readonly uploadService: UploadService,
              platform: PlatformService,
              fb: FormBuilder) {
    super(fb, true, platform);
    if (platform.isBrowser) {
      import('@ckeditor/ckeditor5-build-decoupled-document').then(editor => this.editor = editor.default);
    }
  }

  get tags(): string[] {
    return this.formGroup.get('tags').value as string[];
  }

  removeTag(index: number): void {
    this.tags.splice(index, 1);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const index = this.tags.indexOf(value);
    if (value && index === -1) {
      this.tags.push(value);
    }

    event.chipInput?.clear();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.addSubscriptions(
      this.contentService.selected$.subscribe(c => this.model = c)
    );

    this._subjectService.getSubjectSequence(this._subjectService.selected._id).pipe(
      map(subjects => subjects.map(subj => subj.name).join(' > '))
    ).subscribe(subjects => this.subjects = subjects);
  }

  onReady(editor: any): void {
    editor.plugins.get('FileRepository').createUploadAdapter = loader => {
      return new UploadAdapter(loader, this.uploadService);
    };

    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }


  protected async processAfterSubmission(s: boolean): Promise<void> {
    this.contentService.update();
    this.closeForm.emit();
  }

  protected mapFormToModel(formGroup: FormGroup): Promise<IStepUpContent> {
    const model = formGroup.getRawValue();
    if (!model._id) {
      delete model._id;
    }

    return model;
  }

  protected initFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      _id: [null],
      subject: [this._subjectService.selected._id],
      tags: [[]],
      title: [null, Validators.required],
      problem: [null, Validators.required],
      solution: [null, Validators.required],
    });
  }

  protected requestObservable(m: IStepUpContent): Observable<boolean> {
    return this.modifying ? this.contentService.updateContent(m._id, m) : this.contentService.createContent(m);
  }
}
