import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { INotJoinedMember } from '../../../../types';

@Component({
  selector: 'sw-none-member',
  templateUrl: './none-member.component.html',
  styleUrls: ['./none-member.component.scss']
})
export class NoneMemberComponent implements OnInit, OnDestroy {

  submiited = false;
  formGroup: FormGroup;
  @Output() memberCreate: EventEmitter<INotJoinedMember> = new EventEmitter<INotJoinedMember>();

  private _subscription = new Subscription();

  constructor(fb: FormBuilder) {
    this.formGroup = fb.group({
      school: [null, [Validators.required]],
      department: [null, [Validators.required]],
      no: [null, [Validators.required]],
      name: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this._subscription.add(
      this.formGroup.valueChanges.subscribe(() => this.submiited = false)
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  addNotJoinedMember(): void {
    this.submiited = true;
    if (this.formGroup.invalid) {
      return;
    }
    this.memberCreate.emit(this.formGroup.getRawValue());
    this.formGroup.reset();
  }
}
