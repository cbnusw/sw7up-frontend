import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { ProjectService } from '../../../../services';
import { IProjectFile, ISelectOption } from '../../../../types';

@Component({
  selector: 'sw-project-slide-uploader',
  templateUrl: './project-slide-uploader.component.html',
  styleUrls: ['./project-slide-uploader.component.scss']
})
export class ProjectSlideUploaderComponent implements OnInit {

  @Input() projectId: string;
  @Output() uploadChange: EventEmitter<IProjectFile[]> = new EventEmitter<IProjectFile[]>();
  @Output() addVideo: EventEmitter<string> = new EventEmitter<string>();

  videoLink: string = null;
  selected = '이미지';
  options: ISelectOption[] = [
    { value: '이미지' },
    { value: '비디오' }
  ];

  constructor(
    private _projectService: ProjectService
  ) {
  }

  changeOption(value: string): void {
    this.videoLink = null;
    this.selected = value;
  }

  ngOnInit(): void {
    if (!this.projectId) {
      throw Error('projectId required');
    }
  }

  uploadSlides(files: File[]): void {
    this._projectService.uploadSlide(this.projectId, files).pipe(
      map(res => res.data)
    ).subscribe({
      next: projectFiles => this.uploadChange.emit(projectFiles),
      error: err => alert(`파일 업로드에 실패하였습니다.\nError: ${err?.error?.code || err?.message}`),
    });
  }

  addVideoSlide(): void {
    if (!this.videoLink) {
      alert('비디오 링크를 올려주세요.');
      return;
    }

    if (!/^https?:\/\/youtu\.be/.test(this.videoLink) && !/^https?:\/\/www\.youtube\.com/.test(this.videoLink)) {
      alert('Youtube 비디오 링크만 지원합니다.');
      return;
    }

    this._projectService.addVideoSlide(this.projectId, this.videoLink).subscribe({
      next: () => {
        this.addVideo.emit(this.videoLink);
        this.videoLink = null;
      },
      error: err => alert(`비디오 링크 추가에 실패하였습니다.\nError: ${err?.error?.code || err?.message}`),
    });
  }

  removeVideoSlide(): void {
  }
}
