import { UploadService } from 'shared';

export class UploadAdapter {
  constructor(private loader, private uploadService: UploadService) {
  }

  upload(): Promise<any> {
    return this.loader.file.then(file => this.uploadService.upload(file).toPromise())
      .then(res => ({ ...res.data, default: res.data.url }));
  }
}
