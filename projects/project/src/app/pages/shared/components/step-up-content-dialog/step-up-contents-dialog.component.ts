import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../../../../environments/environment';
import { StepUpContent, StepUpService } from '../../services/step-up.service';

@Component({
  selector: 'sw-step-up-contents-dialog',
  templateUrl: './step-up-contents-dialog.component.html',
  styleUrls: ['./step-up-contents-dialog.component.scss']
})
export class StepUpContentsDialogComponent implements OnInit {
  contents: StepUpContent[] = [];

  constructor(
    public readonly stepUpService: StepUpService,
    public readonly dialogRef: MatDialogRef<StepUpContentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {
  }

  catetory(content: StepUpContent): string {
    const { level, subjects } = content;
    return `${level.name} > ${subjects.map(subject => subject.name).join(' > ')}`;
  }

  link(content: StepUpContent): string {
    const { _id, level, subjects } = content;
    return `${environment.host}/education/step-up/${level._id}/${subjects[subjects.length - 1]._id}/${_id}`;
  }

  ngOnInit(): void {
    this.stepUpService.getStepUpContents(this.data).subscribe(contents => this.contents = contents);
  }
}
