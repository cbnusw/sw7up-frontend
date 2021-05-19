import { HttpErrorResponse } from '@angular/common/http';
import { Directive, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { finalize, shareReplay } from 'rxjs/operators';
import { PlatformService } from '../services/platform.service';

export interface SubmissionError {
  path?: Array<string> | string;
  message?: string;
  code?: string;
}

@Directive()
export abstract class AbstractFormDirective<M, S> implements OnInit, OnDestroy {
  private modelSubject: BehaviorSubject<M> = new BehaviorSubject(null);
  private submissionErrorSubject: BehaviorSubject<SubmissionError> = new BehaviorSubject({});
  private submittedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private subscription: Subscription;
  protected mapModel: (m: any) => M;

  loading: boolean;
  formGroup: FormGroup;
  model$: Observable<M> = this.modelSubject.asObservable();
  submitted$: Observable<boolean> = this.submittedSubject.asObservable();
  submissionError$: Observable<SubmissionError> = this.submissionErrorSubject.asObservable();

  @Output() modelChange: EventEmitter<M> = new EventEmitter();

  protected constructor(protected fb: FormBuilder,
                        private onInit: boolean = false,
                        protected platform: PlatformService = null) {
    if (!onInit) {

      if (this.platform && this.platform.isServer) {
        return;
      }

      this.formGroup = this.initFormGroup(this.fb);
    }
  }

  set submitted(submitted: boolean) {
    this.submittedSubject.next(submitted);
  }

  get submitted(): boolean {
    return this.submittedSubject.value;
  }

  set submissionError(error: SubmissionError) {
    this.submissionErrorSubject.next(error || {});
  }

  get submissionError(): SubmissionError {
    return this.submissionErrorSubject.value;
  }

  get submissionErrorPath(): Array<string> | string {
    return this.submissionError.path;
  }

  get submissionErrorMessage(): string {
    return this.submissionError.message;
  }

  get submissionErrorCode(): string {
    return this.submissionError.code;
  }

  @Input()
  set model(model: M) {
    if (this.mapModel) {
      model = this.mapModel(model);
    }
    this.modelSubject.next(model);
  }

  get model(): M {
    return this.modelSubject.value;
  }

  get modifying(): boolean {
    return !!this.model;
  }

  async isInvalidForm(): Promise<boolean> {
    if (this.platform && this.platform.isServer) {
      return false;
    }
    return this.formGroup.invalid;
  }

  invalid(path?: Array<string> | string): boolean {
    if (this.platform && this.platform.isServer) {
      return false;
    }

    if (!this.submitted) {
      return false;
    }

    try {
      return this.hasSubmissionError(path) || (path ? this.formGroup.get(path).invalid : this.formGroup.invalid);
    } catch (e) {
      console.error(e);
      return true;
    }
  }

  hasError(errorCodes: string | Array<string>, path?: Array<string> | string): boolean {
    if (this.platform && this.platform.isServer) {
      return false;
    }

    if (Array.isArray(errorCodes)) {
      return errorCodes.some(code => this.submitted && this.formGroup.hasError(code, path));
    } else {
      return this.submitted && this.formGroup.hasError(errorCodes, path);
    }
  }

  hasSubmissionError(path?: Array<string> | string, codes?: Array<string> | string): boolean {

    if (!this.submissionErrorMessage) {
      return false;
    }

    let isCode = true;

    if (codes) {
      isCode = Array.isArray(codes) ? codes.some(code => code === this.submissionErrorCode) : codes === this.submissionErrorCode;
    }

    if (!path && !this.submissionErrorPath) {
      return isCode;
    }

    if (Array.isArray(path) && Array.isArray(this.submissionErrorPath)) {
      return path.join('.') === this.submissionErrorPath.join('.') && isCode;
    }

    return path === this.submissionErrorPath && isCode;
  }

  async submit(): Promise<void> {

    if (this.platform && this.platform.isServer) {
      return;
    }

    this.submitted = true;

    if (await this.isInvalidForm()) {
      return;
    }

    this.loading = true;
    const model = await this.mapFormToModel(this.formGroup);
    this.requestObservable(model).pipe(
      shareReplay(),
      finalize(() => this.loading = false)
    ).subscribe(
      s => this.processAfterSubmission(s),
      err => this.processSubmissionError(err)
    );
  }

  reset(): void {
    if (this.platform && this.platform.isServer) {
      return;
    }

    this.formGroup.reset();
    this.model = null;
    this.modelChange.emit(this.model);
  }

  protected abstract initFormGroup(fb: FormBuilder): FormGroup;

  protected abstract requestObservable(m: M): Observable<S>;

  protected async mapFormToModel(formGroup: FormGroup): Promise<M> {
    if (this.platform && this.platform.isServer) {
      return null;
    }

    return formGroup.getRawValue();
  }

  protected async processAfterSubmission(s: S): Promise<void> {
  }

  protected processSubmissionError(e: HttpErrorResponse): void {
    console.error(e);
  }

  protected patchForm(m: M): void {
    if (this.platform && this.platform.isServer) {
      return;
    }

    this.formGroup.patchValue(m);
  }

  protected init(): void {
    this.submitted = false;
    this.submissionError = {};
  }

  protected addSubscriptions(...subscriptions: Subscription[]): void {
    subscriptions.forEach(subscription => {
      if (this.subscription) {
        this.subscription.add(subscription);
      } else {
        this.subscription = subscription;
      }
    });
  }

  ngOnInit(): void {
    if (this.platform && this.platform.isServer) {
      return;
    }

    if (this.onInit) {
      this.formGroup = this.initFormGroup(this.fb);
    }

    this.addSubscriptions(
      this.formGroup.valueChanges.subscribe(() => this.init()),
      this.model$.subscribe(model => {
        if (model) {
          this.patchForm(model);
        }
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
